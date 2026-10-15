// Вес страниц собранного сайта: HTML, CSS, JS, шрифты — без сжатия, gzip и brotli.
// Запуск после `npm run build`: npm run weight [-- --json файл.json] [адреса страниц…]
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';
import { pageAssets, toFile } from './page-assets.mjs';

const DIST = 'dist';
const args = process.argv.slice(2);
const jsonOut = args.includes('--json') ? args.splice(args.indexOf('--json'), 2)[1] : null;
const PAGES = args.length ? args : ['/', '/words/w100/', '/dictionary/', '/conjugation/', '/conjugation/kataba/', '/quizzes/matn-10/', '/courses/tsu-2-sem1/'];

// gzip 6 — как отдают GitHub Pages и большинство CDN; brotli 11 — статическое сжатие (Cloudflare может отдавать brotli)
const size = f => {
  const b = readFileSync(f);
  return { raw: b.length, gz: gzipSync(b, { level: 6 }).length, br: brotliCompressSync(b, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length };
};
const fontSize = f => { const n = statSync(f).size; return { raw: n, gz: n, br: n }; }; // woff2 уже сжат
const sum = list => list.reduce((a, x) => ({ raw: a.raw + x.raw, gz: a.gz + x.gz, br: a.br + x.br }), { raw: 0, gz: 0, br: 0 });
const kb = n => (n / 1024).toFixed(1);

const out = {};
for (const p of PAGES) {
  const a = pageAssets(DIST, p);
  const woff2 = a.fonts.filter(f => f.endsWith('.woff2'));
  const r = {
    html: size(a.html),
    css: sum(a.css.map(f => size(toFile(DIST, f)))),
    js: sum(a.js.map(f => size(toFile(DIST, f)))),
    jsLazy: sum(a.jsLazy.map(f => size(toFile(DIST, f)))),
    fontsDeclared: sum(woff2.map(f => fontSize(toFile(DIST, f)))),
    files: { css: a.css, js: a.js, jsLazy: a.jsLazy, fonts: woff2 },
  };
  out[p] = r;
}
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(out, null, 2) + '\n');
const row = (name, s) => `${name.padEnd(13)} ${kb(s.raw).padStart(8)} ${kb(s.gz).padStart(8)} ${kb(s.br).padStart(8)}`;
for (const [p, r] of Object.entries(out)) {
  console.log(`\n${p}\n${'КБ'.padEnd(13)} ${'исходный'.padStart(8)} ${'gzip'.padStart(8)} ${'brotli'.padStart(8)}`);
  console.log(row('HTML', r.html)); console.log(row('CSS', r.css)); console.log(row('JS сразу', r.js)); console.log(row('JS по кнопке', r.jsLazy));
  console.log(row('шрифты woff2', r.fontsDeclared) + '  (все объявленные; браузер берёт только нужные)');
}
