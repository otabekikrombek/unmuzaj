-- ═══════════════════════════════════════════════════════════════════
-- Unmuzaj · версия 2: викторины и тесты на сайте
-- Выполнить ПОСЛЕ 0001_init.sql: Supabase → SQL Editor → New query → вставить → Run.
-- Повторный запуск безопасен.
-- ═══════════════════════════════════════════════════════════════════

alter table public.quiz_attempts add column if not exists class_id bigint references public.classes(id) on delete set null;
alter table public.quiz_attempts add column if not exists started_at timestamptz;
create index if not exists quiz_attempts_class_idx on public.quiz_attempts (class_id, quiz, created_at);
create index if not exists quiz_attempts_learner_idx on public.quiz_attempts (learner_id, created_at);

alter table public.quiz_answers add column if not exists q_no int;
create index if not exists quiz_answers_attempt_idx on public.quiz_answers (attempt_id);

-- Попытка с ответами в виде JSON (для разбора)
create or replace function public._quiz_attempt_json(p_id text) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('id', q.id, 'quiz', q.quiz, 'points', q.points, 'correct', q.correct, 'total', q.total,
    'time', q.time_sec, 'level', q.level, 'at', q.created_at,
    'answers', coalesce((select jsonb_agg(jsonb_build_object('id', a.q_id, 's', a.section, 'q', a.question, 'a', a.answer,
        'c', a.correct_answer, 'ok', a.ok, 'sec', a.sec) order by a.q_no) from quiz_answers a where a.attempt_id = q.id), '[]'))
  from quiz_attempts q where q.id = p_id
$$;
revoke all on function public._quiz_attempt_json(text) from public, anon, authenticated;

-- Лучший результат каждого ученика класса за последние p_hours часов (только псевдонимы)
create or replace function public._quiz_best(p_class bigint, p_quiz text, p_hours int) returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', b.learner_id, 'n', b.nickname, 'p', b.points, 'c', b.correct,
           'tot', b.total, 't', b.time_sec, 'l', b.level) order by b.points desc, b.time_sec asc), '[]')
  from (
    select distinct on (q.learner_id) q.learner_id, l.nickname, q.points, q.correct, q.total, q.time_sec, q.level
    from quiz_attempts q join learners l on l.id = q.learner_id
    where q.class_id = p_class and q.quiz = p_quiz and l.active
      and q.created_at > now() - make_interval(hours => least(greatest(coalesce(p_hours, 3), 1), 72))
    order by q.learner_id, q.points desc, q.time_sec asc
  ) b
$$;
revoke all on function public._quiz_best(bigint, text, int) from public, anon, authenticated;

-- Сохранить попытку. id создаёт устройство ученика: повторная отправка не создаёт дублей.
-- p = {id, quiz, points, total, time, level, start (мс), answers:[{id, s, q, a, c, ok, sec}]}
create or replace function public.quiz_submit(p_token uuid, p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare lid bigint; cid bigint; v_id text := left(p->>'id', 64); v_quiz text := left(p->>'quiz', 40);
  v_owner bigint; v_ok int; v_n int; v_time int; v_start timestamptz;
begin
  lid := _learner(p_token);
  if v_id is null or v_id = '' or v_quiz is null or v_quiz = '' then return jsonb_build_object('ok', false, 'err', 'bad'); end if;
  select learner_id into v_owner from quiz_attempts where id = v_id;
  if v_owner is not null then
    return case when v_owner = lid then jsonb_build_object('ok', true, 'dup', true) else jsonb_build_object('ok', false, 'err', 'id') end;
  end if;
  select class_id into cid from learners where id = lid;

  select count(*) filter (where (e->>'ok')::boolean), count(*) into v_ok, v_n
    from jsonb_array_elements(coalesce(p->'answers', '[]'::jsonb)) with ordinality x(e, n) where n <= 60;
  v_time := least(greatest(coalesce((p->>'time')::int, 0), 0), 7200);
  v_start := coalesce(to_timestamp((p->>'start')::bigint / 1000.0), now() - make_interval(secs => v_time));
  if v_start > now() + interval '5 minutes' or v_start < now() - interval '30 days' then v_start := now() - make_interval(secs => v_time); end if;

  insert into quiz_attempts (id, learner_id, class_id, quiz, points, correct, total, time_sec, level, started_at)
  values (v_id, lid, cid, v_quiz, least(greatest(coalesce((p->>'points')::int, 0), 0), 1000 * v_n), v_ok,
          greatest(coalesce((p->>'total')::int, v_n), v_n), v_time, left(p->>'level', 30), v_start);

  insert into quiz_answers (attempt_id, q_no, q_id, section, question, answer, correct_answer, ok, sec)
  select v_id, n::int, (e->>'id')::int, left(e->>'s', 4), left(e->>'q', 400), left(e->>'a', 300), left(e->>'c', 300),
         coalesce((e->>'ok')::boolean, false), least(greatest(coalesce((e->>'sec')::real, 0), 0), 600)
  from jsonb_array_elements(coalesce(p->'answers', '[]'::jsonb)) with ordinality x(e, n) where n <= 60;

  -- время викторины учитывается в общей активности ученика
  insert into visits (id, learner_id, activity, started_at, ended_at, active_sec, items, ok, bad, device)
  values ('q:' || v_id, lid, v_quiz, v_start, v_start + make_interval(secs => v_time), v_time, v_n, v_ok, v_n - v_ok, left(p->>'dev', 20))
  on conflict (id) do nothing;

  return jsonb_build_object('ok', true);
exception when unique_violation then
  -- та же попытка пришла дважды одновременно (плохая связь): вторая копия не нужна
  return jsonb_build_object('ok', true, 'dup', true);
end $$;

-- Мои попытки с разбором (последние 20; можно по одной викторине)
create or replace function public.quiz_my_attempts(p_token uuid, p_quiz text default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare lid bigint;
begin
  lid := _learner(p_token);
  return coalesce((select jsonb_agg(_quiz_attempt_json(id) order by created_at desc) from (
    select id, created_at from quiz_attempts where learner_id = lid and (p_quiz is null or quiz = p_quiz)
    order by created_at desc limit 20) x), '[]');
end $$;

-- Рейтинг викторины внутри своего класса (для ученика)
create or replace function public.quiz_class_board(p_token uuid, p_quiz text, p_hours int default 3) returns jsonb
language plpgsql security definer set search_path = public as $$
declare lid bigint; cid bigint;
begin
  lid := _learner(p_token);
  select class_id into cid from learners where id = lid;
  if cid is null then return jsonb_build_object('ok', false, 'err', 'no_class'); end if;
  return jsonb_build_object('ok', true, 'me', lid, 'rows', _quiz_best(cid, p_quiz, p_hours));
end $$;

-- Табло для проектора: по коду класса, без входа. Только псевдонимы и итоги, без ответов.
create or replace function public.quiz_board(p_join text, p_quiz text, p_hours int default 3) returns jsonb
language plpgsql security definer set search_path = public as $$
declare c classes;
begin
  select * into c from classes where upper(join_code) = upper(trim(p_join)) and not archived;
  if c.id is null then return jsonb_build_object('ok', false, 'err', 'class'); end if;
  return jsonb_build_object('ok', true, 'class', c.name,
    'rows', (select coalesce(jsonb_agg(x - 'id'), '[]') from jsonb_array_elements(_quiz_best(c.id, p_quiz, p_hours)) x));
end $$;

-- Мой прогресс: + последние попытки викторин
create or replace function public.my_overview(p_token uuid default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare lid bigint;
begin
  lid := _learner(p_token);
  return jsonb_build_object(
    'decks', coalesce((select jsonb_object_agg(deck, x) from (
        select deck, jsonb_build_object('seen', count(*), 'learn', count(*) filter (where box <= 2), 'good', count(*) filter (where box between 3 and 4),
          'done', count(*) filter (where box = 5), 'ok', sum(ok), 'bad', sum(bad)) x
        from card_state where learner_id = lid group by deck) d), '{}'),
    'minutes', coalesce((select round(sum(active_sec) / 60.0, 1) from visits where learner_id = lid), 0),
    'visits', (select count(*) from visits where learner_id = lid),
    'tests', coalesce((select jsonb_agg(jsonb_build_object('deck', deck, 'correct', correct, 'total', total, 'at', created_at) order by created_at desc)
                       from (select * from card_tests where learner_id = lid order by created_at desc limit 10) t), '[]'),
    'quizzes', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'quiz', quiz, 'points', points, 'correct', correct, 'total', total,
                           'time', time_sec, 'level', level, 'at', created_at) order by created_at desc)
                       from (select * from quiz_attempts where learner_id = lid order by created_at desc limit 10) q), '[]'));
end $$;

-- ---------- преподаватель ----------
-- Викторины класса за период: сводка по каждой викторине и все попытки
create or replace function public.teacher_quiz_report(p_class bigint, p_from timestamptz default '2000-01-01', p_to timestamptz default '2100-01-01') returns jsonb
language plpgsql security definer set search_path = public as $$
declare r jsonb;
begin
  if not _own_class(p_class) then return jsonb_build_object('ok', false, 'err', 'not_owner'); end if;
  with Q as (
    select q.* from quiz_attempts q join learners l on l.id = q.learner_id
    where l.class_id = p_class and q.created_at between p_from and p_to),
  A as (select a.*, Q.learner_id, Q.quiz from quiz_answers a join Q on Q.id = a.attempt_id)
  select jsonb_build_object('ok', true,
    'attempts', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'learner', learner_id, 'quiz', quiz, 'points', points,
        'correct', correct, 'total', total, 'time', time_sec, 'level', level, 'at', created_at) order by created_at desc) from Q), '[]'),
    'sections', coalesce((select jsonb_agg(jsonb_build_object('quiz', quiz, 's', section, 'n', n, 'ok', k)) from (
        select quiz, section, count(*) n, count(*) filter (where ok) k from A group by quiz, section) s), '[]'),
    'hard', coalesce((select jsonb_agg(x) from (
        select jsonb_build_object('quiz', quiz, 'id', q_id, 's', max(section), 'q', max(question), 'c', max(correct_answer),
          'n', count(*), 'bad', count(*) filter (where not ok), 'studs', count(distinct learner_id) filter (where not ok),
          'pct', round(100.0 * count(*) filter (where not ok) / count(*), 1)) x
        from A group by quiz, q_id having count(*) filter (where not ok) > 0
        order by count(distinct learner_id) filter (where not ok) desc, count(*) filter (where not ok) desc limit 300) h), '[]'))
  into r;
  return r;
end $$;

-- Разбор одной попытки (только для учителя этого класса)
create or replace function public.teacher_quiz_attempt(p_attempt text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare cid bigint;
begin
  select l.class_id into cid from quiz_attempts q join learners l on l.id = q.learner_id where q.id = p_attempt;
  if cid is null or not _own_class(cid) then return jsonb_build_object('ok', false, 'err', 'not_owner'); end if;
  return jsonb_build_object('ok', true, 'attempt', _quiz_attempt_json(p_attempt));
end $$;

-- Все ответы одной викторины класса за период (для выгрузки в CSV)
create or replace function public.teacher_quiz_answers(p_class bigint, p_quiz text, p_from timestamptz default '2000-01-01', p_to timestamptz default '2100-01-01') returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  if not _own_class(p_class) then return jsonb_build_object('ok', false, 'err', 'not_owner'); end if;
  return jsonb_build_object('ok', true, 'rows', coalesce((
    select jsonb_agg(jsonb_build_object('learner', q.learner_id, 'attempt', q.id, 'at', q.created_at, 'no', a.q_no, 'id', a.q_id, 's', a.section,
        'q', a.question, 'a', a.answer, 'c', a.correct_answer, 'ok', a.ok, 'sec', a.sec) order by q.created_at, a.q_no)
    from quiz_attempts q join learners l on l.id = q.learner_id join quiz_answers a on a.attempt_id = q.id
    where l.class_id = p_class and q.quiz = p_quiz and q.created_at between p_from and p_to), '[]'));
end $$;

-- Права на вызов функций
grant execute on function public.quiz_submit(uuid, jsonb), public.quiz_my_attempts(uuid, text), public.quiz_class_board(uuid, text, int),
  public.quiz_board(text, text, int), public.my_overview(uuid) to anon, authenticated;
revoke execute on function public.teacher_quiz_report(bigint, timestamptz, timestamptz), public.teacher_quiz_attempt(text),
  public.teacher_quiz_answers(bigint, text, timestamptz, timestamptz) from public, anon;
grant execute on function public.teacher_quiz_report(bigint, timestamptz, timestamptz), public.teacher_quiz_attempt(text),
  public.teacher_quiz_answers(bigint, text, timestamptz, timestamptz) to authenticated;
