// Проверка словарей интерфейса (src/i18n/ru.ts, uz.ts, en.ts) — без сборки и браузера: node tests/i18n.mjs
//  - у uz и en те же ключи, что у ru (массивы — той же длины, формы числа — есть «other»);
//  - в каждой строке те же подстановки {x} и те же HTML-теги, что в русской;
//  - узбекская латиница: oʻ, gʻ — знак ʻ (U+02BB), тутуқ белгиси — ʼ (U+02BC); нет ' ‘ ’ ` и кириллицы;
//  - в английском нет кириллицы;
//  - docs/uz_tekshirish.md совпадает со словарём (иначе: npm run uz-review).
import { readFileSync } from 'node:fs';
import { ru } from '../src/i18n/ru.ts';
import { uz } from '../src/i18n/uz.ts';
import { en } from '../src/i18n/en.ts';
import { reviewDoc, DOC } from '../scripts/uz-review.mjs';

const fails = [];
const fail = (m) => fails.push(m);
const isPlural = (v) => v && typeof v === 'object' && !Array.isArray(v) && typeof v.other === 'string';
const holes = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
const tags = (s) => [...s.matchAll(/<\/?([a-z]+)/g)].map((m) => m[0]).sort().join(',');
const CYR = /[Ѐ-ӿ]/;

function sameText(path, a, b, name) {
  if (holes(a) !== holes(b)) fail(`${name}: ${path} — подстановки {${holes(b)}} ≠ ru {${holes(a)}}`);
  if (tags(a) !== tags(b)) fail(`${name}: ${path} — HTML-теги «${tags(b)}» ≠ ru «${tags(a)}»`);
}
function walk(path, a, b, name, visit) {
  if (isPlural(a)) {
    if (!isPlural(b)) return fail(`${name}: ${path} — нужны формы числа {…, other}`);
    for (const k of Object.keys(b)) sameText(`${path}.${k}`, a.other, b[k], name), visit(`${path}.${k}`, b[k]);
    return;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return fail(`${name}: ${path} — нужен массив из ${a.length} строк`);
    a.forEach((x, i) => walk(`${path}[${i}]`, x, b[i], name, visit));
    return;
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') return fail(`${name}: ${path} — нет раздела`);
    for (const k of Object.keys(a)) walk(path ? `${path}.${k}` : k, a[k], b[k], name, visit);
    for (const k of Object.keys(b)) if (!(k in a)) fail(`${name}: ${path ? path + '.' : ''}${k} — лишний ключ (нет в ru)`);
    return;
  }
  if (typeof a !== typeof b) return fail(`${name}: ${path} — нет строки`);
  if (typeof a === 'string') { sameText(path, a, b, name); visit(path, b); }
}

let nUz = 0, nEn = 0;
walk('', ru, uz, 'uz', (path, s) => {
  nUz++;
  if (CYR.test(s)) fail(`uz: ${path} — кириллица: «${s}»`);
  const bad = s.match(/[a-zA-Z]['‘’`][a-zA-Z]|['‘’`](?=[a-z])/);
  if (bad) fail(`uz: ${path} — апостроф «${bad[0]}»: нужен ʻ (U+02BB) после o/g или ʼ (U+02BC) — «${s}»`);
  const okina = s.match(/(^|[^oOgG])ʻ/);
  if (okina) fail(`uz: ${path} — ʻ не после o/g: «${s}»`);
  const tutuq = s.match(/[oOgG]ʼ/);
  if (tutuq) fail(`uz: ${path} — «${tutuq[0]}»: в oʻ/gʻ нужен знак ʻ (U+02BB), а не ʼ`);
});
walk('', ru, en, 'en', (path, s) => {
  nEn++;
  if (CYR.test(s)) fail(`en: ${path} — кириллица: «${s}»`);
});
if (uz.meta.lang !== 'uz' || en.meta.lang !== 'en' || ru.meta.lang !== 'ru') fail('meta.lang должен быть ru / uz / en');

// список для проверки узбекских строк должен совпадать со словарём
let doc = '';
try { doc = readFileSync(new URL('../' + DOC, import.meta.url), 'utf8'); } catch {}
if (doc !== reviewDoc()) fail(`${DOC} устарел — выполните: npm run uz-review`);

if (fails.length) {
  console.log(fails.map((f) => 'FAIL ' + f).join('\n'));
  console.log(`\n${fails.length} ошибок`);
  process.exit(1);
}
console.log(`i18n ok: uz — ${nUz} строк, en — ${nEn} строк; ключи, подстановки, теги и орфография в порядке.`);
