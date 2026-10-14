// Данные викторины на языке страницы (при сборке). Переводы — необязательные поля рядом с русскими:
// title_uz, description_uz; sections.X.uz; ins.X.uz; levels[].label_uz; pool[].q_uz, o_uz, e_uz (и _en).
// Чего нет — остаётся по-русски с отметкой (ru: true), арабское не переводится.
import { tf, tl, hasCyr, type Locale } from '../i18n';
import type { QuizData, Section } from './quiz';

type Raw = Record<string, any>;
export function localizeQuiz(q: Raw, locale: Locale) {
  const sections: Record<string, Section> = Object.fromEntries(Object.entries(q.sections as Raw).map(([k, s]) => {
    const n = tl(s, locale);
    return [k, { ar: s.ar, ru: s.ru, name: n.text, nru: n.ru, icon: s.icon, sec: s.sec }];
  }));
  const ins = q.ins ? Object.fromEntries(Object.entries(q.ins as Raw).map(([k, x]) => { const n = tl(x, locale); return [k, { ar: x.ar, text: n.text, ru: n.ru }]; })) : undefined;
  const levels = (q.levels as Raw[]).map(x => { const n = tf(x, 'label', locale); return { min: x.min, label: x.label, show: n.text, ru: n.ru }; });
  const pool = (q.pool as Raw[]).map(p => {
    const qq = tf(p, 'q', locale), e = tf(p, 'e', locale);
    const o: string[] = locale !== 'ru' && Array.isArray(p[`o_${locale}`]) ? p[`o_${locale}`] : p.o;
    return { id: p.id, s: p.s, q: qq.text, o, e: e.text, ...(qq.ru || (o === p.o && locale !== 'ru' && o.some(hasCyr)) ? { qr: true } : {}), ...(e.ru ? { er: true } : {}) };
  });
  const title = tf(q, 'title', locale), description = tf(q, 'description', locale);
  // есть ли на экранах викторины непереведённый текст (тогда на первом экране — общая пометка)
  const anyRu = pool.some(p => p.qr || p.er) || Object.values(sections).some(s => s.nru) || levels.some(x => x.ru);
  return { title, description, sections, ins, levels, pool, anyRu };
}

/** пояснения по id вопроса — для разбора ответов в «Моём прогрессе» и панели учителя */
export function explainOf(q: Raw, locale: Locale) {
  return Object.fromEntries((q.pool as Raw[]).map(p => { const e = tf(p, 'e', locale); return [p.id, e.ru ? { e: e.text, ru: true } : { e: e.text }]; }));
}
export type { QuizData };
