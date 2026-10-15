// Какие файлы загружает страница собранного сайта (dist/): HTML, CSS, JS (с импортами), шрифты из CSS.
// Используется в `npm run weight` (таблица веса страниц) и в .size-limit.cjs (бюджет в CI).
import { readFileSync, existsSync } from 'node:fs';
import { join, posix } from 'node:path';

const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];

/** файл в dist по адресу на сайте */
export function distFile(dist, url) {
  const p = url.split(/[?#]/)[0];
  return join(dist, p.endsWith('/') ? p + 'index.html' : p);
}

/** статические и динамические импорты JS-модуля (минифицированный вывод Vite) */
function imports(code) {
  const st = new Set(), dyn = new Set();
  for (const m of code.matchAll(/(?:\bfrom|\bimport)\s*["'](\.{1,2}\/[^"']+\.js)["']/g)) st.add(m[1]);
  for (const m of code.matchAll(/\bimport\(\s*["'](\.{1,2}\/[^"']+\.js)["']\s*\)/g)) dyn.add(m[1]);
  for (const x of st) dyn.delete(x);
  return { st: [...st], dyn: [...dyn] };
}

/**
 * Ресурсы страницы. js — загружаются сразу (script type=module + все статические импорты),
 * jsLazy — только по действию пользователя (import()), fonts — все шрифты из @font-face подключённых CSS.
 */
export function pageAssets(dist, pageUrl) {
  const htmlPath = distFile(dist, pageUrl);
  const html = readFileSync(htmlPath, 'utf8');
  const css = new Set(), js = new Set(), lazy = new Set(), fonts = new Set();
  for (const t of html.match(/<link\b[^>]*>/g) || []) {
    const rel = attr(t, 'rel'), href = attr(t, 'href');
    if (rel === 'stylesheet' && href?.startsWith('/')) css.add(href);
    if (rel === 'modulepreload' && href?.startsWith('/')) js.add(href);
  }
  for (const t of html.match(/<script\b[^>]*>/g) || []) {
    const src = attr(t, 'src');
    if (src?.startsWith('/')) js.add(src);
  }
  // импорты по цепочке
  const queue = [...js];
  const seenLazy = [];
  while (queue.length) {
    const u = queue.shift();
    const f = join(dist, u);
    if (!existsSync(f)) continue;
    const { st, dyn } = imports(readFileSync(f, 'utf8'));
    for (const r of st) { const x = posix.join(posix.dirname(u), r); if (!js.has(x)) { js.add(x); queue.push(x); } }
    for (const r of dyn) seenLazy.push(posix.join(posix.dirname(u), r));
  }
  // ленивые модули и их импорты (то, что не грузится сразу)
  const lq = seenLazy.filter(x => !js.has(x));
  while (lq.length) {
    const u = lq.shift();
    if (lazy.has(u) || js.has(u)) continue;
    lazy.add(u);
    const f = join(dist, u);
    if (!existsSync(f)) continue;
    const { st, dyn } = imports(readFileSync(f, 'utf8'));
    for (const r of [...st, ...dyn]) lq.push(posix.join(posix.dirname(u), r));
  }
  for (const c of css) {
    const f = join(dist, c);
    if (!existsSync(f)) continue;
    for (const m of readFileSync(f, 'utf8').matchAll(/url\(\s*["']?([^"')]+\.(?:woff2|woff|ttf|otf))["']?\s*\)/g)) {
      fonts.add(m[1].startsWith('/') ? m[1] : posix.join(posix.dirname(c), m[1]));
    }
  }
  return { html: htmlPath, css: [...css], js: [...js], jsLazy: [...lazy], fonts: [...fonts] };
}

export const toFile = (dist, u) => join(dist, u);
