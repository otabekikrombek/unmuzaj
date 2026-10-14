// Языки интерфейса (CLAUDE.md §15.1). Русский — по умолчанию, без префикса в адресе; узбекский — /uz/…, английский — /en/….
// Все страницы лежат в src/pages/[...locale]/ и собираются для каждого языка из одного файла.
import { ru, type Dict } from './ru';
import { uz } from './uz';
import { en } from './en';
import { hasCyr } from './format';
import { u } from '../lib/url';
export { fmt, plural, hasCyr, LANG_KEY, type Plural } from './format';

export const LOCALES = ['ru', 'uz', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ru';
/** названия языков — всегда на самом языке (так их ищут в переключателе) */
export const LANG_NAMES: Record<Locale, string> = { ru: 'Русский', uz: 'Oʻzbekcha', en: 'English' };
export const LANG_SHORT: Record<Locale, string> = { ru: 'RU', uz: 'UZ', en: 'EN' };

const DICTS: Record<Locale, Dict> = { ru, uz, en };
export const dict = (l: Locale): Dict => DICTS[l];
export type { Dict };

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/** путь внутри сайта без base и без языка: /unmuzaj/uz/words/w100/ → { locale: 'uz', rest: 'words/w100/' } */
export function splitPath(pathname: string): { locale: Locale; rest: string } {
  let p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\/+/, '');
  const seg = p.split('/')[0];
  if ((LOCALES as readonly string[]).includes(seg) && seg !== DEFAULT_LOCALE) return { locale: seg as Locale, rest: p.slice(seg.length + 1) };
  return { locale: DEFAULT_LOCALE, rest: p };
}
export const localeOf = (url: URL) => splitPath(url.pathname).locale;

/** всё, что нужно странице: язык, словарь, ссылки на этом языке */
export function useI18n(url: URL) {
  const locale = localeOf(url);
  const t = DICTS[locale];
  return { locale, t, l: (path = '') => lu(path, locale), intl: t.meta.intl };
}

/** ссылка на страницу сайта на нужном языке: lu('words/', 'uz') → /unmuzaj/uz/words/ (тот же хелпер u из lib/url) */
export const lu = (path = '', locale: Locale = DEFAULT_LOCALE) => u(path, locale);

/** getStaticPaths: каждая страница — на всех языках */
export const localeParams = () => LOCALES.map(l => ({ params: { locale: l === DEFAULT_LOCALE ? undefined : l } }));
/** getStaticPaths для страниц с параметрами: каждую комбинацию — на всех языках */
export function withLocales<P extends Record<string, string>, R>(paths: { params: P; props: R }[]) {
  return LOCALES.flatMap(l => paths.map(x => ({ params: { ...x.params, locale: l === DEFAULT_LOCALE ? undefined : l }, props: x.props })));
}

/**
 * Поле материала на языке страницы. Переводы лежат рядом: title → title_uz, title_en; r → r_uz; e → e_uz.
 * Если перевода нет — русский текст и ru: true (тогда рядом показывается пометка «(rus tilida)»).
 * Арабский текст без кириллицы пометки не получает: его не переводят.
 */
export function tf(obj: Record<string, any> | undefined | null, field: string, locale: Locale): { text: string; ru: boolean } {
  const base = String(obj?.[field] ?? '');
  if (locale === DEFAULT_LOCALE) return { text: base, ru: false };
  const v = obj?.[`${field}_${locale}`];
  if (typeof v === 'string' && v.trim()) return { text: v, ru: false };
  return { text: base, ru: hasCyr(base) };
}
/** то же для объектов вида { ru: '…', uz?: '…', en?: '…' } (названия частей викторины, инструкции) */
export function tl(obj: Record<string, any> | undefined | null, locale: Locale): { text: string; ru: boolean } {
  const base = String(obj?.ru ?? '');
  const v = obj?.[locale];
  if (locale === DEFAULT_LOCALE) return { text: base, ru: false };
  if (typeof v === 'string' && v.trim()) return { text: v, ru: false };
  return { text: base, ru: hasCyr(base) };
}
