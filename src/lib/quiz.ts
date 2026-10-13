// Викторина: подбор вопросов, очки, уровни, сводка по частям. Только чистые функции.
export type Section = { ar?: string; ru: string; icon: string; sec: number };
export type PoolItem = { id: number; s: string; q: string; o: string[]; e: string };
export type QuizData = {
  key: string; title: string; title_ar?: string; kind: 'quiz' | 'test';
  plan: [string, number][]; sections: Record<string, Section>;
  ins?: Record<string, { ar: string; ru: string }>; text_in?: string[];
  para?: { label: string; sentences: string[] }[]; lis?: { who: string; text: string }[]; audio?: string;
  levels: { min: number; label: string }[]; pool: PoolItem[];
};
/** вопрос в игре: c — правильный ответ, o — варианты в случайном порядке */
export type Question = { id: number; s: string; q: string; c: string; o: string[]; e: string };
/** ответ ученика: a — выбранный вариант ('' — время вышло), sec — секунды на ответ */
export type Answer = { id: number; s: string; q: string; a: string; c: string; ok: boolean; sec: number };

export function shuffle<T>(a: T[], rnd = Math.random): T[] {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** свой случайный набор у каждого: из каждой части плана — нужное число вопросов, части по порядку */
export function buildQuestions(d: QuizData, rnd = Math.random): Question[] {
  const out: Question[] = [];
  for (const [s, n] of d.plan) {
    shuffle(d.pool.filter(p => p.s === s), rnd).slice(0, n)
      .forEach(p => out.push({ id: p.id, s: p.s, q: p.q, c: p.o[0], o: shuffle(p.o.slice(), rnd), e: p.e }));
  }
  return out;
}

export const total = (d: QuizData) => d.plan.reduce((a, [, n]) => a + n, 0);

/** очки за верный ответ: 500 + 500 × остаток времени / лимит */
export function gain(limitSec: number, ms: number): number {
  const T = limitSec * 1000;
  return Math.round(500 + 500 * Math.max(0, T - ms) / T);
}

export function levelOf(d: QuizData, correct: number): string {
  const L = d.levels.slice().sort((a, b) => b.min - a.min);
  return (L.find(l => correct >= l.min) ?? L[L.length - 1]).label;
}
/** уровень без смайлика — для базы и таблиц */
export const levelPlain = (label: string) => label.replace(/\s*[^\p{L}\p{N}\s].*$/u, '').trim();

/** верно/всего по каждой части (в порядке плана) */
export function bySection(d: QuizData, rows: { s: string; ok: boolean }[]) {
  return d.plan.map(([s]) => {
    const r = rows.filter(x => x.s === s);
    return { s, ok: r.filter(x => x.ok).length, n: r.length };
  }).filter(x => x.n > 0);
}
