// Глаголы раздела «Спряжение» для страниц сайта (только при сборке): src/data/verbs.json + таблицы src/content/conjugations/.
import { getCollection } from 'astro:content';
import verbsJson from '../data/verbs.json';
import { verbTypes, type Forms, type VerbType } from './conjugation';
import { normAr } from './normalize';

export type VerbEntry = {
  key: string; verb: string; root: string; future_type: string; transitive: boolean; ru: string;
  source: Record<string, string | number | null>; doubt: boolean; doubt_note?: string; checked: boolean;
};
export type Verb = VerbEntry & { types: VerbType[]; present: string; imperative: string; forms: Forms; engine: string };

let cache: Verb[] | null = null;

/** все глаголы по алфавиту; если таблица устарела (verbs.json изменён, а npm run conjugate не запускали) — сборка останавливается */
export async function getVerbs(): Promise<Verb[]> {
  if (cache) return cache;
  const tables = new Map((await getCollection('conjugations')).map(c => [c.data.key, c.data]));
  const out: Verb[] = [];
  for (const v of verbsJson as unknown as VerbEntry[]) {
    const c = tables.get(v.key);
    if (!c || c.verb !== v.verb || c.future_type !== v.future_type || c.transitive !== v.transitive) {
      throw new Error(`Спряжение: таблица для «${v.key}» (${v.verb}) отсутствует или устарела. Запустите: npm run conjugate`);
    }
    out.push({ ...v, types: verbTypes(v.root), present: c.forms.present[3], imperative: c.forms.imperative[1], forms: c.forms, engine: c.engine });
  }
  cache = out.sort((a, b) => normAr(a.verb).localeCompare(normAr(b.verb), 'ar') || a.key.localeCompare(b.key));
  return cache;
}

/** форма без последней огласовки — чтобы «اِمْلَأِ» (перед следующим словом) совпало с «اِمْلَأْ» */
const tail = (s: string) => s.normalize('NFC').trim().replace(/[ً-ْ]+$/, '');

/** словарные формы глаголов (прошедшее и настоящее-будущее он, повелительное ты м.) → ключ глагола: для ссылок из словаря */
export async function verbFormIndex(): Promise<Map<string, Verb>> {
  const m = new Map<string, Verb>();
  for (const v of await getVerbs()) for (const f of [v.forms.past[3], v.forms.present[3], v.forms.imperative[1]]) if (f) m.set(tail(f), v);
  return m;
}
/** глагол для словарной статьи: по первому слову (например, «اُكْتُبْ» → كَتَبَ). Слово с танвином — имя (ذَهَبٌ «золото»), не глагол. */
export function verbFor(index: Map<string, Verb>, a: string): Verb | undefined {
  const w = a.split(/\s+/)[0] || '';
  return /[\u064b-\u064d]/.test(w) ? undefined : index.get(tail(w));
}
