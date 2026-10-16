\set ON_ERROR_STOP 1
-- Пробные экзамены: «выходы из окна» (0003_mock_exits.sql). Запускать после 0001, 0002, 0003 (можно после 20_quiz_test.sql).
\echo == mock setup
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
create temp table mc as select public.teacher_create_class('Класс экзаменов', '2026') r;
create temp table ml as select public.teacher_add_learners((select (r->>'id')::bigint from mc), 2) r;
create temp table mk as
  select (public.class_login((select mc.r->>'join' from mc), (r->'learners'->i->>'code'), (r->'learners'->i->>'pin'))->>'token')::uuid t, i
  from ml, generate_series(0, 1) i;
grant select on mc, ml, mk to anon, authenticated;
select set_config('request.jwt.claim.sub', '', false);
set role anon;

do $$
declare t1 uuid := (select t from mk where i = 0); t2 uuid := (select t from mk where i = 1); res jsonb;
begin
  -- 1. экзамен: без очков и уровня, 3 выхода из окна
  res := public.quiz_submit(t1, '{"id":"m1","quiz":"tanal-nahw","points":0,"total":30,"time":1500,"level":"","start":1760000000000,"exits":3,
    "answers":[{"id":5,"s":"G","q":"س5","a":"x","c":"x","ok":true,"sec":40},{"id":9,"s":"G","q":"س9","a":"","c":"z","ok":false,"sec":12}]}');
  if not (res->>'ok')::boolean then raise exception 'mock submit failed %', res; end if;
  -- 2. мусор вместо числа и отрицательное число — 0, огромное — 999
  res := public.quiz_submit(t2, '{"id":"m2","quiz":"tanal-nahw","points":0,"total":30,"time":10,"level":"","exits":"abc","answers":[]}');
  res := public.quiz_submit(t2, '{"id":"m3","quiz":"tanal-nahw","points":0,"total":30,"time":10,"level":"","exits":-4,"answers":[]}');
  res := public.quiz_submit(t2, '{"id":"m4","quiz":"tanal-nahw","points":0,"total":30,"time":10,"level":"","exits":123456,"answers":[]}');
  -- 3. старая версия сайта (викторина без exits) работает как раньше
  res := public.quiz_submit(t2, '{"id":"m5","quiz":"matn-10","points":700,"total":1,"time":20,"level":"Хорошо","answers":[{"id":1,"s":"F","q":"س1","a":"x","c":"x","ok":true}]}');
  if not (res->>'ok')::boolean then raise exception 'quiz without exits failed %', res; end if;

  res := public.my_overview(t1);
  if (res->'quizzes'->0->>'exits')::int <> 3 then raise exception 'overview exits %', res->'quizzes'; end if;
  res := public.quiz_my_attempts(t1, 'tanal-nahw');
  if (res->0->>'exits')::int <> 3 or jsonb_array_length(res->0->'answers') <> 2 or res->0->'answers'->1->>'a' <> '' then raise exception 'my attempts %', res; end if;
end $$;
reset role;

\echo == stored exits
select id, quiz, points, correct, total, level, exits from quiz_attempts where id in ('m1','m2','m3','m4','m5') order by id;
do $$ begin
  if (select string_agg(exits::text, ',' order by id) from quiz_attempts where id in ('m1','m2','m3','m4','m5')) <> '3,0,0,999,0' then
    raise exception 'exits stored wrong'; end if;
  if exists (select 1 from quiz_attempts where exits is null) then raise exception 'exits is null somewhere'; end if;
end $$;

\echo == teacher sees exits
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
set role authenticated;
do $$
declare res jsonb; cid bigint := (select (mc.r->>'id')::bigint from mc);
begin
  res := public.teacher_quiz_report(cid);
  if jsonb_array_length(res->'attempts') <> 5 then raise exception 'teacher attempts %', res->'attempts'; end if;
  if (select (x->>'exits')::int from jsonb_array_elements(res->'attempts') x where x->>'id' = 'm1') <> 3 then raise exception 'teacher exits %', res->'attempts'; end if;
  res := public.teacher_quiz_attempt('m1');
  if (res->'attempt'->>'exits')::int <> 3 then raise exception 'teacher attempt exits %', res; end if;
end $$;
\echo == other teacher cannot see
reset role;
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='other@x'), false);
set role authenticated;
select public.teacher_quiz_report((select (r->>'id')::bigint from mc))->>'err' as other_report,
       public.teacher_quiz_attempt('m1')->>'err' as other_attempt;
reset role;
\echo == mock tests passed
