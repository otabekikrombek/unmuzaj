-- ═══════════════════════════════════════════════════════════════════
-- Unmuzaj · схема базы данных, версия 1
-- Выполнить один раз: Supabase → SQL Editor → New query → вставить → Run.
-- Повторный запуск безопасен (create if not exists / create or replace).
-- ═══════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto with schema extensions;

-- ---------- таблицы ----------
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user','teacher','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.classes (
  id bigint generated always as identity primary key,
  teacher_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  year text,
  join_code text not null unique,
  course_key text,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.learners (
  id bigint generated always as identity primary key,
  user_id uuid unique references auth.users(id) on delete cascade,   -- вход по email
  class_id bigint references public.classes(id) on delete cascade,   -- ученик класса
  code text,                                                          -- '01', '02' …
  pin_hash text,                                                      -- только хэш ПИН
  nickname text not null,
  sex text check (sex in ('м','ж')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (class_id, code)
);

create table if not exists public.pin_tokens (
  token uuid primary key default gen_random_uuid(),
  learner_id bigint not null references public.learners(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create table if not exists public.login_fails (
  id bigint generated always as identity primary key,
  class_id bigint, code text, at timestamptz not null default now()
);
create index if not exists login_fails_idx on public.login_fails (class_id, code, at);

create table if not exists public.card_state (
  learner_id bigint not null references public.learners(id) on delete cascade,
  deck text not null, word text not null,
  n int not null default 0, ok int not null default 0, bad int not null default 0,
  box smallint not null default 0, last_step int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (learner_id, deck, word)
);

create table if not exists public.card_steps (
  learner_id bigint not null references public.learners(id) on delete cascade,
  deck text not null, step int not null default 0,
  primary key (learner_id, deck)
);

create table if not exists public.answers (
  id bigint generated always as identity primary key,
  learner_id bigint not null references public.learners(id) on delete cascade,
  activity text not null, item text, theme text,
  mode text, dir smallint, correct boolean, box_after smallint, ms int,
  client_id text not null,
  created_at timestamptz not null default now(),
  unique (learner_id, client_id)
);
create index if not exists answers_learner_idx on public.answers (learner_id, created_at);

create table if not exists public.visits (
  id text primary key,
  learner_id bigint not null references public.learners(id) on delete cascade,
  activity text, started_at timestamptz, ended_at timestamptz,
  active_sec int default 0, items int default 0, ok int default 0, bad int default 0, device text
);
create index if not exists visits_learner_idx on public.visits (learner_id, started_at);

create table if not exists public.card_tests (
  id text primary key,
  learner_id bigint not null references public.learners(id) on delete cascade,
  deck text, correct int, total int, time_sec int,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id text primary key,
  learner_id bigint not null references public.learners(id) on delete cascade,
  quiz text not null, points int, correct int, total int, time_sec int, level text,
  created_at timestamptz not null default now()
);
create table if not exists public.quiz_answers (
  attempt_id text not null references public.quiz_attempts(id) on delete cascade,
  q_id int, section text, question text, answer text, correct_answer text, ok boolean, sec real
);

-- ---------- доступ: только через функции ниже ----------
do $$ declare t text; begin
  foreach t in array array['profiles','classes','learners','pin_tokens','login_fails','card_state','card_steps','answers','visits','card_tests','quiz_attempts','quiz_answers'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon, authenticated', t);
  end loop;
end $$;

-- ---------- служебные функции ----------
create or replace function public._learner(p_token uuid) returns bigint
language plpgsql security definer set search_path = public, extensions as $$
declare lid bigint; uid uuid := auth.uid();
begin
  if p_token is not null then
    select t.learner_id into lid from pin_tokens t join learners l on l.id = t.learner_id
      where t.token = p_token and t.expires_at > now() and l.active;
    if lid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
    return lid;
  end if;
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  select id into lid from learners where user_id = uid;
  if lid is null then
    insert into profiles(user_id) values (uid) on conflict do nothing;
    insert into learners(user_id, nickname)
      select uid, coalesce(nullif(split_part(email, '@', 1), ''), 'user') from auth.users where id = uid
      returning id into lid;
  end if;
  return lid;
end $$;

create or replace function public._is_teacher() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where user_id = auth.uid() and role in ('teacher','admin'))
$$;

create or replace function public._is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where user_id = auth.uid() and role = 'admin')
$$;

create or replace function public._own_class(p_class bigint) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from classes where id = p_class and (teacher_id = auth.uid() or public._is_admin()))
$$;

create or replace function public._rand_pin() returns text language sql volatile as $$
  select lpad((1000 + floor(random() * 9000))::int::text, 4, '0')
$$;

revoke all on function public._learner(uuid), public._is_teacher(), public._is_admin(), public._own_class(bigint), public._rand_pin() from public, anon, authenticated;

-- ---------- для всех ----------
create or replace function public.ping() returns int language sql as $$ select 1 $$;

-- Вход ученика класса: код класса + код ученика + ПИН
create or replace function public.class_login(p_join text, p_code text, p_pin text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare c classes; l learners; v_fc int; v_fk int; v_tok uuid; v_code text;
begin
  select * into c from classes where upper(join_code) = upper(trim(p_join)) and not archived;
  if c.id is null then return jsonb_build_object('ok', false, 'err', 'class'); end if;
  v_code := lpad(regexp_replace(coalesce(p_code, ''), '\D', '', 'g'), 2, '0');
  select count(*) filter (where lf.code = v_code), count(*) into v_fc, v_fk
    from login_fails lf where lf.class_id = c.id and lf.at > now() - interval '10 minutes';
  if v_fc >= 5 or v_fk >= 60 then return jsonb_build_object('ok', false, 'err', 'locked'); end if;
  select * into l from learners x where x.class_id = c.id and x.code = v_code and x.active;
  if l.id is null or l.pin_hash is null or l.pin_hash <> crypt(trim(coalesce(p_pin, '')), l.pin_hash) then
    insert into login_fails(class_id, code) values (c.id, v_code);
    return jsonb_build_object('ok', false, 'err', 'pin');
  end if;
  delete from login_fails lf where lf.class_id = c.id and lf.code = v_code;
  delete from pin_tokens t where t.learner_id = l.id and t.expires_at < now();
  insert into pin_tokens(learner_id, expires_at) values (l.id, now() + interval '120 days') returning token into v_tok;
  return jsonb_build_object('ok', true, 'token', v_tok, 'nickname', l.nickname, 'code', l.code, 'class', c.name, 'join', c.join_code);
end $$;

create or replace function public.pin_logout(p_token uuid) returns void
language sql security definer set search_path = public as $$
  delete from pin_tokens where token = p_token
$$;

-- Кто я (для email — создаёт запись ученика при первом входе)
create or replace function public.whoami(p_token uuid default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare lid bigint; r jsonb;
begin
  lid := _learner(p_token);
  select jsonb_build_object('learner', l.id, 'nickname', l.nickname, 'code', l.code, 'class', c.name, 'join', c.join_code,
      'role', coalesce((select role from profiles where user_id = l.user_id), 'user'))
    into r from learners l left join classes c on c.id = l.class_id where l.id = lid;
  return r;
end $$;

-- Состояние карточек одного набора
create or replace function public.get_deck_state(p_token uuid, p_deck text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare lid bigint;
begin
  lid := _learner(p_token);
  return jsonb_build_object(
    'step', coalesce((select step from card_steps where learner_id = lid and deck = p_deck), 0),
    'words', coalesce((select jsonb_object_agg(word, jsonb_build_object('n', n, 'ok', ok, 'bad', bad, 'box', box, 'last', last_step))
                       from card_state where learner_id = lid and deck = p_deck), '{}'::jsonb));
end $$;

-- Сохранение прогресса: состояние слов, ответы, визит, тесты. Повторная отправка не создаёт дублей.
create or replace function public.sync_progress(p_token uuid, p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare lid bigint; in_class boolean; v_deck text := left(p->>'deck', 40); v jsonb;
begin
  lid := _learner(p_token);
  select class_id is not null into in_class from learners where id = lid;
  if v_deck is null or v_deck = '' then return jsonb_build_object('ok', false, 'err', 'deck'); end if;

  insert into card_state as cs (learner_id, deck, word, n, ok, bad, box, last_step, updated_at)
  select lid, v_deck, left(w.key, 120), (w.value->>'n')::int, (w.value->>'ok')::int, (w.value->>'bad')::int,
         least(5, greatest(0, (w.value->>'box')::int))::smallint, (w.value->>'last')::int, now()
  from jsonb_each(coalesce(p->'words', '{}'::jsonb)) w
  limit 2000
  on conflict (learner_id, deck, word) do update
    set n = excluded.n, ok = excluded.ok, bad = excluded.bad, box = excluded.box, last_step = excluded.last_step, updated_at = now()
    where excluded.n >= cs.n;

  if p ? 'step' then
    insert into card_steps as s (learner_id, deck, step) values (lid, v_deck, (p->>'step')::int)
    on conflict (learner_id, deck) do update set step = greatest(s.step, excluded.step);
  end if;

  if in_class then  -- подробные ответы храним только для учеников классов
    insert into answers (learner_id, activity, item, theme, mode, dir, correct, box_after, ms, client_id, created_at)
    select lid, v_deck, left(e->>'w', 120), left(e->>'th', 80), left(e->>'mode', 12), (e->>'dir')::smallint,
           (e->>'ok')::boolean, (e->>'box')::smallint, (e->>'ms')::int, left(e->>'id', 64),
           coalesce(to_timestamp((e->>'ts')::bigint / 1000.0), now())
    from (select jsonb_array_elements(coalesce(p->'events', '[]'::jsonb)) e limit 500) x
    where e->>'id' is not null
    on conflict (learner_id, client_id) do nothing;
  end if;

  v := p->'visit';
  if v is not null and v->>'id' is not null then
    insert into visits as vi (id, learner_id, activity, started_at, ended_at, active_sec, items, ok, bad, device)
    values (left(v->>'id', 64), lid, coalesce(left(v->>'activity', 40), v_deck), to_timestamp((v->>'start')::bigint / 1000.0), now(),
            least(86400, (v->>'active')::int), (v->>'items')::int, (v->>'ok')::int, (v->>'bad')::int, left(v->>'dev', 20))
    on conflict (id) do update set ended_at = now(), active_sec = greatest(vi.active_sec, excluded.active_sec),
      items = greatest(vi.items, excluded.items), ok = greatest(vi.ok, excluded.ok), bad = greatest(vi.bad, excluded.bad)
      where vi.learner_id = lid;
  end if;

  insert into card_tests (id, learner_id, deck, correct, total, time_sec, created_at)
  select left(t->>'id', 64), lid, v_deck, (t->>'correct')::int, (t->>'total')::int, (t->>'time')::int,
         coalesce(to_timestamp((t->>'ts')::bigint / 1000.0), now())
  from (select jsonb_array_elements(coalesce(p->'tests', '[]'::jsonb)) t limit 50) x
  where t->>'id' is not null
  on conflict (id) do nothing;

  return jsonb_build_object('ok', true);
end $$;

-- Рейтинг класса: только положительные номинации и псевдонимы
create or replace function public.class_board(p_token uuid, p_deck text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare lid bigint; cid bigint; r jsonb;
begin
  lid := _learner(p_token);
  select class_id into cid from learners where id = lid;
  if cid is null then return jsonb_build_object('ok', false, 'err', 'no_class'); end if;
  with s as (
    select l.id, l.nickname,
      coalesce((select sum(active_sec) from visits v where v.learner_id = l.id and v.activity = p_deck), 0) / 60.0 as minutes,
      (select count(*) from card_state c where c.learner_id = l.id and c.deck = p_deck and c.box >= 3) as known,
      (select sum(ok) from card_state c where c.learner_id = l.id and c.deck = p_deck) as ok,
      (select sum(ok + bad) from card_state c where c.learner_id = l.id and c.deck = p_deck) as tot
    from learners l where l.class_id = cid and l.active
  )
  select jsonb_build_object('ok', true, 'me', lid,
    'time', (select coalesce(jsonb_agg(jsonb_build_object('id', id, 'n', nickname, 'v', round(minutes, 1)) order by minutes desc), '[]') from s where minutes > 0),
    'known', (select coalesce(jsonb_agg(jsonb_build_object('id', id, 'n', nickname, 'v', known) order by known desc), '[]') from s where known > 0),
    'acc', (select coalesce(jsonb_agg(jsonb_build_object('id', id, 'n', nickname, 'v', round(100.0 * ok / tot, 1)) order by 1.0 * ok / tot desc), '[]') from s where tot >= 50))
  into r;
  return r;
end $$;

-- Мой прогресс
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
                       from (select * from card_tests where learner_id = lid order by created_at desc limit 10) t), '[]'));
end $$;

-- ---------- преподаватель ----------
create or replace function public.teacher_classes() returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  if not _is_teacher() then return jsonb_build_object('ok', false, 'err', 'not_teacher'); end if;
  return jsonb_build_object('ok', true, 'admin', _is_admin(), 'classes', coalesce((
    select jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'year', c.year, 'join', c.join_code, 'archived', c.archived,
      'learners', (select coalesce(jsonb_agg(jsonb_build_object('id', l.id, 'code', l.code, 'nickname', l.nickname, 'sex', l.sex, 'active', l.active) order by l.code), '[]')
                   from learners l where l.class_id = c.id)) order by c.created_at)
    from classes c where c.teacher_id = auth.uid() or _is_admin()), '[]'));
end $$;

create or replace function public.teacher_create_class(p_name text, p_year text default null) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_code text; abc text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; i int; id_ bigint;
begin
  if not _is_teacher() then return jsonb_build_object('ok', false, 'err', 'not_teacher'); end if;
  loop
    v_code := '';
    for i in 1..6 loop v_code := v_code || substr(abc, 1 + floor(random() * length(abc))::int, 1); end loop;
    exit when not exists (select 1 from classes where join_code = v_code);
  end loop;
  insert into classes(teacher_id, name, year, join_code) values (auth.uid(), left(trim(p_name), 80), left(trim(p_year), 20), v_code) returning id into id_;
  return jsonb_build_object('ok', true, 'id', id_, 'join', v_code);
end $$;

-- Добавить N учеников: коды по порядку, случайные ПИН. ПИН возвращаются ОДИН раз — сразу распечатайте.
create or replace function public.teacher_add_learners(p_class bigint, p_count int) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare v_start int; i int; v_pin text; res jsonb := '[]'; lid bigint; v_code text;
begin
  if not _own_class(p_class) then return jsonb_build_object('ok', false, 'err', 'not_owner'); end if;
  if p_count < 1 or p_count > 60 then return jsonb_build_object('ok', false, 'err', 'count'); end if;
  select coalesce(max(nullif(regexp_replace(l.code, '\D', '', 'g'), '')::int), 0) into v_start from learners l where l.class_id = p_class;
  for i in 1..p_count loop
    v_code := lpad((v_start + i)::text, 2, '0');
    v_pin := _rand_pin();
    insert into learners(class_id, code, pin_hash, nickname) values (p_class, v_code, crypt(v_pin, gen_salt('bf', 8)), 'Ученик ' || v_code) returning id into lid;
    res := res || jsonb_build_object('id', lid, 'code', v_code, 'nickname', 'Ученик ' || v_code, 'pin', v_pin);
  end loop;
  return jsonb_build_object('ok', true, 'learners', res);
end $$;

create or replace function public.teacher_reset_pins(p_ids bigint[]) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare r record; v_pin text; res jsonb := '[]';
begin
  for r in select l.id, l.code, l.nickname, l.class_id from learners l where l.id = any(p_ids) order by l.code loop
    if not _own_class(r.class_id) then continue; end if;
    v_pin := _rand_pin();
    update learners set pin_hash = crypt(v_pin, gen_salt('bf', 8)) where id = r.id;
    delete from pin_tokens where learner_id = r.id;
    res := res || jsonb_build_object('id', r.id, 'code', r.code, 'nickname', r.nickname, 'pin', v_pin);
  end loop;
  return jsonb_build_object('ok', true, 'learners', res);
end $$;

create or replace function public.teacher_update_learner(p_id bigint, p_nickname text, p_sex text, p_active boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
declare cid bigint;
begin
  select class_id into cid from learners where id = p_id;
  if cid is null or not _own_class(cid) then return jsonb_build_object('ok', false, 'err', 'not_owner'); end if;
  update learners set nickname = coalesce(nullif(left(trim(p_nickname), 40), ''), nickname),
    sex = case when p_sex in ('м','ж') then p_sex else null end, active = coalesce(p_active, active)
  where id = p_id;
  if p_active is false then delete from pin_tokens where learner_id = p_id; end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.teacher_rename_class(p_class bigint, p_name text, p_year text, p_archived boolean) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  if not _own_class(p_class) then return jsonb_build_object('ok', false, 'err', 'not_owner'); end if;
  update classes set name = coalesce(nullif(left(trim(p_name), 80), ''), name), year = left(trim(p_year), 20), archived = coalesce(p_archived, archived) where id = p_class;
  return jsonb_build_object('ok', true);
end $$;

-- Полный отчёт по классу за период
create or replace function public.teacher_report(p_class bigint, p_from timestamptz default '2000-01-01', p_to timestamptz default '2100-01-01') returns jsonb
language plpgsql security definer set search_path = public as $$
declare r jsonb; tz text := 'Asia/Tashkent';
begin
  if not _own_class(p_class) then return jsonb_build_object('ok', false, 'err', 'not_owner'); end if;
  with L as (select id, code, nickname, sex, active from learners where class_id = p_class),
  V as (select v.* from visits v join L on L.id = v.learner_id where v.started_at between p_from and p_to),
  A as (select a.* from answers a join L on L.id = a.learner_id where a.created_at between p_from and p_to),
  T as (select t.* from card_tests t join L on L.id = t.learner_id where t.created_at between p_from and p_to),
  Q as (select q.* from quiz_attempts q join L on L.id = q.learner_id where q.created_at between p_from and p_to),
  per as (
    select L.id, L.code, L.nickname, L.sex, L.active,
      (select count(*) from V where V.learner_id = L.id) as sessions,
      (select coalesce(round(sum(active_sec) / 60.0, 1), 0) from V where V.learner_id = L.id) as minutes,
      (select count(distinct (started_at at time zone tz)::date) from V where V.learner_id = L.id) as days,
      (select max(ended_at) from V where V.learner_id = L.id) as last,
      (select count(*) from A where A.learner_id = L.id) as answers,
      (select count(*) from A where A.learner_id = L.id and correct) as ok,
      (select count(*) from A where A.learner_id = L.id and not correct) as bad,
      (select coalesce(jsonb_object_agg(deck, x), '{}') from (
         select deck, jsonb_build_object('seen', count(*), 'learn', count(*) filter (where box <= 2), 'good', count(*) filter (where box between 3 and 4), 'done', count(*) filter (where box = 5)) x
         from card_state c where c.learner_id = L.id group by deck) d) as decks,
      (select jsonb_build_object('n', count(*), 'avg', round(avg(100.0 * correct / nullif(total, 0)), 1), 'best', round(max(100.0 * correct / nullif(total, 0)), 1)) from T where T.learner_id = L.id) as ct,
      (select jsonb_build_object('n', count(*), 'avg', round(avg(100.0 * correct / nullif(total, 0)), 1), 'best', round(max(100.0 * correct / nullif(total, 0)), 1)) from Q where Q.learner_id = L.id) as qz,
      (select coalesce(jsonb_agg(jsonb_build_object('deck', activity, 'w', item, 'bad', b) order by b desc), '[]') from (
         select activity, item, count(*) b from A where A.learner_id = L.id and not correct group by activity, item order by b desc limit 12) h) as hard,
      (select coalesce(jsonb_agg(jsonb_build_object('deck', activity, 't', theme, 'n', n, 'bad', b)), '[]') from (
         select activity, theme, count(*) n, count(*) filter (where not correct) b from A where A.learner_id = L.id group by activity, theme) th) as themes,
      (select coalesce(jsonb_object_agg(d, m), '{}') from (
         select to_char(started_at at time zone tz, 'YYYY-MM-DD') d, round(sum(active_sec) / 60.0, 1) m from V where V.learner_id = L.id group by 1) dd) as daily
    from L
  )
  select jsonb_build_object('ok', true, 'generated', now(),
    'class', (select jsonb_build_object('id', id, 'name', name, 'year', year, 'join', join_code) from classes where id = p_class),
    'learners', coalesce((select jsonb_agg(to_jsonb(per) order by code) from per), '[]'),
    'words', coalesce((select jsonb_agg(x order by (x->>'studs')::int desc, (x->>'pct')::numeric desc) from (
        select jsonb_build_object('deck', activity, 'w', item, 't', max(theme), 'n', count(*), 'bad', count(*) filter (where not correct),
          'studs', count(distinct learner_id) filter (where not correct),
          'pct', round(100.0 * count(*) filter (where not correct) / count(*), 1)) x
        from A group by activity, item having count(*) filter (where not correct) > 0 limit 200) w), '[]'),
    'themes', coalesce((select jsonb_agg(jsonb_build_object('deck', activity, 't', theme, 'n', n, 'bad', b, 'pct', round(100.0 * b / n, 1))) from (
        select activity, theme, count(*) n, count(*) filter (where not correct) b from A group by activity, theme) t), '[]'),
    'weekday', (select jsonb_agg(coalesce(m, 0) order by d) from generate_series(1, 7) d left join (
        select extract(isodow from started_at at time zone tz)::int dw, round(sum(active_sec) / 60.0, 1) m from V group by 1) x on x.dw = d),
    'hour', (select jsonb_agg(coalesce(m, 0) order by h) from generate_series(0, 23) h left join (
        select extract(hour from started_at at time zone tz)::int hh, round(sum(active_sec) / 60.0, 1) m from V group by 1) x on x.hh = h),
    'daily', coalesce((select jsonb_object_agg(d, m) from (
        select to_char(started_at at time zone tz, 'YYYY-MM-DD') d, round(sum(active_sec) / 60.0, 1) m from V group by 1) dd), '{}'))
  into r;
  return r;
end $$;

-- ---------- администратор ----------
create or replace function public.admin_set_role(p_email text, p_role text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare uid uuid;
begin
  if not _is_admin() then return jsonb_build_object('ok', false, 'err', 'not_admin'); end if;
  if p_role not in ('user','teacher','admin') then return jsonb_build_object('ok', false, 'err', 'role'); end if;
  select id into uid from auth.users where lower(email) = lower(trim(p_email));
  if uid is null then return jsonb_build_object('ok', false, 'err', 'no_user'); end if;
  insert into profiles(user_id, role) values (uid, p_role) on conflict (user_id) do update set role = excluded.role;
  return jsonb_build_object('ok', true);
end $$;

-- Профиль для каждого нового пользователя
create or replace function public._on_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles(user_id) values (new.id) on conflict do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public._on_new_user();

-- Уже существующие пользователи → профили; самый первый пользователь проекта — администратор
insert into public.profiles(user_id) select id from auth.users on conflict do nothing;
update public.profiles set role = 'admin'
  where user_id = (select id from auth.users order by created_at limit 1)
    and not exists (select 1 from public.profiles where role = 'admin');

-- Права на вызов функций
grant execute on function public.ping(), public.class_login(text, text, text), public.pin_logout(uuid), public.whoami(uuid),
  public.get_deck_state(uuid, text), public.sync_progress(uuid, jsonb), public.class_board(uuid, text), public.my_overview(uuid)
  to anon, authenticated;
revoke execute on function public.teacher_classes(), public.teacher_create_class(text, text), public.teacher_add_learners(bigint, int),
  public.teacher_reset_pins(bigint[]), public.teacher_update_learner(bigint, text, text, boolean), public.teacher_rename_class(bigint, text, text, boolean),
  public.teacher_report(bigint, timestamptz, timestamptz), public.admin_set_role(text, text) from public, anon;
grant execute on function public.teacher_classes(), public.teacher_create_class(text, text), public.teacher_add_learners(bigint, int),
  public.teacher_reset_pins(bigint[]), public.teacher_update_learner(bigint, text, text, boolean), public.teacher_rename_class(bigint, text, text, boolean),
  public.teacher_report(bigint, timestamptz, timestamptz), public.admin_set_role(text, text) to authenticated;
