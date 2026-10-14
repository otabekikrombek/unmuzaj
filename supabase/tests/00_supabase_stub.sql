-- Имитация окружения Supabase для локальных тестов (на Supabase не выполнять)
create role anon nologin; create role authenticated nologin; create role service_role nologin;
create schema auth; create schema extensions;
create table auth.users (id uuid primary key default gen_random_uuid(), email text, created_at timestamptz default now());
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
grant usage on schema public, auth, extensions to anon, authenticated, service_role;
grant execute on function auth.uid() to anon, authenticated, service_role;
