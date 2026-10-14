// Индекс слов для поиска по сайту (группа «Слова»): словарь + наборы карточек + глаголы раздела «Спряжение».
// Собирается в статический файл /search/words.json; браузер грузит его только при открытии поиска.
import { getCollection } from 'astro:content';
import dictionary from '../../data/dictionary.json';
import { norm } from '../../lib/normalize';
import { getVerbs } from '../../lib/verbs';
import { t } from '../../i18n/ru';

export async function GET() {
  const seen = new Set<string>();
  const out: { a: string; r: string; t: string; h: string; n: string }[] = [];
  const add = (a: string, r: string, t: string, h: string) => {
    if (seen.has(a)) return;
    seen.add(a);
    out.push({ a, r, t, h, n: norm(`${a} ${r}`) });
  };
  for (const g of dictionary) for (const w of g.items) add(w.a, w.r, g.t, `dictionary/?q=${encodeURIComponent(w.r)}`);
  for (const d of await getCollection('decks')) for (const w of d.data.items) add(w.a, w.r, `${w.t} · ${d.data.title}`, `words/${d.data.key}/`);
  for (const v of await getVerbs()) add(`${v.verb} – ${v.present}`, v.ru, t.nav.conjugation, `conjugation/${v.key}/`);
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
