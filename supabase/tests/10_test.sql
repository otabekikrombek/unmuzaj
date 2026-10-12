\set ON_ERROR_STOP 1
-- учитель (создан до миграции — станет админом)
\echo == setup
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
select (public.teacher_classes())->>'ok' as teacher_ok;
create temp table tc as select public.teacher_create_class('2 курс ТГУВ', '2026') r;
select (r->>'ok') ok, length(r->>'join') joinlen from tc;
create temp table tl as select public.teacher_add_learners((select (r->>'id')::bigint from tc), 3) r;
select jsonb_array_length(r->'learners') n, r->'learners'->0->>'code' c1, length(r->'learners'->0->>'pin') pinlen from tl;
grant select on tc, tl to anon, authenticated;
-- ученик
\echo == student login
select set_config('request.jwt.claim.sub', '', false);
set role anon;
select (public.class_login((select r->>'join' from tc), '1', '0000'))->>'err' as wrong_pin;
select (public.class_login(lower((select r->>'join' from tc)), '01', (select r->'learners'->0->>'pin' from tl)))->>'ok' as right_pin_lowercase_join;
reset role;
create temp table tk as select (public.class_login((select r->>'join' from tc), '1', (select r->'learners'->0->>'pin' from tl))->>'token')::uuid t;
grant select on tk to anon, authenticated;
set role anon;
select public.whoami((select t from tk))->>'nickname' as me;
select public.sync_progress((select t from tk), '{"deck":"w100","step":5,"words":{"كِتَابٌ":{"n":2,"ok":1,"bad":1,"box":1,"last":4}},
  "events":[{"id":"e1","ts":1760000000000,"mode":"c","dir":1,"w":"كِتَابٌ","th":"Учёба","ok":false,"box":1},{"id":"e2","ts":1760000001000,"mode":"c","dir":1,"w":"كِتَابٌ","th":"Учёба","ok":true,"box":2}],
  "visit":{"id":"v1","activity":"w100","start":1760000000000,"active":300,"items":2,"ok":1,"bad":1,"dev":"телефон"},
  "tests":[{"id":"t1","ts":1760000002000,"correct":15,"total":20,"time":200}]}'::jsonb)->>'ok' as sync1;
-- повтор того же пакета: без дублей; устаревшее состояние слова (n меньше) не перезаписывает
select public.sync_progress((select t from tk), '{"deck":"w100","step":3,"words":{"كِتَابٌ":{"n":1,"ok":0,"bad":1,"box":1,"last":1}},
  "events":[{"id":"e1","ts":1760000000000,"mode":"c","dir":1,"w":"كِتَابٌ","th":"Учёба","ok":false,"box":1}],
  "visit":{"id":"v1","activity":"w100","start":1760000000000,"active":200,"items":1,"ok":0,"bad":1},
  "tests":[{"id":"t1","ts":1760000002000,"correct":15,"total":20,"time":200}]}'::jsonb)->>'ok' as sync2;
select public.get_deck_state((select t from tk), 'w100') as state;
select public.my_overview((select t from tk)) as overview;
select public.class_board((select t from tk), 'w100') as board;
\echo == direct table access must fail
do $$ begin perform * from public.learners; raise exception 'SHOULD NOT READ'; exception when insufficient_privilege then raise notice 'ok: no direct access'; end $$;
do $$ begin perform public.teacher_classes(); raise exception 'SHOULD NOT CALL'; exception when insufficient_privilege then raise notice 'ok: anon cannot call teacher fn'; end $$;
reset role;
\echo == lockout
do $$ declare i int; res jsonb; begin
  for i in 1..6 loop res := public.class_login((select r->>'join' from tc), '02', '1111'); end loop;
  raise notice 'after 6 wrong: %', res->>'err';
  res := public.class_login((select r->>'join' from tc), '02', (select r->'learners'->1->>'pin' from tl));
  raise notice 'right pin while locked: %', res->>'err';
end $$;
\echo == counts
select (select count(*) from answers) answers, (select count(*) from visits) visits, (select active_sec from visits) active, (select count(*) from card_tests) tests, (select step from card_steps) step, (select n from card_state) n;
\echo == other teacher cannot see
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='other@x'), false);
set role authenticated;
select public.teacher_classes()->>'err' as other_is_not_teacher;
select public.teacher_report((select (r->>'id')::bigint from tc))->>'err' as other_report;
-- email-пользователь: учётная запись ученика создаётся сама, подробные ответы не пишутся
select public.whoami(null)->>'nickname' as email_user;
select public.sync_progress(null, '{"deck":"w100","step":1,"words":{"بَيْتٌ":{"n":1,"ok":1,"bad":0,"box":3,"last":1}},"events":[{"id":"x1","w":"بَيْتٌ","ok":true}]}'::jsonb)->>'ok' as email_sync;
reset role;
select (select count(*) from answers) answers_still, (select count(*) from card_state) states;
\echo == teacher report
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
set role authenticated;
select jsonb_pretty(public.teacher_report((select (r->>'id')::bigint from tc)) - 'learners') as report_head;
select public.teacher_report((select (r->>'id')::bigint from tc))->'learners'->0 as learner1;
select public.teacher_reset_pins(array[(select (r->'learners'->2->>'id')::bigint from tl)])->'learners'->0->>'code' as reset_code;
select public.teacher_update_learner((select (r->'learners'->2->>'id')::bigint from tl), 'Лиса', 'ж', true)->>'ok' as upd;
select public.admin_set_role('other@x', 'teacher')->>'ok' as made_teacher;
reset role;
