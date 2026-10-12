// Все внутренние ссылки строятся через u(), чтобы переход на домен не требовал правок.
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export function u(path = ''): string {
  return BASE + String(path).replace(/^\//, '');
}
