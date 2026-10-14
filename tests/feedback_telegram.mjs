// Тест Edge Function supabase/functions/feedback-telegram с поддельным Telegram (без настоящего бота).
// Проверяет: без секретов ничего не уходит и не теряется; сообщение гостя и ученика приходит один раз;
// чужое содержимое запроса не попадает в Telegram; Telegram недоступен → сообщение уйдёт при следующем запуске;
// одновременные запуски не дублируют сообщения.
// Нужно: база e2e и эмулятор tests/mock-supabase.mjs на :8787 (tests/README.md), Deno (ставится сам через npx).
// Запуск: ANON=<ключ> SERVICE=<ключ> node tests/feedback_telegram.mjs   (оба ключа печатает эмулятор)
import http from 'node:http';
import { spawn, execFileSync } from 'node:child_process';
import pg from 'pg';
const API = 'http://localhost:8787', FN = 'http://localhost:8000', TG = 8788;
const { ANON, SERVICE } = process.env;
if (!ANON || !SERVICE) { console.error('Укажите ANON=<ключ> SERVICE=<ключ> из вывода mock-supabase'); process.exit(1); }
const db = new pg.Pool({ host: 'localhost', port: 54329, user: 'postgres', password: 'pw', database: process.env.DB || 'e2e' });
const sql = async (q, v) => (await db.query(q, v)).rows;
const fails = [];
const check = (name, cond, info = '') => { console.log((cond ? 'OK   ' : 'FAIL ') + name, cond ? '' : info); if (!cond) fails.push(name); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function call(fn, args, bearer = ANON) {
  const r = await fetch(`${API}/rest/v1/rpc/${fn}`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: ANON, Authorization: `Bearer ${bearer}` }, body: JSON.stringify(args) });
  const j = await r.json(); if (!r.ok) throw new Error(`${fn}: ${JSON.stringify(j)}`); return j;
}
const send = (message, extra = {}, token = null) => call('submit_feedback', { p_token: token, p: { message, device_id: 'dev-' + Math.random().toString(36).slice(2, 10), page: 'https://site/unmuzaj/quizzes/matn-10/', lang: 'ru', device: 'телефон · 360×740', ...extra } });

// ---------- поддельный Telegram ----------
let tgDown = false; const got = [];
const tg = http.createServer(async (req, res) => {
  let b = ''; for await (const c of req) b += c;
  if (tgDown) { res.writeHead(502, { 'Content-Type': 'application/json' }); return res.end('{"ok":false,"description":"Bad Gateway"}'); }
  got.push({ url: req.url, ...JSON.parse(b) });
  res.writeHead(200, { 'Content-Type': 'application/json' }); res.end('{"ok":true}');
}).listen(TG);

// ---------- функция в Deno ----------
// npx лишь находит Deno; саму функцию запускаем напрямую, чтобы её можно было остановить и перезапустить
const DENO = execFileSync('npx', ['--yes', 'deno', 'eval', 'console.log(Deno.execPath())'], { encoding: 'utf8' }).trim();
let proc = null;
const up = async () => { try { await fetch(FN, { method: 'OPTIONS' }); return true; } catch { return false; } };
async function stopFn() {
  if (!proc) return;
  proc.kill(); proc = null;
  for (let i = 0; i < 40 && await up(); i++) await sleep(250);
}
async function startFn(secrets) {
  await stopFn();
  proc = spawn(DENO, ['run', '--quiet', '--allow-net', '--allow-env', 'supabase/functions/feedback-telegram/index.ts'], {
    env: { ...process.env, DENO_NO_UPDATE_CHECK: '1', SUPABASE_URL: API, SUPABASE_SERVICE_ROLE_KEY: SERVICE, TELEGRAM_API: `http://localhost:${TG}`, ...secrets },
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  for (let i = 0; i < 120; i++) { if (await up()) return; await sleep(250); }
  throw new Error('функция не запустилась');
}
const poke = async (body = '{}') => (await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })).json();

try {
  await sql('truncate public.feedback');
  // 1. без секретов Telegram: ничего не уходит и не теряется
  await startFn({ TELEGRAM_BOT_TOKEN: '', TELEGRAM_CHAT_ID: '' });
  await send('Опечатка в вопросе 12', { item: 'quiz:matn-10#12', item_label: 'Вопрос 12: مَا هٰذَا؟', contact: '@student' });
  let r = await poke();
  check('без секретов: функция сообщает, что их нет', r.err === 'no_telegram_secrets', JSON.stringify(r));
  check('без секретов: сообщение ждёт в базе', (await sql('select count(*)::int n from feedback where sent_at is null'))[0].n === 1);

  // 2. с секретами: накопленное сообщение приходит один раз, обычным текстом
  await startFn({ TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: '42' });
  r = await poke('{"record":{"message":"ПОДДЕЛКА"}}');
  check('с секретами: отправлено 1', r.ok && r.sent === 1, JSON.stringify(r));
  const m = got[0] || {};
  check('Telegram: адрес бота и chat_id', m.url === '/bottest-token/sendMessage' && m.chat_id === '42', JSON.stringify(m));
  check('Telegram: текст, страница, задание, контакт', /Опечатка в вопросе 12/.test(m.text) && /Страница: https:\/\/site\/unmuzaj\/quizzes\/matn-10\//.test(m.text)
    && /Задание: Вопрос 12: مَا هٰذَا؟ \(quiz:matn-10#12\)/.test(m.text) && /Контакт: @student/.test(m.text) && /Кто: гость/.test(m.text), m.text);
  check('Telegram: без разметки (parse_mode не задан)', !('parse_mode' in m));
  check('содержимое запроса к функции игнорируется', !got.some(x => /ПОДДЕЛКА/.test(x.text)));
  r = await poke();
  check('повторный запуск ничего не дублирует', r.sent === 0 && got.length === 1, JSON.stringify(r));

  // 3. сообщение ученика класса подписано псевдонимом и классом
  const login = await (await fetch(`${API}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: ANON }, body: JSON.stringify({ email: 'teacher@x', password: 'secret123' }) })).json();
  const cls = await call('teacher_create_class', { p_name: 'Класс Telegram', p_year: null }, login.access_token);
  const add = await call('teacher_add_learners', { p_class: cls.id, p_count: 1 }, login.access_token);
  const tok = (await call('class_login', { p_join: cls.join, p_code: add.learners[0].code, p_pin: add.learners[0].pin })).token;
  await send('Ошибка в переводе', { item: 'words:w100#كِتَابٌ', item_label: 'كِتَابٌ — книга' }, tok);
  await poke();
  check('ученик: «Кто: Ученик 01, класс …»', /Кто: Ученик 01, класс «Класс Telegram»/.test(got.at(-1)?.text), got.at(-1)?.text);

  // 4. Telegram недоступен → сообщение вернулось в очередь и ушло позже
  tgDown = true; await send('Пока Telegram не работает');
  r = await poke();
  check('Telegram недоступен: ошибка отмечена', r.failed === 1, JSON.stringify(r));
  check('Telegram недоступен: сообщение снова ждёт отправки', (await sql('select count(*)::int n from feedback where sent_at is null'))[0].n === 1);
  tgDown = false; const before = got.length; r = await poke();
  check('Telegram снова работает: сообщение ушло', r.sent === 1 && /Пока Telegram не работает/.test(got.at(-1)?.text) && got.length === before + 1, JSON.stringify(r));

  // 5. одновременные запуски (несколько сообщений сразу) не дают дублей
  const n0 = got.length;
  await Promise.all([1, 2, 3].map(i => send(`Одновременно ${i}`)));
  await Promise.all([poke(), poke(), poke(), poke()]);
  const texts = got.slice(n0).map(x => x.text.match(/Одновременно \d/)?.[0]);
  check('одновременно: 3 сообщения, без дублей', texts.length === 3 && new Set(texts).size === 3, JSON.stringify(texts));
  check('в базе всё отмечено отправленным', (await sql('select count(*)::int n from feedback where sent_at is null'))[0].n === 0);
} catch (e) { console.error(e); fails.push(String(e)); }
finally { proc?.kill(); tg.close(); await db.end(); }
console.log(fails.length ? `ОШИБОК: ${fails.length}` : 'ТЕСТ ФУНКЦИИ TELEGRAM ПРОЙДЕН');
process.exit(fails.length ? 1 : 0);
