\set ON_ERROR_STOP 1
-- Миграция 0004: search_path, права на функции, триггер новых пользователей.
-- Запускать после 0001–0004 и 10_test.sql (нужны пользователи teacher@x и other@x).

\echo == search_path задан у всех функций схемы public
do $$ declare r record; begin
  for r in select p.oid::regprocedure f from pg_proc p join pg_namespace n on n.oid = p.pronamespace
           where n.nspname = 'public' and not exists (select 1 from unnest(coalesce(p.proconfig, '{}')) c where c like 'search_path=%')
  loop raise exception 'нет search_path: %', r.f; end loop;
  raise notice 'ok: search_path у всех';
end $$;

\echo == права на функции: ровно как в таблице (кто может вызвать)
create temp table expect (f text primary key, who text not null);  -- who: none | auth | all
insert into expect values
  ('_learner','none'), ('_is_teacher','none'), ('_is_admin','none'), ('_own_class','none'), ('_rand_pin','none'),
  ('_quiz_attempt_json','none'), ('_quiz_best','none'), ('_on_new_user','none'),
  ('ping','all'), ('class_login','all'), ('pin_logout','all'), ('whoami','all'), ('get_deck_state','all'),
  ('sync_progress','all'), ('class_board','all'), ('my_overview','all'), ('quiz_submit','all'),
  ('quiz_my_attempts','all'), ('quiz_class_board','all'), ('quiz_board','all'),
  ('teacher_classes','auth'), ('teacher_create_class','auth'), ('teacher_add_learners','auth'), ('teacher_reset_pins','auth'),
  ('teacher_update_learner','auth'), ('teacher_rename_class','auth'), ('teacher_report','auth'), ('teacher_quiz_report','auth'),
  ('teacher_quiz_attempt','auth'), ('teacher_quiz_answers','auth'), ('admin_set_role','auth');
do $$ declare r record; bad int := 0; begin
  for r in
    select p.oid::regprocedure f, p.proname, e.who,
      has_function_privilege('anon', p.oid, 'execute') a, has_function_privilege('authenticated', p.oid, 'execute') u,
      exists (select 1 from aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) x where x.grantee = 0) pub
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace left join expect e on e.f = p.proname
    where n.nspname = 'public'
  loop
    if r.who is null then raise warning 'новая функция % — добавьте её в таблицу expect этого теста', r.f; bad := bad + 1;
    elsif r.pub then raise warning '% доступна PUBLIC', r.f; bad := bad + 1;
    elsif (r.a, r.u) is distinct from (r.who = 'all', r.who in ('all','auth')) then
      raise warning '%: anon=% authenticated=%, ожидалось %', r.f, r.a, r.u, r.who; bad := bad + 1;
    end if;
  end loop;
  if bad > 0 then raise exception 'права на функции: % расхождений', bad; end if;
  if (select count(*) from expect) <> (select count(*) from pg_proc p join pg_namespace n on n.oid = p.pronamespace
                                        where n.nspname = 'public' and p.proname in (select f from expect)) then
    raise exception 'в базе нет функции из таблицы expect';
  end if;
  raise notice 'ok: права на % функций как в таблице', (select count(*) from expect);
end $$;

\echo == _on_new_user нельзя вызвать, а триггер работает
set role authenticated;
do $$ begin perform public._on_new_user(); raise exception 'SHOULD NOT CALL';
exception when insufficient_privilege then raise notice 'ok: authenticated не может вызвать _on_new_user'; end $$;
reset role;
set role anon;
do $$ begin perform public._on_new_user(); raise exception 'SHOULD NOT CALL';
exception when insufficient_privilege then raise notice 'ok: anon не может вызвать _on_new_user'; end $$;
reset role;
-- в Supabase пользователей создаёт роль supabase_auth_admin (не суперпользователь, права EXECUTE на функцию у неё нет)
do $$ begin create role hard_auth_admin nologin; exception when duplicate_object then null; end $$;
grant usage on schema auth to hard_auth_admin;
grant insert, select on auth.users to hard_auth_admin;
select has_function_privilege('hard_auth_admin', 'public._on_new_user()', 'execute') as auth_admin_can_execute;
set role hard_auth_admin;
insert into auth.users(email) values ('new-after-0004@x');
reset role;
do $$ begin
  if not exists (select 1 from public.profiles p join auth.users u on u.id = p.user_id
                 where u.email = 'new-after-0004@x' and p.role = 'user') then
    raise exception 'триггер не создал профиль';
  end if;
  raise notice 'ok: триггер создал профиль (role = user)';
end $$;
delete from auth.users where email = 'new-after-0004@x';

\echo == _rand_pin и ping работают как раньше
select public._rand_pin() ~ '^\d{4}$' as pin_4_digits;
set role anon;
select public.ping() as ping;
do $$ begin perform public.whoami('00000000-0000-0000-0000-000000000000'::uuid); raise exception 'SHOULD FAIL';
exception when sqlstate '28000' then raise notice 'ok: чужой токен → not_authenticated'; end $$;
reset role;
\echo == hardening tests passed
