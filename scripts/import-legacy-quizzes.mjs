// Разовый перенос викторин из прототипов (data/from_pages + legacy/*.html) в src/content/quizzes/*.json.
// Вопросы, тексты и уровни переносятся без изменений. Запуск: node scripts/import-legacy-quizzes.mjs
import fs from 'node:fs';
const RU = { F: 'понимание', V: 'слова', G: 'грамматика', E: 'ошибки', L: 'аудирование', R: 'чтение', Q: 'вопросы' };
const MAP = {
  'matn-01': 'matn_01', 'matn-09': 'matn_09', 'matn-10': 'matn_10', 'mock-ekzamen': 'mock_ekzamen', izafa: 'izafa', 'gorod-derevnya': 'gorod_derevnya',
};
for (const [key, f] of Object.entries(MAP)) {
  const path = `src/content/quizzes/${key}.json`;
  const meta = JSON.parse(fs.readFileSync(path, 'utf8'));
  const src = JSON.parse(fs.readFileSync(`data/from_pages/viktorina_${f}.json`, 'utf8'));
  const html = fs.readFileSync(`legacy/viktorina_${f}.html`, 'utf8');
  const title = html.match(/const TITLE=("[^"]*"|'[^']*')/)?.[1];
  const out = { ...meta };
  delete out.legacy;
  if (src.SEC) {
    const plan = JSON.parse(html.match(/const PLAN=(\[[^;]*\]);/)[1].replace(/'/g, '"'));
    out.plan = plan;
    out.sections = Object.fromEntries(Object.entries(src.SEC).map(([k, s]) => [k, { ar: s.n, ru: RU[k], icon: s.i, sec: s.t }]));
    out.ins = Object.fromEntries(Object.entries(src.INS).map(([k, v]) => [k, { ar: v[0], ru: v[1] }]));
  } else {
    const [, n, t] = html.match(/const N=(\d+), SEC=(\d+)/);
    out.plan = [['Q', +n]];
    out.sections = { Q: { ru: RU.Q, icon: '❓', sec: +t } };
  }
  if (title) out.title_ar = Function(`return ${title}`)();
  if (src.PARA) out.para = src.PARA.map(([label, sentences]) => ({ label, sentences }));
  if (src.LIS) out.lis = src.LIS.map(([who, text]) => ({ who, text }));
  if (key === 'mock-ekzamen') out.text_in = ['R']; // в экзамене текст открывается только в части «чтение»
  out.levels = src.LEV.map(([min, label]) => ({ min, label }));
  out.pool = src.POOL.map(p => ({ id: p.id, s: p.s ?? 'Q', q: p.q, o: p.o, e: p.e }));
  fs.writeFileSync(path, JSON.stringify(out, null, 1) + '\n');
  console.log(key, out.pool.length, 'вопросов', out.plan);
}
