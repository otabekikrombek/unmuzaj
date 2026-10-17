-- ═══════════════════════════════════════════════════════════════════
-- Allimni · версия 4: укрепление базы (по отчёту Supabase Security Advisor от 17.10.2026)
-- Выполнить ПОСЛЕ 0001–0003: Supabase → SQL Editor → New query → вставить → Run.
-- Повторный запуск безопасен. Таблицы, данные и ответы функций не меняются — только права и настройки функций.
-- ═══════════════════════════════════════════════════════════════════

-- 1. Фиксированный search_path у двух функций без него (Advisor: function_search_path_mutable).
--    Без этого функция ищет таблицы и функции по пути того, кто её вызвал.
alter function public._rand_pin() set search_path = public;
alter function public.ping() set search_path = public;

-- 2. Триггерная функция: вызывать её напрямую (через /rest/v1/rpc) никому не нужно.
--    Триггер на auth.users продолжает работать: право EXECUTE проверяется при создании триггера, а не при срабатывании.
revoke execute on function public._on_new_user() from public, anon, authenticated;

-- 3. Права на функции — явный список. Право «для всех» (PUBLIC) снимаем везде: нужные роли получают его по имени.
--    a) служебные — никому, кроме владельца
revoke all on function public._learner(uuid), public._is_teacher(), public._is_admin(), public._own_class(bigint),
  public._rand_pin(), public._quiz_attempt_json(text), public._quiz_best(bigint, text, int)
  from public, anon, authenticated;

--    b) ученики (anon с токеном входа) и вошедшие по email; проверка — токен или auth.uid() внутри _learner()
--       ping — «будильник» базы (keepalive.yml), class_login и quiz_board — без входа по замыслу
revoke execute on function public.ping(), public.class_login(text, text, text), public.pin_logout(uuid), public.whoami(uuid),
  public.get_deck_state(uuid, text), public.sync_progress(uuid, jsonb), public.class_board(uuid, text), public.my_overview(uuid),
  public.quiz_submit(uuid, jsonb), public.quiz_my_attempts(uuid, text), public.quiz_class_board(uuid, text, int),
  public.quiz_board(text, text, int)
  from public;
grant execute on function public.ping(), public.class_login(text, text, text), public.pin_logout(uuid), public.whoami(uuid),
  public.get_deck_state(uuid, text), public.sync_progress(uuid, jsonb), public.class_board(uuid, text), public.my_overview(uuid),
  public.quiz_submit(uuid, jsonb), public.quiz_my_attempts(uuid, text), public.quiz_class_board(uuid, text, int),
  public.quiz_board(text, text, int)
  to anon, authenticated;

--    c) учитель и администратор — только вошедшие по email; проверка роли/класса внутри (_is_teacher, _own_class, _is_admin)
revoke execute on function public.teacher_classes(), public.teacher_create_class(text, text), public.teacher_add_learners(bigint, int),
  public.teacher_reset_pins(bigint[]), public.teacher_update_learner(bigint, text, text, boolean),
  public.teacher_rename_class(bigint, text, text, boolean), public.teacher_report(bigint, timestamptz, timestamptz),
  public.teacher_quiz_report(bigint, timestamptz, timestamptz), public.teacher_quiz_attempt(text),
  public.teacher_quiz_answers(bigint, text, timestamptz, timestamptz), public.admin_set_role(text, text)
  from public, anon;
grant execute on function public.teacher_classes(), public.teacher_create_class(text, text), public.teacher_add_learners(bigint, int),
  public.teacher_reset_pins(bigint[]), public.teacher_update_learner(bigint, text, text, boolean),
  public.teacher_rename_class(bigint, text, text, boolean), public.teacher_report(bigint, timestamptz, timestamptz),
  public.teacher_quiz_report(bigint, timestamptz, timestamptz), public.teacher_quiz_attempt(text),
  public.teacher_quiz_answers(bigint, text, timestamptz, timestamptz), public.admin_set_role(text, text)
  to authenticated;

-- 4. Проверка после запуска: в «Messages» появится NOTICE, если в схеме public есть функция,
--    которую может вызвать anon или authenticated и которой нет в списках выше
--    (например, созданная вручную в панели Supabase). Сама миграция такие функции не трогает.
do $$ declare r record; begin
  for r in
    select p.oid::regprocedure as f from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and (has_function_privilege('anon', p.oid, 'execute') or has_function_privilege('authenticated', p.oid, 'execute'))
      and p.proname not in ('ping','class_login','pin_logout','whoami','get_deck_state','sync_progress','class_board','my_overview',
        'quiz_submit','quiz_my_attempts','quiz_class_board','quiz_board',
        'teacher_classes','teacher_create_class','teacher_add_learners','teacher_reset_pins','teacher_update_learner',
        'teacher_rename_class','teacher_report','teacher_quiz_report','teacher_quiz_attempt','teacher_quiz_answers','admin_set_role')
  loop
    raise notice 'Проверьте вручную: функция % доступна anon/authenticated, её нет в списках миграции 0004', r.f;
  end loop;
end $$;

-- PostgREST перечитывает список функций
notify pgrst, 'reload schema';
