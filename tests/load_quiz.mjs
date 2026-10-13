// Нагрузочный тест викторины: N учеников одновременно отправляют результат, затем повторно (как при плохой связи).
// Ожидается: ровно N попыток и N×20 ответов, без потерь и дублей.
// Запуск: эмулятор tests/mock-supabase.mjs на :8787 (см. tests/README.md), затем: node tests/load_quiz.mjs [N]
const API = 'http://localhost:8787', N = +(process.argv[2] || 19), QUIZ = 'matn-10';
const ANON = process.env.ANON;
if (!ANON) { console.error('Укажите ANON=<ключ из вывода mock-supabase>'); process.exit(1); }
async function call(fn, args, bearer = ANON) {
  const r = await fetch(`${API}/rest/v1/rpc/${fn}`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: ANON, Authorization: `Bearer ${bearer}` }, body: JSON.stringify(args) });
  const j = await r.json(); if (!r.ok) throw new Error(`${fn}: ${JSON.stringify(j)}`); return j;
}
const login = await (await fetch(`${API}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: ANON }, body: JSON.stringify({ email: 'teacher@x', password: 'secret123' }) })).json();
const T = login.access_token;
const cls = await call('teacher_create_class', { p_name: 'Нагрузка', p_year: null }, T);
const add = await call('teacher_add_learners', { p_class: cls.id, p_count: N }, T);
const tokens = await Promise.all(add.learners.map(l => call('class_login', { p_join: cls.join, p_code: l.code, p_pin: l.pin }).then(r => r.token)));
const payload = (i) => ({
  id: `load-${cls.id}-${i}`, quiz: QUIZ, points: 10000 + i, total: 20, time: 300, level: 'Хорошо', start: Date.now() - 300000, dev: 'телефон',
  answers: Array.from({ length: 20 }, (_, k) => ({ id: k + 1, s: 'FVGE'[k % 4], q: `سُؤَالٌ ${k + 1}`, a: 'أ', c: k % 3 ? 'أ' : 'ب', ok: k % 3 !== 0, sec: 3.5 })),
});
let t0 = Date.now();
const r1 = await Promise.all(tokens.map((tk, i) => call('quiz_submit', { p_token: tk, p: payload(i) })));
const ms1 = Date.now() - t0; t0 = Date.now();
const r2 = await Promise.all(tokens.map((tk, i) => call('quiz_submit', { p_token: tk, p: payload(i) })));
const ms2 = Date.now() - t0;
const rep = await call('teacher_quiz_report', { p_class: cls.id }, T);
const ans = await call('teacher_quiz_answers', { p_class: cls.id, p_quiz: QUIZ }, T);
const board = await call('quiz_board', { p_join: cls.join, p_quiz: QUIZ, p_hours: 3 });
const ok = r1.every(r => r.ok && !r.dup) && r2.every(r => r.ok && r.dup) && rep.attempts.length === N && ans.rows.length === N * 20 && board.rows.length === N;
console.log(`первая отправка: ${N} одновременно за ${ms1} мс, все приняты: ${r1.every(r => r.ok)}`);
console.log(`повторная отправка за ${ms2} мс, распознаны как дубли: ${r2.every(r => r.dup)}`);
console.log(`в базе попыток: ${rep.attempts.length} (ожидалось ${N}), ответов: ${ans.rows.length} (ожидалось ${N * 20}), на табло: ${board.rows.length}`);
console.log(ok ? 'НАГРУЗОЧНЫЙ ТЕСТ ПРОЙДЕН' : 'ОШИБКА');
process.exit(ok ? 0 : 1);
