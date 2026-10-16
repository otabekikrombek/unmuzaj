// Пробный экзамен (/mock/<экзамен>/): выборка вопросов, состояние, время, итоги. Только чистые функции —
// страница src/pages/[...locale]/mock/[key].astro хранит состояние в localStorage и рисует экраны.
// Движок викторин (src/lib/quiz.ts) не используется: здесь нет очков, уровней и таймера на вопрос.

/** вопрос экзамена: o — варианты, первый правильный (как в src/content/quizzes) */
export type MockItem = { id: number; s: string; topic: number; q: string; o: string[] };
export type MockData = { key: string; plan: [string, number][]; durationMin: number; maxExits: number | null; pool: MockItem[] };

/**
 * Состояние одного экзамена. Хранится целиком в localStorage: перезагрузка страницы ничего не сбрасывает.
 * ids — вопросы по порядку; perm[i][k] — какой вариант из o стоит на месте k (0 — правильный);
 * ans[i] — выбранное место (null — нет ответа); spent[i] — мс на вопросе.
 */
export type MockState = {
  v: 1; id: string; key: string;
  ids: number[]; perm: number[][]; ans: (number | null)[]; marked: boolean[]; spent: number[];
  cur: number; start: number; dur: number; exits: number; warned: number[];
  end?: number; reason?: 'user' | 'time' | 'exits';
};

/** адрес экзамена внутри сайта (без языка): mock/<path>/, path — «книга/предмет» (tanal/nahw), по умолчанию key */
export const mockHref = (q: { key: string; path?: string }) => `mock/${q.path ?? q.key}/`;

/** буквы вариантов по месту после перемешивания */
export const LETTERS = ['أ', 'ب', 'ج', 'د'];

// ---------- случайность (crypto.getRandomValues) ----------
export type Rand = (n: number) => number; // целое 0 ≤ x < n
/** равномерно, без перекоса: лишние значения отбрасываются */
export const cryptoRand: Rand = n => {
  if (!(n > 0 && n <= 2 ** 32)) throw new RangeError('n');
  const lim = 2 ** 32 - (2 ** 32 % n), buf = new Uint32Array(1);
  for (;;) { crypto.getRandomValues(buf); if (buf[0] < lim) return buf[0] % n; }
};
/** перемешивание Фишера — Йетса (на месте) */
export function shuffle<T>(a: T[], rand: Rand = cryptoRand): T[] {
  for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export const total = (d: Pick<MockData, 'plan'>) => d.plan.reduce((a, [, n]) => a + n, 0);

/** новый экзамен: из каждой части плана — n разных вопросов, затем всё вперемешку; варианты тоже перемешаны */
export function newExam(d: MockData, now: number, id: string, rand: Rand = cryptoRand): MockState {
  const picked: MockItem[] = [];
  for (const [s, n] of d.plan) picked.push(...shuffle(d.pool.filter(p => p.s === s), rand).slice(0, n));
  shuffle(picked, rand);
  const N = picked.length;
  return {
    v: 1, id, key: d.key,
    ids: picked.map(p => p.id), perm: picked.map(p => shuffle(p.o.map((_, i) => i), rand)),
    ans: Array(N).fill(null), marked: Array(N).fill(false), spent: Array(N).fill(0),
    cur: 0, start: now, dur: d.durationMin * 60_000, exits: 0, warned: [],
  };
}

/** сохранённое состояние подходит к этим данным? (вопросы могли удалить или изменить число вариантов) */
export function valid(st: any, d: MockData): st is MockState {
  if (!st || st.v !== 1 || st.key !== d.key || !Array.isArray(st.ids) || !st.ids.length) return false;
  const byId = new Map(d.pool.map(p => [p.id, p]));
  const N = st.ids.length;
  if (new Set(st.ids).size !== N || ![st.perm, st.ans, st.marked, st.spent].every(a => Array.isArray(a) && a.length === N)) return false;
  return st.ids.every((id: number, i: number) => {
    const p = byId.get(id), pm = st.perm[i];
    return !!p && Array.isArray(pm) && pm.length === p.o.length && [...pm].sort((a: number, b: number) => a - b).every((x: number, k: number) => x === k) &&
      (st.ans[i] === null || (Number.isInteger(st.ans[i]) && st.ans[i] >= 0 && st.ans[i] < pm.length));
  }) && Number.isFinite(st.start) && st.dur > 0 && Number.isInteger(st.cur) && st.cur >= 0 && st.cur < N &&
    Number.isInteger(st.exits) && st.exits >= 0 && Array.isArray(st.warned);
}

/** вопрос i в порядке экзамена: текст и варианты на своих местах */
export function view(st: MockState, d: MockData, i: number) {
  const p = d.pool.find(x => x.id === st.ids[i])!;
  return { ...p, options: st.perm[i].map(k => p.o[k]), right: st.perm[i].indexOf(0) };
}

// ---------- время ----------
export const left = (st: MockState, now: number) => Math.max(0, st.start + st.dur - now);
/** 29:59 — секунды округляются вверх, чтобы 0:00 было ровно в момент сдачи */
export function clock(ms: number): string {
  const s = Math.ceil(Math.max(0, ms) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
/** предупреждения: за 5 минут и за 1 минуту. Возвращает порог (мс), о котором пора предупредить, или null. */
export const WARN_AT = [5 * 60_000, 60_000];
export function dueWarning(st: MockState, now: number): number | null {
  const l = left(st, now);
  const w = WARN_AT.filter(x => l <= x && l > 0 && !st.warned.includes(x));
  return w.length ? Math.min(...w) : null; // если пропущены оба — сразу о последнем
}

// ---------- действия (меняют состояние на месте) ----------
/** учесть время на текущем вопросе (при уходе с него) */
export function tick(st: MockState, from: number, now: number) {
  if (!st.end && now > from) st.spent[st.cur] += Math.min(now - from, st.dur);
}
export function choose(st: MockState, place: number | null) {
  if (st.end) return;
  const n = st.perm[st.cur].length;
  st.ans[st.cur] = place != null && place >= 0 && place < n ? place : null;
}
export function go(st: MockState, i: number) {
  if (!st.end && i >= 0 && i < st.ids.length) st.cur = i;
}
/** выход из окна; true — превышен предел и экзамен надо сдать */
export function addExit(st: MockState, max: number | null): boolean {
  if (st.end) return false;
  st.exits++;
  return max != null && st.exits > max;
}
export function finish(st: MockState, now: number, reason: MockState['reason'] = 'user') {
  if (st.end) return;
  st.end = Math.min(now, st.start + st.dur);
  st.reason = reason;
}
export const unanswered = (st: MockState) => st.ans.filter(a => a === null).length;

// ---------- итоги ----------
export type Row = { no: number; id: number; s: string; topic: number; q: string; options: string[]; picked: number | null; right: number; ok: boolean; sec: number };
export function results(st: MockState, d: MockData) {
  const rows: Row[] = st.ids.map((_, i) => {
    const v = view(st, d, i), picked = st.ans[i];
    return { no: i + 1, id: v.id, s: v.s, topic: v.topic, q: v.q, options: v.options, picked, right: v.right, ok: picked === v.right, sec: Math.round(st.spent[i] / 100) / 10 };
  });
  const byTopic = new Map<number, { topic: number; n: number; ok: number }>();
  for (const r of rows) { const t = byTopic.get(r.topic) ?? { topic: r.topic, n: 0, ok: 0 }; t.n++; if (r.ok) t.ok++; byTopic.set(r.topic, t); }
  const end = st.end ?? st.start + st.dur;
  return {
    rows, total: rows.length, answered: rows.filter(r => r.picked !== null).length, correct: rows.filter(r => r.ok).length,
    timeSec: Math.round((end - st.start) / 1000), exits: st.exits,
    topics: [...byTopic.values()].sort((a, b) => a.topic - b.topic),
  };
}

/** попытка для базы (quiz_submit): без очков и уровня, с выходами из окна; a — текст ответа ('' — без ответа) */
export function attempt(st: MockState, d: MockData, dev: string) {
  const r = results(st, d);
  return {
    id: st.id, quiz: st.key, points: 0, correct: r.correct, total: r.total, time: r.timeSec, level: '', start: st.start, dev, exits: r.exits,
    answers: r.rows.map(x => ({ id: x.id, s: x.s, q: x.q, a: x.picked === null ? '' : x.options[x.picked], c: x.options[x.right], ok: x.ok, sec: x.sec })),
  };
}
