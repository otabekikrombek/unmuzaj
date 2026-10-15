// Бюджет веса страниц (size-limit): npm run size — после npm run build. Проверяется в CI (.github/workflows/checks.yml).
// Цели — из «Правил Allimni 2.0» (CLAUDE.md, п. 1); нулевая точка — docs/AUDIT_2026-10.md. КиБ = 1024 байта.
// Где сайт пока не укладывается в цель, предел = нулевая точка: хуже стать нельзя, а цель указана в названии.
// Файлы с хэшем в имени находятся по самой странице (scripts/audit/page-assets.mjs), поэтому список не устаревает.
import { existsSync } from 'node:fs';
import { pageAssets } from './scripts/audit/page-assets.mjs';

const DIST = 'dist';
if (!existsSync(`${DIST}/index.html`)) throw new Error('size-limit: сначала соберите сайт — npm run build');
const files = list => list.map(u => DIST + u);
const home = pageAssets(DIST, '/');
const deck = pageAssets(DIST, '/words/w100/');

// шрифты, которые главная загружает на первом экране (по замеру Lighthouse): Amiri 400 (арабский) и PT Serif 400/700
const HOME_FONTS = ['amiri-arabic-400', 'pt-serif-latin-400', 'pt-serif-latin-700', 'pt-serif-cyrillic-400', 'pt-serif-cyrillic-700']
  .map(f => `${DIST}/_astro/${f}-normal.*.woff2`);

export default [
  { name: 'Главная: JS до интерактивности (цель ≤ 50 КиБ gzip)', path: files(home.js), gzip: true, limit: '50 KiB' },
  { name: 'Главная: CSS (цель ≤ 30 КиБ gzip)', path: files(home.css), gzip: true, limit: '30 KiB' },
  { name: 'Главная: шрифты первого экрана (цель ≤ 150 КиБ — этап E2; предел = нулевая точка)', path: HOME_FONTS, brotli: false, limit: '212 KiB' },
  { name: 'Карточки слов /words/w100/: JS (предел = нулевая точка)', path: files(deck.js), gzip: true, limit: '61 KiB' },
];
