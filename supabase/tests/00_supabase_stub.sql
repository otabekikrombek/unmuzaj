-- Имитация окружения Supabase для локальных тестов (на Supabase не выполнять)
create role anon nologin; create role authenticated nologin;
create schema auth; create schema extensions;
create table auth.users (id uuid primary key default gen_random_uuid(), email text, created_at timestamptz default now());
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
grant usage on schema public, auth, extensions to anon, authenticated;
grant execute on function auth.uid() to anon, authenticated;
-- как в Supabase: новые функции в public сразу получают EXECUTE для anon и authenticated
alter default privileges in schema public grant execute on functions to anon, authenticated;
