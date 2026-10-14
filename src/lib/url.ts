// Все внутренние ссылки строятся через u(), чтобы переход на домен не требовал правок.
// u('favicon.svg') — файл сайта; u('words/', 'uz') — страница на нужном языке: /uz/words/ (русский — без префикса).
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export function u(path = '', locale = 'ru'): string {
  return BASE + (locale === 'ru' ? '' : locale + '/') + String(path).replace(/^\//, '');
}
