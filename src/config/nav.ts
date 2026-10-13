// Навигация сайта — одно место для шапки, мобильного меню, подвала и «хлебных крошек».
// Ключи разделов совпадают с t.nav, t.sectionsAr, t.sectionsDesc (src/i18n/ru.ts).
export type SectionKey = 'words' | 'dictionary' | 'quizzes' | 'tests' | 'exercises' | 'grammar' | 'texts' | 'courses';
export type GroupKey = 'learn' | 'tasks' | 'read' | 'courses';

/** группы меню по смыслу: учить → делать задания → читать → курсы */
export const NAV: { group: GroupKey; items: { key: SectionKey; href: string }[] }[] = [
  { group: 'learn', items: [{ key: 'words', href: 'words/' }, { key: 'dictionary', href: 'dictionary/' }] },
  { group: 'tasks', items: [{ key: 'quizzes', href: 'quizzes/' }, { key: 'tests', href: 'tests/' }, { key: 'exercises', href: 'exercises/' }] },
  { group: 'read', items: [{ key: 'grammar', href: 'grammar/' }, { key: 'texts', href: 'texts/' }] },
  { group: 'courses', items: [{ key: 'courses', href: 'courses/' }] },
];

/** раздел по первому сегменту адреса: /words/w100/ → words */
export function sectionOf(path: string): { key: SectionKey; href: string; group: GroupKey } | null {
  const seg = path.replace(/^\/+/, '').split('/')[0];
  for (const g of NAV) for (const it of g.items) if (it.href === seg + '/') return { ...it, group: g.group };
  return null;
}
