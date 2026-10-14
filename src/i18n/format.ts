// Подстановки и множественное число. Без зависимостей: работает и при сборке, и в браузере, и в Node (скрипты проверки).

/** ключ в localStorage: язык, выбранный в переключателе (читает скрипт в <head> Base.astro) */
export const LANG_KEY = 'unmuzaj:lang';

/** формы слова после числа: ru — one/few/many, uz — одна форма other, en — one/other ({n} — само число) */
export type Plural = { one?: string; few?: string; many?: string; other: string };

/** «{n} из {t}» → подставить значения */
export const fmt = (s: string, v: Record<string, unknown> = {}) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));

const rules: Record<string, Intl.PluralRules> = {};
/** число с правильной формой слова: plural('ru', {one:'{n} слово', few:'{n} слова', many:'{n} слов', other:'{n} слова'}, 5) → «5 слов» */
export function plural(lang: string, forms: Plural | string, n: number): string {
  if (typeof forms === 'string') return fmt(forms, { n });
  let k: string = 'other';
  try { k = (rules[lang] ||= new Intl.PluralRules(lang)).select(n); } catch {}
  return fmt((forms as Record<string, string | undefined>)[k] ?? forms.other, { n });
}

/** есть ли в тексте кириллица (значит, материал ещё не переведён и показывается по-русски) */
export const hasCyr = (s: unknown) => /[А-Яа-яЁё]/.test(String(s ?? ''));
