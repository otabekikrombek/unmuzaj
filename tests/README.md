# Тесты

## База данных (`supabase/tests/`)

Нужен локальный PostgreSQL 15+ (проверено на 17).

```bash
createdb t1
psql -d t1 -f supabase/tests/00_supabase_stub.sql      # имитация auth.users, auth.uid(), ролей anon/authenticated
psql -d t1 -c "insert into auth.users(email, created_at) values ('teacher@x', now() - interval '1 day'), ('other@x', now())"
psql -d t1 -v ON_ERROR_STOP=1 -f supabase/migrations/0001_init.sql
psql -d t1 -f supabase/tests/10_test.sql
```

Что проверяется:
- вход по ПИН и неверный ПИН;
- блокировка после 5 ошибок;
- синхронизация без дублей;
- устаревшие данные не затирают новые;
- нет прямого доступа к таблицам;
- чужой учитель ничего не видит;
- отчёт, сброс ПИН, роли.

## Сквозной тест (`tests/e2e/flow.py`)

1. База `e2e`: шаги выше, но с одним пользователем `teacher@x`.
2. `DB=e2e node tests/mock-supabase.mjs` — мини-эмулятор Supabase на `:8787`. Пароль любого пользователя — `secret123`. Печатает тестовый `ANON`-ключ.
3. Собрать сайт на эмулятор: `PUBLIC_SUPABASE_URL=http://localhost:8787 PUBLIC_SUPABASE_ANON_KEY=<ANON> npm run build`, затем раздать `dist` как `/unmuzaj/` на `:4322`.
4. `python3 tests/e2e/flow.py` (нужен Playwright для Python).

Сценарий:
1. Учитель создаёт класс и получает ПИН.
2. Ученик занимается как гость, затем входит в класс; прогресс гостя переносится.
3. Ученик занимается карточками, проходит тест, теряет связь и восстанавливает её.
4. На втором устройстве виден тот же прогресс.
5. Срабатывает блокировка ПИН.
6. Рейтинг класса, страница «Мой прогресс», отчёт учителя, настоящие имена (видны только локально).
