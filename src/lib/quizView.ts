// Общий вид разбора викторины: страница викторины, «Мой прогресс», панель учителя.
import type { Section } from './quiz';

export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const AR = /[؀-ۿ]/;
const isAllAr = (t: string) => AR.test(t) && !/[A-Za-zА-Яа-яЁё]/.test(t);
/** арабские фрагменты внутри текста получают lang="ar" dir="rtl" */
export function wrapAr(t: unknown): string {
  const s = String(t ?? '').replace(/ ≠ /g, '\u00a0≠\u00a0'); // «≠» не отрывается от слов
  if (isAllAr(s)) return `<span class="ar" lang="ar" dir="rtl">${esc(s)}</span>`;
  return esc(s).replace(/([«(]?[؀-ۿ][؀-ۿً-ْٰ\s،؟:«»()….!]*)/g, m => `<span class="ar" lang="ar" dir="rtl">${m.trim()}</span> `);
}

/** цвет части викторины — токен --sec-X из tokens.css */
export const secColor = (s: string) => (/^[A-Z]$/.test(s) ? `var(--sec-${s}, var(--sun))` : 'var(--sun)');
export const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, '0')}`;

export const secName = (sec: Section | undefined) =>
  sec ? `${sec.icon} ${sec.ar ? `<span class="qar"><span lang="ar" dir="rtl">${esc(sec.ar)}</span> · </span>` : ''}${sec.nru ? `<span lang="ru">${esc(sec.name)}</span>` : esc(sec.name ?? sec.ru)}` : '';

/** текст материала, который ещё не переведён на язык страницы: lang="ru" и пометка «(rus tilida)» */
export const ruText = (html: string, ru: unknown, mark = '') =>
  ru ? `<span lang="ru">${html}</span>${mark ? `<small class="ru-mark">${esc(mark)}</small>` : ''}` : html;

/** полосы «верно/всего» по частям */
export function secBars(sections: Record<string, Section>, rows: { s: string; ok: number; n: number }[]): string {
  return `<div class="qsecs">${rows.map(r => {
    const pc = r.n ? Math.round(100 * r.ok / r.n) : 0;
    return `<span class="qsn">${secName(sections[r.s])}</span><span class="qsb"><i style="width:${pc}%;background:${secColor(r.s)}"></i></span><b>${r.ok}/${r.n}</b>`;
  }).join('')}</div>`;
}

type Row = { id?: number; s: string; q: string; a: string; c: string; ok: boolean; sec?: number | null };
type L = { question: string; ok: string; bad: string; yourAnswer: string; rightAnswer: string; why: string; noAnswer: string; sec: string; mark?: string };
/** пояснение к вопросу: текст (на языке страницы или русский) и ru — нет перевода */
export type Explain = Record<number, { e: string; ru?: boolean }>;
/** разбор ответов; explain — пояснения по id вопроса (из данных викторины) */
export function reviewHTML(rows: Row[], sections: Record<string, Section>, l: L, explain: Explain = {}): string {
  return rows.map((x, i) => {
    const ex = x.id != null ? explain[x.id] : undefined, e = ex?.e;
    return `<div class="rv ${x.ok ? 'ok' : 'bad'}"><div class="rvh"><span>${secName(sections[x.s])} · ${l.question.replace('{n}', String(i + 1))}</span>` +
      `<span>${x.ok ? l.ok : l.bad}${x.sec != null ? ` · ${Math.round(x.sec * 10) / 10} ${l.sec}` : ''}</span></div>` +
      `<div class="rvq">${wrapAr(x.q)}</div><div>${l.yourAnswer} <b>${x.a ? wrapAr(x.a) : esc(l.noAnswer)}</b></div>` +
      (x.ok ? '' : `<div>${l.rightAnswer} <b>${wrapAr(x.c)}</b></div>`) +
      (e ? `<div class="rve">${l.why} ${ruText(wrapAr(e), ex?.ru, l.mark)}</div>` : '') + '</div>';
  }).join('');
}
