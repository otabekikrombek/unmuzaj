// Нормализация для поиска: арабский без огласовок и вариантов алифа, русский без регистра и «ё».
// Используется словарём, поиском по сайту и индексом слов — чтобы «كِتَابٌ», «كتاب» и «Книга» находились одинаково.
const HARAKAT = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g; // огласовки, знаки Корана, татвиль
export function normAr(s: string): string {
  return s.replace(HARAKAT, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');
}
export function normRu(s: string): string {
  return s.toLowerCase().replace(/ё/g, 'е');
}
/** общая нормализация строки поиска (смешанный текст) */
export function norm(s: string): string {
  return normAr(normRu(s)).replace(/[«»"'“”.,;:!?؟،()\[\]–—-]+/g, ' ').replace(/\s+/g, ' ').trim();
}
export const hasAr = (s: string) => /[؀-ۿ]/.test(s);
