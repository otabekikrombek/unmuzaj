// Пробный экзамен: чистые функции src/lib/mock.ts — без сборки и браузера: node tests/mock.mjs (npm run test:mock)
//  - выборка: 30 вопросов без повторов, все из pool, за много экзаменов встречаются все вопросы;
//  - перемешивание: правильный ответ (o[0]) остаётся правильным на любом месте; места распределены равномерно;
//  - время: от отметки начала, 0:00 ровно в конце, предупреждения за 5 и за 1 минуту;
//  - выходы из окна и предел max_exits, итоги по темам, попытка для базы, проверка сохранённого состояния.
import { readFileSync } from 'node:fs';
import * as M from '../src/lib/mock.ts';

const fails = [];
const check = (name, cond, info = '') => { if (!cond) fails.push(`${name} ${info}`); };
const raw = JSON.parse(readFileSync(new URL('../src/content/quizzes/tanal-nahw.json', import.meta.url), 'utf8'));
const X = { key: raw.key, plan: raw.plan, durationMin: raw.duration_min, maxExits: raw.max_exits, pool: raw.pool.map(p => ({ id: p.id, s: p.s, topic: p.topic, q: p.q, o: p.o })) };
const byId = new Map(X.pool.map(p => [p.id, p]));
const N = M.total(X);
check('план: 30 вопросов', N === 30, N);

// ---------- выборка и перемешивание ----------
const seen = new Set(), places = [0, 0, 0, 0];
const RUNS = 2000;
for (let r = 0; r < RUNS; r++) {
  const st = M.newExam(X, 0, 'x' + r);
  if (st.ids.length !== 30) check('30 вопросов', false, st.ids.length);
  if (new Set(st.ids).size !== 30) check('без повторов', false, st.ids.join());
  st.ids.forEach((id, i) => {
    seen.add(id);
    const p = byId.get(id), v = M.view(st, X, i);
    if (!p) return check('вопрос из pool', false, id);
    if (v.options[v.right] !== p.o[0]) check('правильный ответ остаётся правильным', false, id);
    if ([...v.options].sort().join('|') !== [...p.o].sort().join('|')) check('варианты те же', false, id);
    places[v.right]++;
  });
  if (!M.valid(JSON.parse(JSON.stringify(st)), X)) check('новое состояние проходит проверку', false);
}
check('за 2000 экзаменов встретились все 400 вопросов', seen.size === X.pool.length, seen.size);
const exp = RUNS * 30 / 4;
check('правильный ответ на любом из 4 мест примерно поровну (±5 %)', places.every(n => Math.abs(n - exp) / exp < 0.05), places.join());
// случайность: равномерные целые без перекоса
const cnt = [0, 0, 0];
for (let i = 0; i < 30000; i++) cnt[M.cryptoRand(3)]++;
check('cryptoRand(3) равномерно', cnt.every(n => Math.abs(n - 10000) < 600), cnt.join());
// несколько частей плана: из каждой — своё число вопросов, всё вперемешку
const X2 = { ...X, plan: [['A', 2], ['B', 3]], pool: [1, 2, 3, 4, 5, 6, 7].map(i => ({ id: i, s: i <= 3 ? 'A' : 'B', topic: 1, q: 'س' + i, o: ['a' + i, 'b' + i] })) };
const s2 = M.newExam(X2, 0, 'y');
check('план из двух частей', s2.ids.filter(i => i <= 3).length === 2 && s2.ids.filter(i => i > 3).length === 3, s2.ids.join());

// ---------- время ----------
const t0 = 1_760_000_000_000;
const st = M.newExam(X, t0, 'z');
check('30:00 в начале', M.clock(M.left(st, t0)) === '30:00');
check('29:59 через 1 мс', M.clock(M.left(st, t0 + 1)) === '30:00' && M.clock(M.left(st, t0 + 1000)) === '29:59');
check('0:00 ровно в конце', M.clock(M.left(st, t0 + 30 * 60_000)) === '0:00' && M.left(st, t0 + 31 * 60_000) === 0);
check('предупреждений нет в начале', M.dueWarning(st, t0 + 60_000) === null);
check('за 5 минут — предупреждение', M.dueWarning(st, t0 + 25 * 60_000) === 5 * 60_000);
st.warned.push(5 * 60_000);
check('второй раз о 5 минутах не предупреждает', M.dueWarning(st, t0 + 26 * 60_000) === null);
check('за 1 минуту — предупреждение', M.dueWarning(st, t0 + 29 * 60_000 + 1) === 60_000);
const st3 = M.newExam(X, t0, 'w');
check('если пропущены оба — сразу о последнем', M.dueWarning(st3, t0 + 29.5 * 60_000) === 60_000);

// ---------- ответы, отметки, сдача ----------
M.choose(st, 2); M.go(st, 1); M.choose(st, 9); M.go(st, 2);
check('ответ на место 2 записан, неверное место — нет ответа', st.ans[0] === 2 && st.ans[1] === null && st.cur === 2);
M.tick(st, t0, t0 + 5000);
check('время на вопросе считается', st.spent[2] === 5000);
check('без ответа: 29', M.unanswered(st) === 29);
M.go(st, 0); const right0 = M.view(st, X, 0).right; M.choose(st, right0);
M.go(st, 1); M.choose(st, (M.view(st, X, 1).right + 1) % 4);
M.finish(st, t0 + 40 * 60_000, 'time');
check('время сдачи не позже конца', st.end === t0 + 30 * 60_000 && st.reason === 'time');
const before = JSON.stringify(st.ans);
M.choose(st, (st.ans[1] + 1) % 4); M.go(st, 5);
check('после сдачи ничего не меняется', JSON.stringify(st.ans) === before && st.cur === 1);
const R = M.results(st, X);
check('итоги: отвечено 2, верно 1', R.answered === 2 && R.correct === 1 && R.total === 30, JSON.stringify({ a: R.answered, c: R.correct }));
check('итоги: время 30:00', R.timeSec === 1800);
check('итоги по темам: вместе 30 вопросов', R.topics.reduce((a, x) => a + x.n, 0) === 30 && R.topics.reduce((a, x) => a + x.ok, 0) === 1);
check('темы по порядку номеров', R.topics.every((x, i, a) => !i || a[i - 1].topic < x.topic));
const A = M.attempt(st, X, 'компьютер');
check('попытка: без очков и уровня', A.points === 0 && A.level === '' && A.total === 30 && A.correct === 1 && A.exits === 0);
check('попытка: текст ответа и правильного', A.answers[0].ok && A.answers[0].a === byId.get(st.ids[0]).o[0] && A.answers[0].c === byId.get(st.ids[0]).o[0]);
check('попытка: без ответа — пустая строка', A.answers[2].a === '' && !A.answers[2].ok);

// ---------- выходы из окна ----------
const se = M.newExam({ ...X, maxExits: 2 }, t0, 'e');
check('1-й и 2-й выход — без сдачи', M.addExit(se, 2) === false && M.addExit(se, 2) === false && se.exits === 2);
check('3-й выход при пределе 2 — сдача', M.addExit(se, 2) === true && se.exits === 3);
const sn = M.newExam(X, t0, 'n');
for (let i = 0; i < 50; i++) M.addExit(sn, null);
check('без предела выходы только считаются', sn.exits === 50 && !sn.end);

// ---------- сохранённое состояние ----------
const good = JSON.parse(JSON.stringify(M.newExam(X, t0, 'v')));
check('сохранённое состояние проходит проверку', M.valid(good, X));
const bad = [
  s => (s.key = 'other'), s => (s.ids[1] = s.ids[0]), s => (s.ids[0] = 99999), s => (s.perm[0] = [0, 0, 1, 2]),
  s => (s.ans[0] = 7), s => (s.cur = 30), s => (s.v = 2), s => s.marked.pop(), s => (s.exits = -1),
];
bad.forEach((spoil, i) => { const s = JSON.parse(JSON.stringify(good)); spoil(s); check(`испорченное состояние №${i + 1} отвергается`, !M.valid(s, X)); });
check('мусор отвергается', !M.valid(null, X) && !M.valid('x', X) && !M.valid({}, X));

if (fails.length) { console.log(fails.map(f => 'FAIL ' + f).join('\n')); process.exit(1); }
console.log(`mock ok: ${RUNS} экзаменов, места правильного ответа ${places.join('/')}; время, выходы, итоги и проверка состояния в порядке.`);
