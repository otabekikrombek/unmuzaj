\set ON_ERROR_STOP 1
-- Викторины: отправка, дубли, рейтинг, табло, отчёт учителя. Запускать после 0001 и 0002 (можно после 10_test.sql).
\echo == quiz setup
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
create temp table qc as select public.teacher_create_class('Класс викторин', '2026') r;
create temp table ql as select public.teacher_add_learners((select (r->>'id')::bigint from qc), 3) r;
create temp table qk as
  select (public.class_login((select qc.r->>'join' from qc), (r->'learners'->i->>'code'), (r->'learners'->i->>'pin'))->>'token')::uuid t, i
  from ql, generate_series(0, 2) i;
grant select on qc, ql, qk to anon, authenticated;
select set_config('request.jwt.claim.sub', '', false);
set role anon;

do $$
declare t1 uuid := (select t from qk where i = 0); t2 uuid := (select t from qk where i = 1); res jsonb; j text := (select qc.r->>'join' from qc);
begin
  -- 1. отправка попытки
  res := public.quiz_submit(t1, '{"id":"a1","quiz":"matn-10","points":2500,"total":3,"time":60,"level":"Хорошо","start":1760000000000,
    "answers":[{"id":1,"s":"F","q":"س1","a":"x","c":"x","ok":true,"sec":3.2},{"id":2,"s":"V","q":"س2","a":"y","c":"z","ok":false,"sec":5},
               {"id":3,"s":"G","q":"س3","a":"w","c":"w","ok":true,"sec":4}]}');
  if not (res->>'ok')::boolean then raise exception 'submit failed %', res; end if;
  -- 2. повтор того же пакета: без дублей
  res := public.quiz_submit(t1, '{"id":"a1","quiz":"matn-10","points":2500,"total":3,"time":60,"answers":[{"id":1,"ok":true}]}');
  if res->>'dup' is null then raise exception 'dup not detected %', res; end if;
  -- 3. чужой id попытки нельзя перезаписать
  res := public.quiz_submit(t2, '{"id":"a1","quiz":"matn-10","answers":[]}');
  if res->>'err' <> 'id' then raise exception 'foreign id accepted %', res; end if;
  -- 4. завышенные очки обрезаются; correct считается по ответам
  res := public.quiz_submit(t2, '{"id":"b1","quiz":"matn-10","points":999999,"total":2,"time":30,
    "answers":[{"id":1,"s":"F","q":"س1","a":"x","c":"x","ok":true},{"id":2,"s":"V","q":"س2","a":"q","c":"z","ok":false}]}');
  -- 5. вторая, худшая попытка ученика 1 не меняет его лучший результат
  res := public.quiz_submit(t1, '{"id":"a2","quiz":"matn-10","points":100,"total":3,"time":90,"answers":[{"id":2,"s":"V","q":"س2","a":"q","c":"z","ok":false}]}');

  res := public.quiz_class_board(t1, 'matn-10', 3);
  if jsonb_array_length(res->'rows') <> 2 then raise exception 'class board rows %', res; end if;
  if (res->'rows'->0->>'p')::int <> 2500 then raise exception 'board order: %', res->'rows'; end if;
  raise notice 'class board: %', res->'rows';

  res := public.quiz_board(lower(j), 'matn-10', 3);
  if jsonb_array_length(res->'rows') <> 2 or (res->'rows'->0) ? 'id' then raise exception 'projector board %', res; end if;
  raise notice 'projector board: %', res;
  if public.quiz_board('NOPE00', 'matn-10', 3)->>'err' <> 'class' then raise exception 'wrong join accepted'; end if;

  res := public.quiz_my_attempts(t1, 'matn-10');
  if jsonb_array_length(res) <> 2 or jsonb_array_length(res->0->'answers') + jsonb_array_length(res->1->'answers') <> 4 then raise exception 'my attempts %', res; end if;
  if (public.my_overview(t1)->'quizzes'->0->>'quiz') <> 'matn-10' then raise exception 'overview quizzes'; end if;

  begin perform public.teacher_quiz_report(1); raise exception 'anon called teacher fn';
  exception when insufficient_privilege then raise notice 'ok: anon cannot call teacher_quiz_report'; end;
end $$;
reset role;

\echo == stored values
select id, points, correct, total, time_sec, class_id is not null as has_class from quiz_attempts where id in ('a1','a2','b1') order by id;
select count(*) as answers_a1 from quiz_answers where attempt_id = 'a1';
select count(*) as quiz_visits from visits where id like 'q:%';

\echo == teacher
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
set role authenticated;
do $$
declare res jsonb; cid bigint := (select (qc.r->>'id')::bigint from qc);
begin
  res := public.teacher_quiz_report(cid);
  if jsonb_array_length(res->'attempts') <> 3 then raise exception 'teacher attempts %', res->'attempts'; end if;
  raise notice 'hard: %', res->'hard'->0;
  if (res->'hard'->0->>'studs')::int <> 2 then raise exception 'hard question studs %', res->'hard'; end if;
  res := public.teacher_quiz_attempt('a1');
  if jsonb_array_length(res->'attempt'->'answers') <> 3 then raise exception 'teacher attempt %', res; end if;
  res := public.teacher_quiz_answers(cid, 'matn-10');
  if jsonb_array_length(res->'rows') <> 6 then raise exception 'teacher answers %', jsonb_array_length(res->'rows'); end if;
  res := public.teacher_report(cid);
  raise notice 'qz in report: %', res->'learners'->0->'qz';
end $$;
\echo == other teacher cannot see
reset role;
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='other@x'), false);
set role authenticated;
select public.teacher_quiz_report((select (r->>'id')::bigint from qc))->>'err' as other_report,
       public.teacher_quiz_attempt('a1')->>'err' as other_attempt;
reset role;
\echo == quiz tests passed
