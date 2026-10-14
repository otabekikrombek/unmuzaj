-- ═══════════════════════════════════════════════════════════════════
-- Unmuzaj · версия 3: «Сообщить об ошибке» (обратная связь, CLAUDE.md §15.2)
-- Выполнить ПОСЛЕ 0002_quizzes.sql: Supabase → SQL Editor → New query → вставить → Run.
-- Повторный запуск безопасен.
--
-- Как это работает:
--   1. Посетитель пишет сообщение → submit_feedback сохраняет его в таблицу feedback
--      (не больше 5 сообщений за 10 минут с одного устройства, текст ≤ 2000 символов).
--   2. Триггер после записи «будит» Edge Function feedback-telegram (через расширение pg_net).
--      Функция сама забирает из базы ещё не отправленные сообщения и пересылает их в Telegram.
--      Токен бота и chat_id хранятся только в секретах Supabase, в базе и в коде их нет.
--   3. Если функция не установлена или Telegram недоступен — сообщения просто копятся в базе,
--      администратор видит их в панели учителя, вкладка «Сообщения».
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  message text not null,                                   -- что не так (≤ 2000)
  contact text,                                            -- необязательный контакт для ответа
  page text,                                               -- адрес страницы
  item text,                                               -- ключ задания: quiz:matn-10#12, words:w100#كِتَابٌ
  item_label text,                                         -- то же для человека: текст вопроса, слово с переводом
  lang text,                                               -- язык интерфейса
  device text,                                             -- телефон/компьютер, размер экрана, браузер
  device_id text not null,                                 -- случайный номер устройства (только для лимита)
  learner_id bigint references public.learners(id) on delete set null,   -- кто написал, если вошёл
  status text not null default 'new' check (status in ('new','read','fixed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  sent_at timestamptz                                      -- когда переслано в Telegram
);
create index if not exists feedback_device_idx on public.feedback (device_id, created_at);
create index if not exists feedback_created_idx on public.feedback (created_at);
create index if not exists feedback_unsent_idx on public.feedback (id) where sent_at is null;

-- Служебные настройки (адрес функции для уведомлений). Только для базы, снаружи недоступны.
create table if not exists public.app_settings (key text primary key, value text not null);

do $$ declare t text; begin
  foreach t in array array['feedback','app_settings'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon, authenticated', t);
  end loop;
end $$;

-- ---------- для всех: отправить сообщение ----------
-- p = {message, contact, page, item, item_label, lang, device, device_id}
create or replace function public.submit_feedback(p_token uuid, p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_msg text := btrim(coalesce(p->>'message', '')); v_dev text := left(btrim(coalesce(p->>'device_id', '')), 64);
  lid bigint; v_id bigint;
begin
  if v_msg = '' then return jsonb_build_object('ok', false, 'err', 'empty'); end if;
  if char_length(v_msg) > 2000 then return jsonb_build_object('ok', false, 'err', 'too_long'); end if;
  if char_length(v_dev) < 8 then return jsonb_build_object('ok', false, 'err', 'bad'); end if;
  -- сообщения одного устройства — по очереди, чтобы одновременные отправки не обошли лимит
  perform pg_advisory_xact_lock(hashtext('feedback:' || v_dev));
  if (select count(*) from feedback where device_id = v_dev and created_at > now() - interval '10 minutes') >= 5
     -- общий потолок на случай рассылки спама с «разных устройств»
     or (select count(*) from feedback where created_at > now() - interval '1 hour') >= 200 then
    return jsonb_build_object('ok', false, 'err', 'rate');
  end if;
  -- кто пишет, если вошёл; устаревший вход не мешает отправить сообщение
  if p_token is not null then
    select t.learner_id into lid from pin_tokens t where t.token = p_token and t.expires_at > now();
  elsif auth.uid() is not null then
    select id into lid from learners where user_id = auth.uid();
  end if;
  insert into feedback (message, contact, page, item, item_label, lang, device, device_id, learner_id)
  values (v_msg, nullif(left(btrim(coalesce(p->>'contact', '')), 200), ''), left(p->>'page', 500), left(p->>'item', 200),
          left(p->>'item_label', 300), left(p->>'lang', 10), left(p->>'device', 300), v_dev, lid)
  returning id into v_id;
  return jsonb_build_object('ok', true, 'id', v_id);
end $$;

-- ---------- администратор: вкладка «Сообщения» ----------
create or replace function public.admin_feedback(p_status text default null, p_limit int default 300) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  if not _is_admin() then return jsonb_build_object('ok', false, 'err', 'not_admin'); end if;
  return jsonb_build_object('ok', true,
    'counts', (select jsonb_build_object('new', count(*) filter (where status = 'new'), 'read', count(*) filter (where status = 'read'),
        'fixed', count(*) filter (where status = 'fixed')) from feedback),
    'rows', coalesce((select jsonb_agg(to_jsonb(x) order by x.id desc) from (
        select f.id, f.created_at as at, f.status, f.message, f.contact, f.page, f.item, f.item_label, f.lang, f.device,
          f.sent_at is not null as sent, l.nickname, l.code, c.name as class
        from feedback f left join learners l on l.id = f.learner_id left join classes c on c.id = l.class_id
        where p_status is null or f.status = p_status
        order by f.id desc limit least(greatest(coalesce(p_limit, 300), 1), 1000)) x), '[]'));
end $$;

-- Отметить сообщения: 'new' | 'read' | 'fixed'; 'delete' — удалить (например, спам)
create or replace function public.admin_feedback_set(p_ids bigint[], p_status text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if not _is_admin() then return jsonb_build_object('ok', false, 'err', 'not_admin'); end if;
  if p_status = 'delete' then
    delete from feedback where id = any(p_ids);
  elsif p_status in ('new','read','fixed') then
    update feedback set status = p_status, updated_at = now() where id = any(p_ids) and status <> p_status;
  else
    return jsonb_build_object('ok', false, 'err', 'status');
  end if;
  get diagnostics n = row_count;
  return jsonb_build_object('ok', true, 'n', n);
end $$;

-- ---------- для Edge Function feedback-telegram (только ключ service_role) ----------
-- Забрать ещё не отправленные сообщения (за последние 7 дней) и пометить их отправленными.
-- Две функции, запущенные одновременно, не получат одно и то же сообщение (skip locked).
create or replace function public.feedback_take_unsent(p_limit int default 10) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r jsonb;
begin
  with c as (
    update feedback f set sent_at = now()
    where f.id in (select id from feedback where sent_at is null and created_at > now() - interval '7 days'
                   order by id limit least(greatest(coalesce(p_limit, 10), 1), 50) for update skip locked)
    returning f.*)
  select coalesce(jsonb_agg(jsonb_build_object('id', c.id, 'at', c.created_at, 'message', c.message, 'contact', c.contact,
      'page', c.page, 'item', c.item, 'item_label', c.item_label, 'device', c.device,
      'nickname', l.nickname, 'code', l.code, 'class', k.name) order by c.id), '[]')
  into r from c left join learners l on l.id = c.learner_id left join classes k on k.id = l.class_id;
  return r;
end $$;

-- Telegram не принял сообщения — вернуть их в очередь, они уйдут при следующем запуске
create or replace function public.feedback_mark_unsent(p_ids bigint[]) returns void
language sql security definer set search_path = public as $$
  update feedback set sent_at = null where id = any(p_ids)
$$;

-- ---------- уведомление: после записи сообщения «разбудить» функцию ----------
-- pg_net есть на Supabase; в локальной базе для тестов его нет — тогда уведомлений просто не будет.
do $$ begin
  create extension if not exists pg_net;
exception when others then
  raise notice 'pg_net недоступен: сообщения сохраняются в базе, но в Telegram не пересылаются';
end $$;

create or replace function public._feedback_notify() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_url text := (select value from app_settings where key = 'feedback_hook_url');
  v_key text := coalesce((select value from app_settings where key = 'feedback_hook_key'), '');
begin
  if v_url is null or v_url = '' or not exists (select 1 from pg_extension where extname = 'pg_net') then return null; end if;
  -- запрос уходит после сохранения сообщения и не задерживает посетителя;
  -- в запросе нет текста сообщения: функция сама читает его из базы
  perform net.http_post(url := v_url, body := '{}'::jsonb,
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key, 'apikey', v_key),
    timeout_milliseconds := 5000);
  return null;
exception when others then
  return null;  -- уведомление никогда не мешает сохранить сообщение
end $$;
drop trigger if exists feedback_notify on public.feedback;
create trigger feedback_notify after insert on public.feedback for each statement execute function public._feedback_notify();

-- Адрес функции этого проекта и публичный ключ anon (тот же, что в src/config/site.ts; это не секрет).
-- Для другого проекта Supabase замените оба значения. Выключить уведомления:
--   delete from public.app_settings where key = 'feedback_hook_url';
insert into public.app_settings (key, value) values
  ('feedback_hook_url', 'https://orclqaqvxzczhxfzflau.supabase.co/functions/v1/feedback-telegram'),
  ('feedback_hook_key', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yY2xxYXF2eHpjemh4ZnpmbGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MjA0NTgsImV4cCI6MjEwNzM5NjQ1OH0.XySFR25iMGAi2ufcZ4YHbEVrlPTLlo6qDcDxAx_awfc')
on conflict (key) do nothing;

-- ---------- права на вызов функций ----------
revoke all on function public._feedback_notify() from public, anon, authenticated;
grant execute on function public.submit_feedback(uuid, jsonb) to anon, authenticated;
revoke execute on function public.admin_feedback(text, int), public.admin_feedback_set(bigint[], text) from public, anon;
grant execute on function public.admin_feedback(text, int), public.admin_feedback_set(bigint[], text) to authenticated;
revoke execute on function public.feedback_take_unsent(int), public.feedback_mark_unsent(bigint[]) from public, anon, authenticated;
grant execute on function public.feedback_take_unsent(int), public.feedback_mark_unsent(bigint[]) to service_role;
