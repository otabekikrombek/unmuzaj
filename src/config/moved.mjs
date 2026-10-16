// Переехавшие адреса (CLAUDE.md, «Правила Allimni 2.0», п. 3). Путь — без языка: то же правило действует для /uz/… и /en/….
// GitHub Pages не умеет отвечать 301, поэтому на старом адресе собирается страница-переадресация
// (src/pages/[...locale]/quizzes/[moved].astro): meta refresh + location.replace, canonical на новый адрес, noindex,
// и её нет в sitemap (astro.config.mjs). Для Cloudflare Pages те же правила записаны в public/_redirects —
// tests/e2e/mock.py проверяет, что они совпадают.
/** @type {{ from: string, to: string }[]} */
export const MOVED = [
  { from: 'quizzes/tanal-nahw/', to: 'mock/tanal-nahw/' }, // 2026-10-16: пробный экзамен — в разделе «Пробные экзамены»
];
