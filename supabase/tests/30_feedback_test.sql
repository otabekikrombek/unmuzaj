\set ON_ERROR_STOP 1
-- «Сообщить об ошибке»: отправка, проверки, лимит, кто написал, права, панель администратора, очередь для Telegram.
-- Запускать после 0001–0003 (можно после 10_test.sql и 20_quiz_test.sql). teacher@x — администратор, other@x — нет.
\echo == feedback setup
truncate public.feedback;
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
create temp table fc as select public.teacher_create_class('Класс сообщений', '2026') r;
create temp table fl as select public.teacher_add_learners((select (r->>'id')::bigint from fc), 1) r;
create temp table fk as
  select (public.class_login((select fc.r->>'join' from fc), (r->'learners'->0->>'code'), (r->'learners'->0->>'pin'))->>'token')::uuid t from fl;
grant select on fc, fl, fk to anon, authenticated, service_role;
select set_config('request.jwt.claim.sub', '', false);
set role anon;

do $$
declare res jsonb; tok uuid := (select t from fk); i int;
begin
  -- 1. гость: сообщение сохраняется, адрес и задание подставлены
  res := public.submit_feedback(null, '{"message":"  В вопросе 12 опечатка  ","contact":"me@x","page":"https://site/quizzes/matn-10/",
    "item":"quiz:matn-10#12","item_label":"Вопрос 12","lang":"ru","device":"телефон · 360×740","device_id":"dev-guest-1"}');
  if not (res->>'ok')::boolean or res->>'id' is null then raise exception 'guest submit %', res; end if;
  -- 2. проверки текста и устройства
  if public.submit_feedback(null, '{"message":"   ","device_id":"dev-guest-1"}')->>'err' <> 'empty' then raise exception 'empty accepted'; end if;
  if public.submit_feedback(null, jsonb_build_object('message', repeat('я', 2001), 'device_id', 'dev-guest-1'))->>'err' <> 'too_long' then raise exception '2001 chars accepted'; end if;
  if public.submit_feedback(null, '{"message":"нет устройства"}')->>'err' <> 'bad' then raise exception 'no device_id accepted'; end if;
  res := public.submit_feedback(null, jsonb_build_object('message', repeat('я', 2000), 'device_id', 'dev-guest-1', 'contact', repeat('c', 300), 'page', repeat('p', 900)));
  if not (res->>'ok')::boolean then raise exception '2000 chars rejected %', res; end if;
  -- 3. лимит: 5 сообщений за 10 минут с одного устройства (2 уже есть)
  for i in 3..5 loop
    res := public.submit_feedback(null, jsonb_build_object('message', 'сообщение ' || i, 'device_id', 'dev-guest-1'));
    if not (res->>'ok')::boolean then raise exception 'message % rejected %', i, res; end if;
  end loop;
  res := public.submit_feedback(null, '{"message":"шестое","device_id":"dev-guest-1"}');
  if res->>'err' <> 'rate' then raise exception '6th message accepted %', res; end if;
  res := public.submit_feedback(null, '{"message":"с другого устройства","device_id":"dev-guest-2"}');
  if not (res->>'ok')::boolean then raise exception 'other device rejected %', res; end if;
  -- 4. ученик класса: сообщение подписано его учётной записью; устаревший вход не мешает
  res := public.submit_feedback(tok, '{"message":"ошибка в слове","item":"words:w100#كِتَابٌ","device_id":"dev-pupil-1"}');
  if not (res->>'ok')::boolean then raise exception 'pupil submit %', res; end if;
  res := public.submit_feedback(gen_random_uuid(), '{"message":"вход устарел","device_id":"dev-pupil-2"}');
  if not (res->>'ok')::boolean then raise exception 'stale token rejected %', res; end if;
  -- 5. прямого доступа нет, функции администратора и Telegram закрыты
  begin perform * from public.feedback; raise exception 'anon read feedback';
  exception when insufficient_privilege then raise notice 'ok: anon cannot read feedback'; end;
  begin insert into public.feedback(message, device_id) values ('x', 'xxxxxxxx'); raise exception 'anon inserted';
  exception when insufficient_privilege then raise notice 'ok: anon cannot insert'; end;
  begin perform * from public.app_settings; raise exception 'anon read settings';
  exception when insufficient_privilege then raise notice 'ok: anon cannot read app_settings'; end;
  begin perform public.admin_feedback(); raise exception 'anon called admin_feedback';
  exception when insufficient_privilege then raise notice 'ok: anon cannot call admin_feedback'; end;
  begin perform public.feedback_take_unsent(10); raise exception 'anon called feedback_take_unsent';
  exception when insufficient_privilege then raise notice 'ok: anon cannot call feedback_take_unsent'; end;
end $$;
reset role;

\echo == stored values
select count(*) as messages, count(*) filter (where learner_id is not null) as signed,
       max(char_length(contact)) as contact_max, max(char_length(page)) as page_max, bool_and(status = 'new') as all_new from feedback;
select message, item, learner_id is null as guest from feedback order by id limit 1;

\echo == email user and non-admin
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='other@x'), false);
set role authenticated;
do $$
declare res jsonb;
begin
  perform public.whoami(null);  -- учётная запись ученика для email-пользователя
  res := public.submit_feedback(null, '{"message":"от пользователя с email","device_id":"dev-email-1"}');
  if not (res->>'ok')::boolean then raise exception 'email submit %', res; end if;
  if public.admin_feedback()->>'err' <> 'not_admin' then raise exception 'non-admin sees feedback'; end if;
  if public.admin_feedback_set(array[1::bigint], 'fixed')->>'err' <> 'not_admin' then raise exception 'non-admin changed feedback'; end if;
  begin perform public.feedback_take_unsent(10); raise exception 'authenticated called feedback_take_unsent';
  exception when insufficient_privilege then raise notice 'ok: authenticated cannot call feedback_take_unsent'; end;
end $$;
reset role;
select count(*) as email_signed from feedback f join learners l on l.id = f.learner_id where l.user_id is not null;

\echo == admin panel
select set_config('request.jwt.claim.sub', (select id::text from auth.users where email='teacher@x'), false);
set role authenticated;
do $$
declare res jsonb; ids bigint[]; pupil jsonb;
begin
  res := public.admin_feedback();
  if (res->'counts'->>'new')::int <> 9 or jsonb_array_length(res->'rows') <> 9 then raise exception 'admin list %', res->'counts'; end if;
  select x into pupil from jsonb_array_elements(res->'rows') x where x->>'item' like 'words:%';
  if pupil->>'nickname' <> 'Ученик 01' or pupil->>'class' <> 'Класс сообщений' then raise exception 'pupil not shown %', pupil; end if;
  -- новые сверху: [1] email, [2] устаревший вход, [3] ученик, [4] второе устройство гостя
  select array_agg((x->>'id')::bigint) into ids from (select x from jsonb_array_elements(res->'rows') x limit 4) y;
  if (public.admin_feedback_set(ids[3:4], 'read')->>'n')::int <> 2 then raise exception 'mark read'; end if;
  if (public.admin_feedback_set(ids[4:4], 'fixed')->>'n')::int <> 1 then raise exception 'mark fixed'; end if;
  if public.admin_feedback_set(ids, 'oops')->>'err' <> 'status' then raise exception 'bad status accepted'; end if;
  if (public.admin_feedback_set(ids[2:2], 'delete')->>'n')::int <> 1 then raise exception 'delete'; end if;
  res := public.admin_feedback();
  if res->'counts' <> '{"new": 6, "read": 1, "fixed": 1}'::jsonb then raise exception 'counts after update %', res->'counts'; end if;
  if jsonb_array_length(public.admin_feedback('fixed')->'rows') <> 1 then raise exception 'filter by status'; end if;
end $$;
reset role;

\echo == telegram queue (service_role)
update feedback set created_at = now() - interval '8 days' where id = (select min(id) from feedback);  -- старое — не пересылается
set role service_role;
do $$
declare a jsonb; b jsonb; c jsonb;
begin
  a := public.feedback_take_unsent(5);
  if jsonb_array_length(a) <> 5 then raise exception 'take 5: %', jsonb_array_length(a); end if;
  if a->0 ? 'device_id' then raise exception 'device_id must not leave the database'; end if;
  b := public.feedback_take_unsent(50);
  if jsonb_array_length(b) <> 2 then raise exception 'take rest: %', jsonb_array_length(b); end if;
  if jsonb_array_length(public.feedback_take_unsent(50)) <> 0 then raise exception 'sent twice'; end if;
  perform public.feedback_mark_unsent(array[(b->0->>'id')::bigint]);
  c := public.feedback_take_unsent(50);
  if jsonb_array_length(c) <> 1 or c->0->>'id' <> b->0->>'id' then raise exception 'release failed %', c; end if;
  if not exists (select 1 from jsonb_array_elements(a || b) x where x->>'nickname' = 'Ученик 01' and x->>'class' = 'Класс сообщений') then
    raise exception 'pupil name missing for telegram'; end if;
end $$;
reset role;
select count(*) filter (where sent_at is null) as unsent_old from feedback;
\echo == feedback tests passed
