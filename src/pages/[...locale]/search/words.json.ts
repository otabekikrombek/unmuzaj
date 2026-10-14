// Индекс слов для поиска по сайту (группа «Слова»): словарь + наборы карточек + глаголы раздела «Спряжение». Свой файл на каждом языке:
// /search/words.json, /uz/search/words.json… Перевод слова — на языке страницы, если он есть (r_uz), иначе русский (f: 1).
// Браузер грузит файл только при открытии поиска.
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import dictionary from '../../../data/dictionary.json';
import { norm } from '../../../lib/normalize';
import { getVerbs } from '../../../lib/verbs';
import { localeParams, tf, tl, dict, DEFAULT_LOCALE, type Locale } from '../../../i18n';

export const getStaticPaths = localeParams;

export async function GET({ params }: APIContext) {
  const locale = (params.locale ?? DEFAULT_LOCALE) as Locale;
  const seen = new Set<string>();
  const out: { a: string; r: string; t: string; h: string; n: string; f?: 1 }[] = [];
  const add = (a: string, w: Record<string, any>, t: string, h: string, r = tf(w, 'r', locale)) => {
    if (seen.has(a)) return;
    seen.add(a);
    // ищется и по переводу на языке страницы, и по русскому
    const ru = w.r ?? w.ru;
    out.push({ a, r: r.text, t, h, n: norm(`${a} ${r.text} ${r.text === ru ? '' : ru}`), ...(r.ru ? { f: 1 as const } : {}) });
  };
  for (const g of dictionary) for (const w of g.items) add(w.a, w, g.t, `dictionary/?q=${encodeURIComponent(w.r)}`);
  for (const d of await getCollection('decks')) for (const w of d.data.items) add(w.a, w, `${w.t} · ${tf(d.data, 'title', locale).text}`, `words/${d.data.key}/`);
  for (const v of await getVerbs()) add(`${v.verb} – ${v.present}`, v, dict(locale).nav.conjugation, `conjugation/${v.key}/`, tl(v, locale));
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
