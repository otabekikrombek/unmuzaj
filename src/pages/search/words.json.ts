// Индекс слов для поиска по сайту (группа «Слова»): словарь + наборы карточек.
// Собирается в статический файл /search/words.json; браузер грузит его только при открытии поиска.
import { getCollection } from 'astro:content';
import dictionary from '../../data/dictionary.json';
import { norm } from '../../lib/normalize';

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
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
