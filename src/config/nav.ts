// Навигация сайта — одно место для шапки, мобильного меню, подвала и «хлебных крошек».
// Ключи разделов совпадают с t.nav и t.sectionsDesc (src/i18n/ru.ts); арабские названия — SECTION_AR (не переводятся).
export type SectionKey = 'words' | 'dictionary' | 'conjugation' | 'quizzes' | 'tests' | 'mock' | 'exercises' | 'grammar' | 'texts' | 'courses';
export type GroupKey = 'learn' | 'tasks' | 'read' | 'courses';

/** группы меню по смыслу: учить → делать задания → читать → курсы */
export const NAV: { group: GroupKey; items: { key: SectionKey; href: string }[] }[] = [
  { group: 'learn', items: [{ key: 'words', href: 'words/' }, { key: 'dictionary', href: 'dictionary/' }, { key: 'conjugation', href: 'conjugation/' }] },
  { group: 'tasks', items: [{ key: 'quizzes', href: 'quizzes/' }, { key: 'tests', href: 'tests/' }, { key: 'mock', href: 'mock/' }, { key: 'exercises', href: 'exercises/' }] },
  { group: 'read', items: [{ key: 'grammar', href: 'grammar/' }, { key: 'texts', href: 'texts/' }] },
  { group: 'courses', items: [{ key: 'courses', href: 'courses/' }] },
];

/** арабские названия разделов: одинаковы на всех языках интерфейса */
export const SECTION_AR: Record<SectionKey, string> = {
  words: 'الْمُفْرَدَاتُ',
  quizzes: 'الْمُسَابَقَاتُ',
  tests: 'الِاخْتِبَارَاتُ',
  mock: 'الِاخْتِبَارَاتُ التَّجْرِيبِيَّةُ',
  exercises: 'التَّمَارِينُ',
  grammar: 'النَّحْوُ وَالصَّرْفُ',
  texts: 'النُّصُوصُ',
  courses: 'الْمُقَرَّرَاتُ',
  dictionary: 'الْمُعْجَمُ',
  conjugation: 'تَصْرِيفُ الْأَفْعَالِ',
};

/** раздел по первому сегменту адреса (адрес — без base и без языка): /words/w100/ → words */
export function sectionOf(path: string): { key: SectionKey; href: string; group: GroupKey } | null {
  const seg = path.replace(/^\/+/, '').split('/')[0];
  for (const g of NAV) for (const it of g.items) if (it.href === seg + '/') return { ...it, group: g.group };
  return null;
}
