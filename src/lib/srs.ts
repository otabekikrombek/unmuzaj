// Алгоритм интервального повторения (как в прототипе, CLAUDE.md 6.3).
// box: 0 — новое; 1 — не знает/ошибся; 2 — вспоминает; 3–4 — знает; 5 — выучено.
export type Rec = { n: number; ok: number; bad: number; box: number; last: number };
export type DeckState = { step: number; words: Record<string, Rec> };
export type Word = { a: string; r: string; t: string };

export const empty = (): Rec => ({ n: 0, ok: 0, bad: 0, box: 0, last: -99 });
export const rec = (S: DeckState, w: Word) => S.words[w.a] ?? empty();
export type Level = 'new' | 'learn' | 'good' | 'done';
export function level(S: DeckState, w: Word): Level {
  const r = S.words[w.a];
  if (!r || !r.n) return 'new';
  return r.box <= 2 ? 'learn' : r.box <= 4 ? 'good' : 'done';
}

export function weight(S: DeckState, w: Word): number {
  const r = rec(S, w);
  if (!r.n) return 0;
  let x = (6 - r.box) ** 2 * (1 + 0.5 * Math.min(r.bad, 6));
  const ago = S.step - r.last;
  if (ago < 2) x *= 0.02; else if (ago < 4) x *= 0.3;
  return x;
}

export function pickWeighted<T>(arr: T[], f: (x: T) => number, rnd = Math.random): T {
  let s = 0;
  const ws = arr.map(a => { const v = f(a); s += v; return v; });
  if (s <= 0) return arr[Math.floor(rnd() * arr.length)];
  let r = rnd() * s;
  for (let k = 0; k < arr.length; k++) { r -= ws[k]; if (r <= 0) return arr[k]; }
  return arr[arr.length - 1];
}

/** следующая карточка: сначала новые, но ~каждое 3-е место — «созревшим» словам с ошибками */
export function nextWord(S: DeckState, pool: Word[], prevA: string | null, rnd = Math.random): Word | null {
  const A = pool.filter(w => w.a !== prevA || pool.length === 1);
  if (!A.length) return null;
  const fresh = A.filter(w => !rec(S, w).n);
  const weak = A.filter(w => { const r = rec(S, w); return r.n && r.box <= 1 && S.step - r.last >= 3; });
  if (fresh.length && !(weak.length && rnd() < 0.34)) return fresh[Math.floor(rnd() * fresh.length)];
  return pickWeighted(A, w => weight(S, w), rnd);
}

/** записать ответ; возвращает новое состояние слова */
export function answer(S: DeckState, w: Word, good: boolean): Rec {
  const r = { ...rec(S, w) };
  S.step++;
  if (good) { r.ok++; r.box = r.n === 0 ? 3 : Math.min(5, r.box + 1); }
  else { r.bad++; r.box = 1; }
  r.n++; r.last = S.step;
  S.words[w.a] = r;
  return r;
}

/** 20 вопросов теста: по весам, новые слова получают вес 12 */
export function testWords(S: DeckState, all: Word[], n = 20, rnd = Math.random): Word[] {
  const left = all.slice(), out: Word[] = [];
  const tw = (w: Word) => { const r = rec(S, w); return r.n ? (6 - r.box) ** 2 * (1 + 0.5 * Math.min(r.bad, 6)) : 12; };
  while (out.length < Math.min(n, all.length)) { const w = pickWeighted(left, tw, rnd); out.push(w); left.splice(left.indexOf(w), 1); }
  return out;
}

/** слияние двух состояний (гость + облако, два устройства): по слову берём запись с большим n */
export function merge(a: DeckState, b: DeckState): DeckState {
  const words: Record<string, Rec> = { ...a.words };
  for (const [k, r] of Object.entries(b.words)) if (!words[k] || r.n > words[k].n) words[k] = r;
  return { step: Math.max(a.step, b.step), words };
}

export function shuffle<T>(a: T[], rnd = Math.random): T[] {
  for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; }
  return a;
}
