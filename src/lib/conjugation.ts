// Таблица спряжения (раздел «Спряжение», CLAUDE.md §13.2). Одна функция рисует таблицу и при сборке
// (страницы /conjugation/<key>/), и в браузере (режим «Любой глагол»). Подписи — раздел conj словаря языка страницы
// (src/i18n/ru.ts, uz.ts, en.ts); его передают параметром C. Арабские подписи одинаковы на всех языках — CONJ_AR.
import type { Dict } from '../i18n/ru';
export type ConjLabels = Dict['conj'];

export const TENSES = ['past', 'present', 'subjunctive', 'jussive', 'imperative', 'passive_past', 'passive_present'] as const;
export type Tense = (typeof TENSES)[number];
export type Forms = Record<Tense, string[]>;
export const TYPES = ['sound', 'hamzated', 'assimilated', 'hollow', 'defective', 'doubled', 'lafif'] as const;
export type VerbType = (typeof TYPES)[number];

/** 13 лиц: я, ты м., ты ж., он, она, вы двое, они двое м., они двое ж., мы, вы м., вы ж., они м., они ж. */
export const PERSON_AR = ['أَنَا', 'أَنْتَ', 'أَنْتِ', 'هُوَ', 'هِيَ', 'أَنْتُمَا', 'هُمَا', 'هُمَا', 'نَحْنُ', 'أَنْتُمْ', 'أَنْتُنَّ', 'هُمْ', 'هُنَّ'];
/** лица повелительной формы: ты м., ты ж., вы двое, вы м., вы ж. */
export const IMPERATIVE_PERSONS = [1, 2, 5, 9, 10];
const HUWA = 3;

/** арабские подписи раздела: не переводятся */
export const CONJ_AR = {
  types: {
    sound: 'صَحِيحٌ سَالِمٌ', hamzated: 'مَهْمُوزٌ', assimilated: 'مِثَالٌ', hollow: 'أَجْوَفُ',
    defective: 'نَاقِصٌ', doubled: 'مُضَعَّفٌ', lafif: 'لَفِيفٌ',
  } as Record<string, string>,
  // образец настоящего-будущего по огласовке второго корневого
  babPattern: { 'فتحة': 'يَفْعَلُ', 'ضمة': 'يَفْعُلُ', 'كسرة': 'يَفْعِلُ' } as Record<string, string>,
  active: 'الْمَبْنِيُّ لِلْمَعْلُومِ',
  passive: 'الْمَبْنِيُّ لِلْمَجْهُولِ',
  past: 'الْمَاضِي',
  present: 'الْمُضَارِعُ',
  moods: { present: 'الْمَرْفُوعُ', subjunctive: 'الْمَنْصُوبُ', jussive: 'الْمَجْزُومُ' },
  imperative: 'الْأَمْرُ',
};

/** ключи ответа Qutrub (display_format='DICT') — те же, что в scripts/conjugate/build.py */
export const QUTRUB_PERSONS = ['أنا', 'أنت', 'أنتِ', 'هو', 'هي', 'أنتما', 'هما', 'هما مؤ', 'نحن', 'أنتم', 'أنتن', 'هم', 'هن'];
export const QUTRUB_TENSES: Record<Tense, string> = {
  past: 'الماضي المعلوم',
  present: 'المضارع المعلوم',
  subjunctive: 'المضارع المنصوب',
  jussive: 'المضارع المجزوم',
  imperative: 'الأمر',
  passive_past: 'الماضي المجهول',
  passive_present: 'المضارع المجهول',
};
export function fromQutrub(r: Record<string, Record<string, string>>): Forms {
  const out = {} as Forms;
  for (const k of TENSES) out[k] = QUTRUB_PERSONS.map(p => (r[QUTRUB_TENSES[k]]?.[p] || '').normalize('NFC'));
  return out;
}

/** тип глагола по корню (ء — хамза; و، ي — слабые). Хамзованный может быть и пустым, и недостаточным. */
export function verbTypes(root: string): VerbType[] {
  const r = [...root.replace(/[أإؤئآ]/g, 'ء')];
  const out: VerbType[] = [];
  const weak = r.map((c, i) => (c === 'و' || c === 'ي' ? i : -1)).filter(i => i >= 0);
  if (weak.length >= 2) out.push('lafif');
  else if (weak[0] === 0) out.push('assimilated');
  else if (weak[0] === 1) out.push('hollow');
  else if (weak[0] === 2) out.push('defective');
  if (r[1] && r[1] === r[2]) out.push('doubled');
  if (r.includes('ء')) out.push('hamzated');
  return out.length ? out : ['sound'];
}

/** русский текст с арабскими вставками («искать (بَحَثَ عَنْ)»): арабское — в <span lang="ar" dir="rtl"> */
export function mixed(text: string): string {
  return esc(text).replace(/[\u0600-\u06ff](?:[\u0600-\u06ff\s]*[\u0600-\u06ff])?/g, m => `<span lang="ar" dir="rtl">${m}</span>`);
}
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
let C0: ConjLabels; // подписи текущей отрисовки (задаёт renderConjugation)
const ar = (s: string, cls = '') => s ? `<span lang="ar" dir="rtl"${cls ? ` class="${cls}"` : ''}>${esc(s)}</span>` : `<span class="cj-none" aria-label="${esc(C0.noForm)}">—</span>`;
const head = (ru: string, arText: string) => `<span class="cj-h-ru" dir="ltr">${esc(ru)}</span> ${ar(arText, 'cj-h-ar')}`;
const personCell = (i: number) => `<th scope="row" class="cj-p">${ar(PERSON_AR[i], 'cj-p-ar')}<span class="cj-p-ru" dir="ltr">${esc(C0.persons[i])}</span></th>`;

/** таблица: строки — лица, колонки — формы. На телефоне видна одна колонка, переключатель — initConjugation() */
function table(caption: string, cols: { key: Tense; label: string; group?: boolean }[], forms: Forms, rows: number[], group?: string) {
  const multi = cols.length > 1;
  let thead = '';
  if (group) {
    const n = cols.filter(c => c.group).length;
    thead += `<tr class="cj-grouprow"><td></td>${cols.filter(c => !c.group).map(() => '<td></td>').join('')}<th scope="colgroup" colspan="${n}" class="cj-group">${group}</th></tr>`;
  }
  const mob = group ? `<span class="cj-mob">${esc(C0.present)}:</span> ` : '';
  thead += `<tr><th scope="col" class="cj-corner">${esc(C0.person)}</th>${cols.map(c => `<th scope="col" class="c-${c.key}">${c.group ? mob : ''}${c.label}</th>`).join('')}</tr>`;
  const body = rows.map(i => `<tr>${personCell(i)}${cols.map(c => `<td class="c-${c.key}">${ar(forms[c.key][i], 'cj-f')}</td>`).join('')}</tr>`).join('');
  const sw = multi
    ? `<div class="cj-switch" role="group" aria-label="${esc(C0.showCol)}" hidden>${cols.map((c, i) =>
        `<button type="button" data-col="${c.key}" aria-pressed="${i === 0}">${esc(C0.short[c.key as keyof ConjLabels['short']] || c.key)}</button>`).join('')}</div>`
    : '';
  // data-show ставит initConjugation(): без скрипта видны все колонки (таблица прокручивается внутри рамки)
  return `<div class="cj-box${multi ? ' cj-multi' : ''}">${sw}` +
    `<table class="cj" dir="rtl"><caption class="sr-only">${esc(caption)}</caption><thead>${thead}</thead><tbody>${body}</tbody></table></div>`;
}

/** level — уровень заголовков разделов (h2 на странице глагола, глубже — внутри «Любого глагола»); C — подписи языка страницы */
export function renderConjugation(forms: Forms, opts: { transitive: boolean; level?: 2 | 3 | 4; C: ConjLabels }): string {
  const C = (C0 = opts.C), A = CONJ_AR;
  const all = [...Array(13).keys()];
  const h = `h${opts.level ?? 2}`;
  const sec = (title: string, inner: string) => `<section class="cj-sec"><${h} class="cj-sec-h">${title}</${h}>${inner}</section>`;
  const active = table(
    `${C.active}: ${C.past}, ${C.present}`,
    [
      { key: 'past', label: head(C.past, A.past) },
      { key: 'present', label: head(C.moods.present, A.moods.present), group: true },
      { key: 'subjunctive', label: head(C.moods.subjunctive, A.moods.subjunctive), group: true },
      { key: 'jussive', label: head(C.moods.jussive, A.moods.jussive), group: true },
    ],
    forms, all, head(C.present, A.present),
  );
  const imperative = table(C.imperative, [{ key: 'imperative', label: ar(A.imperative, 'cj-h-ar') }], forms, IMPERATIVE_PERSONS);
  const hasPassive = forms.passive_past.some(Boolean) || forms.passive_present.some(Boolean);
  let passive = '';
  if (hasPassive && opts.transitive) {
    passive = table(C.passive, [
      { key: 'passive_past', label: head(C.past, A.past) },
      { key: 'passive_present', label: head(C.present, A.present) },
    ], forms, all);
  } else if (hasPassive) {
    // непереходный: только безличная форма 3 л. ед. ч. м. р. (форму ж. р., которую тоже даёт Qutrub, не показываем — см. описание PR)
    passive = `<p class="cj-impersonal">${esc(C.impersonal)}<br>${ar([forms.passive_past[HUWA], forms.passive_present[HUWA]].filter(Boolean).join(' – '), 'cj-f')}</p>`;
  }
  return sec(head(C.active, A.active), active) +
    `<div class="cj-two">${sec(head(C.imperative, A.imperative), imperative)}${passive ? sec(head(C.passive, A.passive), passive) : ''}</div>`;
}

/** переключатель колонок на телефоне (кнопки над таблицей) */
export function initConjugation(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('.cj-multi').forEach(box => {
    const sw = box.querySelector<HTMLElement>('.cj-switch');
    if (!sw || sw.dataset.ready) return;
    sw.dataset.ready = '1';
    sw.hidden = false;
    box.dataset.show = sw.querySelector<HTMLButtonElement>('button[aria-pressed=true]')?.dataset.col;
    sw.addEventListener('click', e => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-col]');
      if (!b) return;
      box.dataset.show = b.dataset.col;
      sw.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    });
  });
}
