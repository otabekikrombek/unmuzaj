// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { MOVED } from './src/config/moved.mjs';

// Адрес сайта: собственный домен (Cloudflare DNS → GitHub Pages), с 2026-10-14.
// Домен задаётся в настройках репозитория (Settings → Pages → Custom domain);
// public/CNAME — для справки, при публикации через Actions GitHub его не читает.
const SITE = 'https://allimni.net';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  output: 'static',
  // В sitemap — у каждой страницы ссылки на её версии на других языках (xhtml:link hreflang).
  // Старые адреса переехавших страниц (src/config/moved.mjs) в sitemap не попадают.
  integrations: [sitemap({
    filter: (p) => !/\/(teacher|me|login|board)\//.test(p) && !MOVED.some(m => p.endsWith('/' + m.from)),
    i18n: { defaultLocale: 'ru', locales: { ru: 'ru', uz: 'uz', en: 'en' } },
  })],
  // Языки интерфейса (src/i18n): русский без префикса, /uz/…, /en/…. Страницы — src/pages/[...locale]/.
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
