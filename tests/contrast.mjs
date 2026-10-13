// Контраст AA для пар токенов во всех палитрах × режимах: node tests/contrast.mjs src/styles/tokens.css
import fs from 'node:fs';
const css = fs.readFileSync(process.argv[2], 'utf8');
const blocks = {};
// блоки вида :root[data-palette='x'][data-theme='y'] { --a: #fff; ... }  (также базовый :root)
for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  const sel = m[1].trim();
  const pm = sel.match(/data-palette='(\w+)'\]\[data-theme='(\w+)'/);
  if (!pm) continue;
  const key = `${pm[1]}/${pm[2]}`;
  blocks[key] ??= {};
  for (const d of m[2].matchAll(/--([\w-]+):\s*([^;]+);/g)) blocks[key][d[1]] = d[2].trim();
}
const hex = s => { s = s.replace('#', ''); if (s.length === 3) s = [...s].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16) / 255); };
const lum = c => { const [r, g, b] = hex(c).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
// [текст, фон, минимум]
const PAIRS = [
  ['ink', 'paper', 4.5], ['ink-soft', 'paper', 4.5], ['ink-soft', 'sheet', 4.5], ['ink', 'surface-2', 4.5], ['ink-soft', 'surface-2', 4.5],
  ['accent', 'paper', 4.5], ['accent', 'sheet', 4.5], ['on-accent', 'accent', 4.5], ['on-accent', 'accent-hover', 4.5],
  ['accent-2', 'paper', 4.5], ['accent-2', 'sheet', 4.5], ['link', 'paper', 4.5], ['link', 'sheet', 4.5], ['link', 'surface-2', 4.5],
  ['bad-ink', 'paper', 4.5], ['bad-ink', 'sheet', 4.5], ['ink', 'ok-bg', 4.5], ['ink', 'bad-bg', 4.5], ['ink-soft', 'ok-bg', 4.5], ['ink-soft', 'bad-bg', 4.5],
  ['tag-ink', 'tag-bg', 4.5], ['ink', 'notice-bg', 4.5], ['ink', 'input-bg', 4.5], ['input-border', 'input-bg', 3], ['focus', 'paper', 3],
  ['head-ink', 'head-bg', 4.5], ['head-ink-soft', 'head-bg', 4.5], ['foot-ink', 'foot-bg', 4.5], ['foot-muted', 'foot-bg', 4.5], ['foot-link', 'foot-bg', 4.5],
  ['on-sun', 'sun', 4.5], ['card-ink', 'card-bg', 4.5], ['card-accent', 'card-bg', 4.5],
  ['study-ink', 'study-from', 4.5], ['study-ink', 'study-to', 4.5], ['study-muted', 'study-from', 4.5], ['study-muted', 'study-to', 4.5], ['study-link', 'study-from', 4.5],
  ['on-tile', 'tile-0', 4.5], ['on-tile', 'tile-1', 4.5], ['on-tile', 'tile-2', 4.5], ['on-tile', 'tile-3', 4.5],
  ['ink', 'hover', 4.5], ['ink', 'stripe', 4.5], ['ok', 'sheet', 3], ['bad', 'sheet', 3], ['chart', 'sheet', 3],
];
let bad = 0;
for (const [k, v] of Object.entries(blocks)) {
  const out = [];
  for (const [a, b, min] of PAIRS) {
    if (!v[a] || !v[b]) { out.push(`  ? нет ${!v[a] ? a : b}`); bad++; continue; }
    if (!v[a].startsWith('#') || !v[b].startsWith('#')) continue;
    const r = ratio(v[a], v[b]);
    if (r < min) { out.push(`  ✗ ${a} на ${b}: ${r.toFixed(2)} < ${min}`); bad++; }
  }
  console.log(k, out.length ? '\n' + out.join('\n') : '✓');
}
console.log(bad ? `проблем: ${bad}` : 'все пары проходят AA');
process.exit(bad ? 1 : 0);
