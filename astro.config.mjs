// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Адрес сайта. При переходе на собственный домен:
//   SITE = 'https://unmuzaj.uz', BASE = '/'  и файл public/CNAME с доменом.
const SITE = 'https://otabekikrombek.github.io';
const BASE = '/unmuzaj';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  output: 'static',
  // В sitemap — у каждой страницы ссылки на её версии на других языках (xhtml:link hreflang).
  integrations: [sitemap({
    filter: (p) => !/\/(teacher|me|login|board)\//.test(p),
    i18n: { defaultLocale: 'ru', locales: { ru: 'ru', uz: 'uz', en: 'en' } },
  })],
  // Языки интерфейса (src/i18n): русский без префикса, /uz/…, /en/…. Страницы — src/pages/[...locale]/.
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
