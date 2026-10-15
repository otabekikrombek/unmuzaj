// Заголовки безопасности для Cloudflare Pages: создаёт dist/_headers после сборки (npm run build).
// GitHub Pages этот файл не читает (там заголовки задать нельзя) — он заработает после переезда на Cloudflare Pages.
// План переезда и пояснения — docs/HOSTING_CLOUDFLARE.md; находки — docs/AUDIT_2026-10.md.
//
// Почему файл создаётся скриптом, а не лежит в public/: в CSP перечислены хэши встроенных скриптов
// (тема до отрисовки, выбор языка и т. п.). Хэш меняется при любой правке такого скрипта — скрипт пересчитывает их сам.
//
// CSP пока только «Report-Only»: браузер ничего не блокирует, а нарушения пишет в консоль (F12).
// Когда нарушений нет — переименовать заголовок в Content-Security-Policy (одна строка ниже: ENFORCE = true).
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';

const DIST = process.argv[2] || 'dist';
const ENFORCE = false;
const CSP_HEADER = ENFORCE ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';

const SUPABASE = 'https://orclqaqvxzczhxfzflau.supabase.co';
// «Любой глагол» (только страница /conjugation/): Pyodide с cdn.jsdelivr.net и пакеты Qutrub с PyPI — src/lib/qutrubWeb.ts
const PYODIDE = readFileSync('src/lib/qutrubWeb.ts', 'utf8').match(/PYODIDE_URL\s*=\s*'([^']+)'/)?.[1];
if (!PYODIDE) throw new Error('headers.mjs: не найден PYODIDE_URL в src/lib/qutrubWeb.ts');

// ---------- встроенные скрипты: sha256 каждого ----------
function htmlFiles(dir) {
  const out = [];
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}
const hashes = new Set();
const inlineHandlers = [];
for (const f of htmlFiles(DIST)) {
  const rel = '/' + relative(DIST, f).split(sep).join('/');
  if (rel.startsWith('/v1/')) continue; // старые страницы — своя политика ниже
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attrs, body] = m;
    if (/\ssrc=/.test(attrs)) continue;
    const type = attrs.match(/\stype="([^"]+)"/)?.[1];
    if (type && type !== 'module' && type !== 'text/javascript') continue; // JSON и ld+json не исполняются
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
  if (/\son[a-z]+="/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) inlineHandlers.push(rel);
}
if (inlineHandlers.length) {
  // onclick="…" в разметке CSP запретит: обработчики — только через addEventListener
  console.warn(`headers.mjs: встроенные обработчики событий (on…="…") на ${inlineHandlers.length} стр., например ${inlineHandlers[0]}`);
}

// ---------- политики ----------
const csp = (extra = {}) => {
  const d = {
    'default-src': ["'self'"],
    'script-src': ["'self'", ...[...hashes].sort(), "'wasm-unsafe-eval'"], // wasm — поиск Pagefind
    'style-src': ["'self'", "'unsafe-inline'"], // style="…" в разметке и в окне печати ПИН
    'img-src': ["'self'", 'data:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", SUPABASE],
    'worker-src': ["'self'"],
    'manifest-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  };
  for (const [k, v] of Object.entries(extra)) d[k] = [...(d[k] || []), ...v];
  return Object.entries(d).map(([k, v]) => `${k} ${v.join(' ')}`).join('; ');
};
const MAIN = csp();
// страница «Спряжение» (список): Pyodide + PyPI по кнопке «Любой глагол»
const CONJ = csp({
  'script-src': [PYODIDE],
  'connect-src': [PYODIDE, 'https://pypi.org', 'https://files.pythonhosted.org'],
});
// старые страницы /v1/ (временно, до удаления): встроенные скрипты и onclick, Google Fonts, Google Apps Script
const LEGACY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://script.google.com https://script.googleusercontent.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join('; ');

const COMMON = [
  'Strict-Transport-Security: max-age=31536000; includeSubDomains',
  'X-Content-Type-Options: nosniff',
  'X-Frame-Options: DENY',
  'Referrer-Policy: strict-origin-when-cross-origin',
  'Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), browsing-topics=()',
];

const rules = [
  ['/*', [...COMMON, `${CSP_HEADER}: ${MAIN}`]],
  // своя политика: сначала убрать общую («! заголовок»), затем задать новую
  ...['/conjugation/', '/uz/conjugation/', '/en/conjugation/'].map(p => [p, [`! ${CSP_HEADER}`, `${CSP_HEADER}: ${CONJ}`]]),
  ['/v1/*', [`! ${CSP_HEADER}`, `${CSP_HEADER}: ${LEGACY}`]],
  // файлы сборки с хэшем в имени не меняются: кэш на год
  ['/_astro/*', ['Cache-Control: public, max-age=31536000, immutable']],
  // служебные страницы — не в поиск Google (robots.txt их не открывает, заголовок — на всякий случай)
  ...['teacher', 'me', 'login', 'board'].flatMap(s => [`/${s}/*`, `/uz/${s}/*`, `/en/${s}/*`]).map(p => [p, ['X-Robots-Tag: noindex']]),
  // технические адреса Cloudflare (*.pages.dev) — не в поиск: основной адрес — allimni.net
  ['https://:project.pages.dev/*', ['X-Robots-Tag: noindex']],
  ['https://:version.:project.pages.dev/*', ['X-Robots-Tag: noindex']],
];

let text = '# Создан scripts/security/headers.mjs при сборке. Не править вручную: изменения — в скрипте.\n';
for (const [path, hs] of rules) text += `\n${path}\n${hs.map(h => `  ${h}`).join('\n')}\n`;

// лимиты Cloudflare Pages: 100 правил, строка до 2000 символов
const long = text.split('\n').filter(l => l.length > 2000);
if (rules.length > 100 || long.length) {
  console.error(`headers.mjs: превышены лимиты _headers (правил: ${rules.length}, длинных строк: ${long.length})`);
  process.exit(1);
}
if (!existsSync(DIST)) throw new Error(`headers.mjs: нет папки ${DIST}`);
writeFileSync(join(DIST, '_headers'), text);
console.log(`headers.mjs: ${DIST}/_headers — правил ${rules.length}, хэшей встроенных скриптов ${hashes.size}, ${ENFORCE ? 'CSP включена' : 'CSP в режиме Report-Only'}`);
