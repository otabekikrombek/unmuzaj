// Викторина из файла урока: npm run make-quiz -- unit10   (или путь к файлу)
// Читает data/units/unitNN.js и пишет src/content/quizzes/<code>.json (формат — src/content/SCHEMA.md).
// Перенос legacy/templates/make_quiz.py: тот же набор вопросов и план 8/4/5/3.
// Уже существующий файл не перезаписывается (вопросы, которые видели ученики, не меняются): для перезаписи добавьте --force.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const args = process.argv.slice(2);
const force = args.includes('--force');
const name = args.find(a => !a.startsWith('--'));
if (!name) { console.error('Укажите урок: npm run make-quiz -- unit10'); process.exit(1); }
const file = fs.existsSync(name) ? name : path.join('data/units', name.endsWith('.js') ? name : `${name}.js`);
const U = vm.runInNewContext(fs.readFileSync(file, 'utf8') + ';U');

// повторяемый «случайный» порядок неверных вариантов (зависит от номера урока)
let seed = U.num * 101;
const rnd = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const ALL = U.paras.flatMap(p => p[1]);
const dig = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const ref = n => (n === 0 ? 'Заголовок текста.' : `Предложение (${dig(n)}): ${ALL[n - 1]}`);
const distract = (correct, pool, k = 3) => [correct, ...shuffle([...new Set(pool)].filter(x => x !== correct)).slice(0, k)];
const P = [];
const add = (s, q, o, e) => P.push({ id: P.length + 1, s, q, o, e });

(U.mc || []).forEach(([q, o], i) => add('F', q, o, U.mcRef ? ref(U.mcRef[i]) : 'См. текст.'));
(U.tf || []).forEach(([t, v, e], i) => add('F', 'صَحِيحٌ أَمْ خَطَأٌ؟ ' + t, v ? ['صَحِيحٌ', 'خَطَأٌ'] : ['خَطَأٌ', 'صَحِيحٌ'],
  ((!v && e) ? `Неверно: ${e}. ` : '') + (U.tfRef ? ref(U.tfRef[i]) : '')));
const pls = (U.plural || []).map(x => x[1]);
(U.plural || []).forEach(([a, b]) => add('V', `مَا جَمْعُ «${a}»؟`, distract(b, pls), `${a} – ${b}`));
const ants = (U.antonyms || []).map(x => x[1]);
(U.antonyms || []).forEach(([a, b]) => add('V', `مَا ضِدُّ «${a}» فِي النَّصِّ؟`, distract(b, ants), `${a} ≠ ${b}`));
const gw = (U.gaps || []).map(x => x[1]);
(U.gaps || []).forEach(([a, b]) => add('V', a, distract(b, gw), 'Слово из текста: ' + b));
(U.choose || []).forEach(([q, ans, rule]) => {
  const m = q.match(/\((.+?)\)/); const opts = m[1].split('/').map(x => x.trim());
  add('G', q.replace(m[0], '…'), [ans, ...opts.filter(x => x !== ans)], rule);
});
(U.transform || []).forEach(([sg, du, pl]) => {
  add('G', `الْمُثَنَّى: ${sg}`, [du, pl, sg], 'Двойственное число: ' + du);
  add('G', `الْجَمْعُ: ${sg}`, [pl, du, sg], 'Множественное число: ' + pl);
});
const wr = (U.errors || []).map(x => x[0]);
(U.errors || []).forEach(([w, c, r]) => add('E', 'اِخْتَرِ الْجُمْلَةَ الصَّحِيحَةَ:', [c, w, ...shuffle(wr.filter(x => x !== w)).slice(0, 2)], `Ошибка: ${w} → ${c} · ${r}`));

const key = U.code;
const out = `src/content/quizzes/${key}.json`;
if (fs.existsSync(out) && !force) { console.error(`${out} уже есть. Чтобы заменить вопросы, добавьте --force.`); process.exit(1); }
const quiz = {
  key, title: `Урок ${U.num}: «${U.topicRu}»`,
  description: '20 вопросов по тексту урока: понимание, слова, грамматика, ошибки.',
  level: 'A1', topics: ['текст'], added: new Date().toISOString().slice(0, 10), kind: 'quiz', courses: ['tsu-2-sem1'],
  plan: [['F', 8], ['V', 4], ['G', 5], ['E', 3]],
  sections: {
    F: { ar: 'فَهْمُ النَّصِّ', ru: 'понимание', icon: '📖', sec: 30 }, V: { ar: 'الْمُفْرَدَاتُ', ru: 'слова', icon: '🔤', sec: 20 },
    G: { ar: 'الْقَوَاعِدُ', ru: 'грамматика', icon: '🧩', sec: 25 }, E: { ar: 'تَصْحِيحُ الْأَخْطَاءِ', ru: 'ошибки', icon: '🛠️', sec: 30 },
  },
  ins: {
    F: { ar: 'اِقْرَأِ النَّصَّ، ثُمَّ أَجِبْ عَنِ الْأَسْئِلَةِ.', ru: 'Текст открывается кнопкой «📄 Текст» в любой момент, но время идёт.' },
    V: { ar: 'اِخْتَرِ الْإِجَابَةَ الصَّحِيحَةَ.', ru: 'Слова из текста: множественное число, противоположности, пропуски.' },
    G: { ar: 'اِخْتَرِ الْإِجَابَةَ الصَّحِيحَةَ.', ru: 'Грамматика из предложений текста.' },
    E: { ar: 'اِخْتَرِ الْجُمْلَةَ الصَّحِيحَةَ.', ru: 'Работа над ошибками: только одна из четырёх строк написана без ошибки.' },
  },
  title_ar: U.title,
  para: U.paras.map(([label, sentences]) => ({ label, sentences })),
  levels: [{ min: 19, label: 'Мастер 🏆' }, { min: 16, label: 'Отлично 🌟' }, { min: 12, label: 'Хорошо 👍' }, { min: 8, label: 'Базовый 🙂' }, { min: 0, label: 'Начинающий 🌱' }],
  pool: P,
};
fs.writeFileSync(out, JSON.stringify(quiz, null, 1) + '\n');
const by = P.reduce((a, p) => ((a[p.s] = (a[p.s] || 0) + 1), a), {});
console.log(`${out}: ${P.length} вопросов`, by, '\nПроверьте название (title), описание и темы, затем: npm run build');
