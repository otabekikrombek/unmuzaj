// Список узбекских строк для проверки заказчиком: docs/uz_tekshirish.md.
// Собирается из словарей src/i18n/ru.ts и uz.ts: npm run uz-review (после любой правки uz.ts).
// tests/i18n.mjs проверяет, что файл не устарел.
import { writeFileSync } from 'node:fs';
import { ru } from '../src/i18n/ru.ts';
import { uz } from '../src/i18n/uz.ts';

export const DOC = 'docs/uz_tekshirish.md';

// Разделы словаря — по-русски, чтобы было понятно, где на сайте эта строка
const SECTIONS = {
  meta: 'Общее', lang: 'Переключатель языка', nav: 'Меню и шапка', navGroups: 'Группы меню', look: 'Окно «Оформление»', search: 'Поиск по сайту',
  sectionsDesc: 'Описания разделов', common: 'Общие слова', kinds: 'Типы заданий', home: 'Главная страница', pages: 'Страницы разделов',
  about: 'О сайте', privacy: 'Конфиденциальность', login: 'Вход', me: 'Мой прогресс', deck: 'Карточки слов', quiz: 'Викторины и тесты',
  board: 'Табло для проектора', mock: 'Пробные экзамены', moved: 'Страница-переадресация', conj: 'Спряжение глаголов', teacher: 'Панель учителя', footer: 'Подвал',
};

// Решения, которые стоит подтвердить в первую очередь
const QUESTIONS = [
  '«класс» → **sinf** (Men sinfdanman, Sinf kodi, Sinf reytingi). Или лучше **guruh**?',
  '«Мой прогресс» → **Mening natijalarim**.',
  '«карточки» → **kartochkalar**; «набор слов» → **toʻplam**.',
  '«псевдоним» → **taxallus**; «табло» → **tablo**; «рейтинг» → **reyting**.',
  '«огласовки» → **harakatlar** («harakatli yoki harakatsiz» — с огласовками или без).',
  '«интервальное повторение» → **oraliqli takrorlash**.',
  '«очки» в викторине → **ball**; «разбор ответов» → **tahlil**.',
  'В примере названия класса «2 курс ТГУВ» → **TDShU 2-kurs, 1-guruh**.',
  'Названия палитр: Бирюза → **Feruza**, Лазурит → **Lojuvard**, Пергамент → **Pergament**.',
  'Девиз «Barcha arab tili ixlosmandlari uchun» на узбекской версии показывается без перевода.',
  'Спряжение: «спряжение» → **tuslanish**, «порода» → **bob** (I bob), «залог» → **nisbat** (maʼlum / majhul), «переходный» → **oʻtimli**.',
  'Спряжение: наклонения → **marfuʼ / mansub / majzum**; типы глаголов → **salim, mahmuz, misol, ajvaf, noqis, muzoaf, lafif**; огласовки → **fatha / zamma / kasra**.',
  'Спряжение: род в подписях лиц → **(muz.)** и **(muan.)** (muzakkar / muannas): «sen (muz.)», «ular ikkovi (muan.)». Или лучше другие сокращения?',
  'Подпись к названию на главной: «allimniy — menga oʻrgat». Как лучше передать عَلِّمْنِي латиницей?',
  'Пробные экзамены: раздел → **Mock imtihonlar** (так в задании), а в описании «Тестов» и в названии At-Tanāl — **sinov imtihoni**. Оставить оба или выбрать одно?',
  'Пробные экзамены: «выход из окна» → **oynadan chiqish**, «вкладка» → **varaq**, «отметить вопрос» → **belgilash**, «сдать экзамен» → **imtihonni topshirish**.',
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const isPlural = (v) => v && typeof v === 'object' && !Array.isArray(v) && typeof v.other === 'string';
const show = (v) => (isPlural(v) ? v.other : Array.isArray(v) ? v.join(' · ') : v);

function rows(a, b, path, out) {
  if (typeof a === 'string' || Array.isArray(a) || isPlural(a)) {
    const r = show(a), u = show(b);
    if (u !== '' || r !== '') out.push([path, r, u]);
    return out;
  }
  for (const k of Object.keys(a)) rows(a[k], b?.[k], path ? `${path}.${k}` : k, out);
  return out;
}

export function reviewDoc() {
  let n = 0;
  const parts = Object.keys(ru).map((sec) => {
    const list = rows(ru[sec], uz[sec], '', []);
    const body = list.map(([k, r, u]) => `| ${++n} | \`${sec}${k ? '.' + k : ''}\` | ${esc(r) || '—'} | ${esc(u) || '—'} |`).join('\n');
    return `## ${SECTIONS[sec] ?? sec}\n\n| № | Ключ | Русский | Oʻzbekcha |\n|---|---|---|---|\n${body}\n`;
  });
  return `# Oʻzbekcha satrlarni tekshirish · Проверка узбекских строк

Здесь собраны **все строки интерфейса на узбекском** (латиница) рядом с русскими — ${n} строк.
Файл создаётся автоматически из \`src/i18n/uz.ts\` командой \`npm run uz-review\`, поэтому правки вносите **не сюда, а в \`src/i18n/uz.ts\`**
(или пришлите список исправлений: номер строки и правильный вариант).

Как читать:
- \`{n}\`, \`{title}\` и т. п. — сюда сайт подставит число или название. Их не переводить и не удалять.
- Теги вроде \`<b>…</b>\`, \`<a href="{href}">…</a>\` — жирный шрифт и ссылки. Текст внутри переводить, сами теги оставить.
- Орфография: oʻ, gʻ — знак **ʻ** (U+02BB), тутуқ белгиси — **ʼ** (U+02BC): maʼlumot, eʼlon, aʼlo. Обычный апостроф \`'\` не используется (это проверяет \`npm run test:i18n\`).
- Учебные материалы (переводы слов, пояснения в викторинах, названия наборов) пока на русском: на узбекской версии сайта они показываются с пометкой «(rus tilida)». Их перевод — отдельная задача (поля \`r_uz\`, \`e_uz\` и др. в \`src/content/SCHEMA.md\`).

## Что подтвердить в первую очередь

${QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join('\n')}

${parts.join('\n')}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  writeFileSync(new URL('../' + DOC, import.meta.url), reviewDoc());
  console.log(`${DOC} обновлён`);
}
