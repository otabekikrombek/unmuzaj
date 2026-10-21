\set ON_ERROR_STOP 1
-- Основной сценарий: класс, вход по ПИН, блокировка, синхронизация, отчёт учителя.
-- Каждая проверка падает (raise exception) при расхождении; в конце — «core tests passed».
-- Функции с побочным эффектом вызываются по одному разу, как раньше: 20, 30 и 40 запускаются после этого файла и опираются на его состояние.
-- ПИН-коды и токены не печатаются (в сообщениях — только длины и коды ошибок).
-- учитель (создан до миграции — станет админом)
\echo == setup
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
do $$ declare res jsonb := public.teacher_classes(); begin
  if (res->>'ok')::boolean is not true then raise exception 'teacher_classes: ожидалось ok = true, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  raise notice 'ok: teacher_classes';
end $$;
create temp table tc as select public.teacher_create_class('2 курс ТГУВ', '2026') r;
do $$ declare res jsonb := (select r from tc); begin
  if (res->>'ok')::boolean is not true then raise exception 'teacher_create_class: ожидалось ok = true, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  if length(res->>'join') is distinct from 6 then raise exception 'teacher_create_class: ожидалась длина join 6, получено %', length(res->>'join'); end if;
  raise notice 'ok: класс создан, длина join = 6';
end $$;
create temp table tl as select public.teacher_add_learners((select (r->>'id')::bigint from tc), 3) r;
do $$ declare res jsonb := (select r from tl); begin
  if jsonb_array_length(res->'learners') is distinct from 3 then raise exception 'teacher_add_learners: ожидалось 3 ученика, получено %', jsonb_array_length(res->'learners'); end if;
  if res->'learners'->0->>'code' is distinct from '01' then raise exception 'teacher_add_learners: ожидался code первого ученика 01, получено %', res->'learners'->0->>'code'; end if;
  if length(res->'learners'->0->>'pin') is distinct from 4 then raise exception 'teacher_add_learners: ожидалась длина ПИН 4, получено %', length(res->'learners'->0->>'pin'); end if;
  raise notice 'ok: 3 ученика, первый 01, длина ПИН = 4';
end $$;
grant select on tc, tl to anon, authenticated;
-- ученик
\echo == student login
select set_config('request.jwt.claim.sub', '', false);
set role anon;
do $$ declare res jsonb := public.class_login((select r->>'join' from tc), '1', '0000'); begin
  if res->>'err' is distinct from 'pin' then raise exception 'class_login с неверным ПИН: ожидалось err = pin, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  raise notice 'ok: неверный ПИН → pin';
end $$;
do $$ declare res jsonb := public.class_login(lower((select r->>'join' from tc)), '01', (select r->'learners'->0->>'pin' from tl)); begin
  if (res->>'ok')::boolean is not true then raise exception 'class_login (строчный join, верный ПИН): ожидалось ok = true, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  raise notice 'ok: верный ПИН, строчный join → вход';
end $$;
reset role;
create temp table tk as select (public.class_login((select r->>'join' from tc), '1', (select r->'learners'->0->>'pin' from tl))->>'token')::uuid t;
do $$ begin
  if (select t from tk) is null then raise exception 'class_login (верный ПИН): токен не получен'; end if;
end $$;
grant select on tk to anon, authenticated;
set role anon;
do $$ declare res jsonb := public.whoami((select t from tk)); begin
  if res->>'nickname' is distinct from 'Ученик 01' then raise exception 'whoami: ожидалось nickname = Ученик 01, получено %', res->>'nickname'; end if;
  raise notice 'ok: whoami → Ученик 01';
end $$;
do $$ declare res jsonb := public.sync_progress((select t from tk), '{"deck":"w100","step":5,"words":{"كِتَابٌ":{"n":2,"ok":1,"bad":1,"box":1,"last":4}},
  "events":[{"id":"e1","ts":1760000000000,"mode":"c","dir":1,"w":"كِتَابٌ","th":"Учёба","ok":false,"box":1},{"id":"e2","ts":1760000001000,"mode":"c","dir":1,"w":"كِتَابٌ","th":"Учёба","ok":true,"box":2}],
  "visit":{"id":"v1","activity":"w100","start":1760000000000,"active":300,"items":2,"ok":1,"bad":1,"dev":"телефон"},
  "tests":[{"id":"t1","ts":1760000002000,"correct":15,"total":20,"time":200}]}'::jsonb); begin
  if (res->>'ok')::boolean is not true then raise exception 'sync_progress (первый пакет): ожидалось ok = true, получено %', res; end if;
  raise notice 'ok: sync_progress, первый пакет';
end $$;
-- повтор того же пакета: без дублей; устаревшее состояние слова (n меньше) не перезаписывает
do $$ declare res jsonb := public.sync_progress((select t from tk), '{"deck":"w100","step":3,"words":{"كِتَابٌ":{"n":1,"ok":0,"bad":1,"box":1,"last":1}},
  "events":[{"id":"e1","ts":1760000000000,"mode":"c","dir":1,"w":"كِتَابٌ","th":"Учёба","ok":false,"box":1}],
  "visit":{"id":"v1","activity":"w100","start":1760000000000,"active":200,"items":1,"ok":0,"bad":1},
  "tests":[{"id":"t1","ts":1760000002000,"correct":15,"total":20,"time":200}]}'::jsonb); begin
  if (res->>'ok')::boolean is not true then raise exception 'sync_progress (повтор, устаревшее состояние): ожидалось ok = true, получено %', res; end if;
  raise notice 'ok: sync_progress, повтор';
end $$;
do $$ declare res jsonb := public.get_deck_state((select t from tk), 'w100'); w jsonb := res->'words'->'كِتَابٌ'; e record; begin
  if (res->>'step')::numeric is distinct from 5 then raise exception 'get_deck_state: ожидалось step = 5 (устаревший пакет не перезаписывает), получено %', res->>'step'; end if;
  for e in select * from jsonb_each_text('{"n":2,"ok":1,"bad":1,"box":1,"last":4}') loop
    if (w->>e.key)::numeric is distinct from e.value::numeric then
      raise exception 'get_deck_state, слово كِتَابٌ: ожидалось % = %, получено % (устаревшее состояние перезаписало новое?)', e.key, e.value, w->>e.key;
    end if;
  end loop;
  raise notice 'ok: состояние слова от первого пакета: %', res;
end $$;
do $$ declare res jsonb := public.my_overview((select t from tk)); d jsonb := res->'decks'->'w100'; e record; begin
  for e in select * from jsonb_each_text('{"ok":1,"bad":1,"seen":1,"learn":1,"done":0,"good":0}') loop
    if (d->>e.key)::numeric is distinct from e.value::numeric then
      raise exception 'my_overview decks.w100: ожидалось % = %, получено %', e.key, e.value, d->>e.key;
    end if;
  end loop;
  if jsonb_array_length(res->'tests') is distinct from 1 then raise exception 'my_overview: ожидалась 1 запись tests, получено %', res->'tests'; end if;
  if res->'tests'->0->>'deck' is distinct from 'w100' or (res->'tests'->0->>'total')::numeric is distinct from 20
     or (res->'tests'->0->>'correct')::numeric is distinct from 15 then
    raise exception 'my_overview tests[0]: ожидалось deck = w100, total = 20, correct = 15, получено %', res->'tests'->0;
  end if;
  if (res->>'visits')::numeric is distinct from 1 then raise exception 'my_overview: ожидалось visits = 1, получено %', res->>'visits'; end if;
  if (res->>'minutes')::numeric is distinct from 5 then raise exception 'my_overview: ожидалось minutes = 5, получено %', res->>'minutes'; end if;
  if jsonb_typeof(res->'quizzes') is distinct from 'array' or jsonb_array_length(res->'quizzes') <> 0 then
    raise exception 'my_overview: ожидалось quizzes = [], получено %', res->'quizzes';
  end if;
  raise notice 'ok: my_overview';
end $$;
do $$ declare res jsonb := public.class_board((select t from tk), 'w100'); begin
  if (res->>'ok')::boolean is not true then raise exception 'class_board: ожидалось ok = true, получено %', res; end if;
  if (res->>'me')::numeric is distinct from 1 then raise exception 'class_board: ожидалось me = 1, получено %', res->>'me'; end if;
  if res->'time'->0->>'n' is distinct from 'Ученик 01' or (res->'time'->0->>'v')::numeric is distinct from 5 then
    raise exception 'class_board time[0]: ожидалось n = Ученик 01, v = 5, получено %', res->'time'->0;
  end if;
  raise notice 'ok: class_board';
end $$;
\echo == direct table access must fail
do $$ begin perform * from public.learners; raise exception 'SHOULD NOT READ'; exception when insufficient_privilege then raise notice 'ok: no direct access'; end $$;
do $$ begin perform public.teacher_classes(); raise exception 'SHOULD NOT CALL'; exception when insufficient_privilege then raise notice 'ok: anon cannot call teacher fn'; end $$;
reset role;
\echo == lockout
-- в 0001_init.sql (class_login): 5 неверных ПИН одного ученика за 10 минут или 60 на класс → locked
do $$ declare i int; res jsonb; begin
  for i in 1..6 loop
    res := public.class_login((select r->>'join' from tc), '02', '1111');
    if i <= 5 and res->>'err' is distinct from 'pin' then
      raise exception 'блокировка: попытка % с неверным ПИН — ожидалось err = pin, получено ok = %, err = %', i, res->>'ok', res->>'err';
    end if;
  end loop;
  if res->>'err' is distinct from 'locked' then raise exception 'блокировка: после 6 неверных ПИН ожидалось err = locked, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  res := public.class_login((select r->>'join' from tc), '02', (select r->'learners'->1->>'pin' from tl));
  if res->>'err' is distinct from 'locked' then raise exception 'блокировка: верный ПИН во время блокировки — ожидалось err = locked, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  raise notice 'ok: после 6 неверных ПИН и с верным ПИН во время блокировки → locked';
end $$;
\echo == counts
do $$ declare a bigint := (select count(*) from answers); v bigint := (select count(*) from visits); act numeric := (select active_sec from visits);
  ts bigint := (select count(*) from card_tests); st numeric := (select step from card_steps); n numeric := (select n from card_state); begin
  if (a, v, act, ts, st, n) is distinct from (2::bigint, 1::bigint, 300::numeric, 1::bigint, 5::numeric, 2::numeric) then
    raise exception 'счётчики: ожидалось answers = 2, visits = 1, active_sec = 300, card_tests = 1, step = 5, n = 2; получено answers = %, visits = %, active_sec = %, card_tests = %, step = %, n = %', a, v, act, ts, st, n;
  end if;
  raise notice 'ok: answers = 2, visits = 1, active_sec = 300, card_tests = 1, step = 5, n = 2';
end $$;
\echo == other teacher cannot see
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='other@x'), false);
set role authenticated;
do $$ declare res jsonb := public.teacher_classes(); begin
  if res->>'err' is distinct from 'not_teacher' then raise exception 'teacher_classes (не учитель): ожидалось err = not_teacher, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  raise notice 'ok: other@x — not_teacher';
end $$;
do $$ declare res jsonb := public.teacher_report((select (r->>'id')::bigint from tc)); begin
  if res->>'err' is distinct from 'not_owner' then raise exception 'teacher_report чужого класса: ожидалось err = not_owner, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  raise notice 'ok: чужой отчёт — not_owner';
end $$;
-- email-пользователь: учётная запись ученика создаётся сама, подробные ответы не пишутся
do $$ declare res jsonb := public.whoami(null); begin
  if res->>'nickname' is distinct from 'other' then raise exception 'whoami(null) для other@x: ожидалось nickname = other, получено %', res->>'nickname'; end if;
  raise notice 'ok: email-пользователь → other';
end $$;
do $$ declare res jsonb := public.sync_progress(null, '{"deck":"w100","step":1,"words":{"بَيْتٌ":{"n":1,"ok":1,"bad":0,"box":3,"last":1}},"events":[{"id":"x1","w":"بَيْتٌ","ok":true}]}'::jsonb); begin
  if (res->>'ok')::boolean is not true then raise exception 'sync_progress (email-пользователь): ожидалось ok = true, получено %', res; end if;
  raise notice 'ok: sync_progress email-пользователя';
end $$;
reset role;
do $$ declare a bigint := (select count(*) from answers); s bigint := (select count(*) from card_state); begin
  if a <> 2 then raise exception 'email-пользователь: ожидалось answers = 2 (подробные ответы не пишутся), получено %', a; end if;
  if s <> 2 then raise exception 'email-пользователь: ожидалось card_state = 2, получено %', s; end if;
  raise notice 'ok: answers по-прежнему 2, card_state = 2';
end $$;
\echo == teacher report
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
set role authenticated;
do $$ declare res jsonb := public.teacher_report((select (r->>'id')::bigint from tc)); w jsonb := res->'words'->0; th jsonb := res->'themes'->0; begin
  if (res->>'ok')::boolean is not true then raise exception 'teacher_report: ожидалось ok = true, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  if res->'class'->>'name' is distinct from '2 курс ТГУВ' then raise exception 'teacher_report: ожидалось class.name = 2 курс ТГУВ, получено %', res->'class'->>'name'; end if;
  if w->>'w' is distinct from 'كِتَابٌ' or (w->>'n')::numeric is distinct from 2 or (w->>'bad')::numeric is distinct from 1
     or (w->>'pct')::numeric is distinct from 50 then
    raise exception 'teacher_report words[0]: ожидалось w = كِتَابٌ, n = 2, bad = 1, pct = 50, получено %', w;
  end if;
  if th->>'t' is distinct from 'Учёба' or (th->>'n')::numeric is distinct from 2 or (th->>'bad')::numeric is distinct from 1 then
    raise exception 'teacher_report themes[0]: ожидалось t = Учёба, n = 2, bad = 1, получено %', th;
  end if;
  raise notice 'ok: отчёт учителя (класс, слова, темы)';
end $$;
do $$ declare l jsonb := public.teacher_report((select (r->>'id')::bigint from tc))->'learners'->0; begin
  if l->>'code' is distinct from '01' or (l->>'ok')::numeric is distinct from 1 or (l->>'bad')::numeric is distinct from 1 then
    raise exception 'teacher_report learners[0]: ожидалось code = 01, ok = 1, bad = 1, получено code = %, ok = %, bad = %', l->>'code', l->>'ok', l->>'bad';
  end if;
  if (l->'ct'->>'n')::numeric is distinct from 1 or (l->'ct'->>'avg')::numeric is distinct from 75 then
    raise exception 'teacher_report learners[0].ct: ожидалось n = 1, avg = 75, получено %', l->'ct';
  end if;
  if l->'hard'->0->>'w' is distinct from 'كِتَابٌ' then raise exception 'teacher_report learners[0].hard[0]: ожидалось w = كِتَابٌ, получено %', l->'hard'->0; end if;
  raise notice 'ok: отчёт по ученику 01';
end $$;
do $$ declare res jsonb := public.teacher_reset_pins(array[(select (r->'learners'->2->>'id')::bigint from tl)]); begin
  if res->'learners'->0->>'code' is distinct from '03' then raise exception 'teacher_reset_pins: ожидалось code = 03, получено %', res->'learners'->0->>'code'; end if;
  raise notice 'ok: ПИН ученика 03 сброшен';
end $$;
do $$ declare res jsonb := public.teacher_update_learner((select (r->'learners'->2->>'id')::bigint from tl), 'Лиса', 'ж', true); begin
  if (res->>'ok')::boolean is not true then raise exception 'teacher_update_learner: ожидалось ok = true, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  raise notice 'ok: teacher_update_learner';
end $$;
do $$ declare res jsonb := public.admin_set_role('other@x', 'teacher'); begin
  if (res->>'ok')::boolean is not true then raise exception 'admin_set_role: ожидалось ok = true, получено ok = %, err = %', res->>'ok', res->>'err'; end if;
  raise notice 'ok: other@x стал учителем';
end $$;
reset role;
\echo == core tests passed
