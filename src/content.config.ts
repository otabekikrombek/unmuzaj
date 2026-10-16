import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Переводы материалов (CLAUDE.md §15.1) — необязательные поля рядом с русскими: title_uz, title_en, r_uz, e_uz…
// Если перевода нет, на /uz/ и /en/ показывается русский текст с пометкой «(rus tilida)» / «(in Russian)».
const opt = z.string().optional();
const tr = { title_uz: opt, title_en: opt, description_uz: opt, description_en: opt };

const base = {
  key: z.string(),
  title: z.string(),
  description: z.string(),
  ...tr,
  level: z.string().default('A1'),
  topics: z.array(z.string()).default([]),
  added: z.string(), // ГГГГ-ММ-ДД
  courses: z.array(z.string()).default([]),
};

const decks = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/decks' }),
  schema: z.object({
    ...base,
    items: z.array(z.object({ a: z.string(), r: z.string(), t: z.string(), r_uz: opt, r_en: opt })),
  }),
});

const quizzes = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/quizzes' }),
  schema: z
    .object({
      ...base,
      // quiz — викторина, test — тест (раздел «Тесты»), mock — пробный экзамен (раздел «Пробные экзамены», /mock/<key>/)
      kind: z.enum(['quiz', 'test', 'mock']).default('quiz'),
      // только для mock: время на весь экзамен, сколько выходов из окна допускается (null — не ограничено), названия тем
      duration_min: z.number().int().positive().max(240).optional(),
      max_exits: z.number().int().positive().nullable().default(null),
      topic_names: z.record(z.string(), z.string()).optional(),
      legacy: z.string().optional(),
      title_ar: z.string().optional(),
      // план: части по порядку и сколько вопросов из каждой берётся
      plan: z.array(z.tuple([z.string(), z.number().int().positive()])),
      sections: z.record(z.string(), z.object({ ar: z.string().optional(), ru: z.string(), uz: opt, en: opt, icon: z.string(), sec: z.number().positive() })),
      ins: z.record(z.string(), z.object({ ar: z.string(), ru: z.string(), uz: opt, en: opt })).optional(),
      text_in: z.array(z.string()).optional(), // в каких частях доступна кнопка «Текст» (по умолчанию — во всех)
      para: z.array(z.object({ label: z.string(), sentences: z.array(z.string()) })).optional(),
      lis: z.array(z.object({ who: z.string(), text: z.string() })).optional(),
      audio: z.string().optional(), // файл записи диалога в public/ (если есть)
      levels: z.array(z.object({ min: z.number().int(), label: z.string(), label_uz: opt, label_en: opt })).default([]), // у mock не используются
      pool: z.array(z.object({
        id: z.number().int(), s: z.string(), q: z.string(), o: z.array(z.string()).min(2), e: z.string().default(''),
        topic: z.number().int().positive().optional(), // номер темы (у mock — номер мабхаса), название — в topic_names
        // переводы вопроса, вариантов (в том же порядке, первый — правильный) и пояснения
        q_uz: opt, q_en: opt, o_uz: z.array(z.string()).optional(), o_en: z.array(z.string()).optional(), e_uz: opt, e_en: opt,
      })),
    })
    .superRefine((q, ctx) => {
      const ids = new Set<number>();
      for (const p of q.pool) {
        if (ids.has(p.id)) ctx.addIssue({ code: 'custom', message: `повторяется id вопроса ${p.id}` });
        ids.add(p.id);
        if (!q.sections[p.s]) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: нет части «${p.s}» в sections` });
        if (new Set(p.o).size !== p.o.length) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: одинаковые варианты ответа` });
        for (const o of [p.o_uz, p.o_en]) {
          if (o && o.length !== p.o.length) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: в o_uz / o_en должно быть столько же вариантов, сколько в o (${p.o.length})` });
          if (o && new Set(o).size !== o.length) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: одинаковые варианты ответа в переводе` });
        }
      }
      for (const [s, n] of q.plan) {
        const have = q.pool.filter(p => p.s === s).length;
        if (have < n) ctx.addIssue({ code: 'custom', message: `часть ${s}: в плане ${n} вопросов, а в pool только ${have}` });
      }
      if (q.kind !== 'mock' && !q.levels.length) ctx.addIssue({ code: 'custom', message: 'нет levels (уровней по числу верных ответов)' });
      if (q.kind === 'mock') {
        if (!q.duration_min) ctx.addIssue({ code: 'custom', message: 'пробный экзамен: нужно duration_min — минут на весь экзамен' });
        for (const p of q.pool) {
          if (p.topic == null) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: нет topic (номер темы)` });
          else if (!q.topic_names?.[String(p.topic)]) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: темы ${p.topic} нет в topic_names` });
          if (p.o.length > 4) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: в пробном экзамене не больше 4 вариантов (أ ب ج د)` });
        }
      }
    }),
});

const exercises = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/exercises' }),
  schema: z.object({ ...base, legacy: z.string().optional() }),
});

const courses = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/courses' }),
  schema: z.object({
    key: z.string(),
    title: z.string(),
    description: z.string(),
    ...tr,
    audience: z.string().optional(),
    audience_uz: opt,
    audience_en: opt,
    added: z.string(),
    items: z.array(z.object({ kind: z.enum(['deck', 'quiz', 'test', 'mock', 'exercise', 'grammar', 'text']), key: z.string(), note: z.string().optional() })),
  }),
});

// Таблицы спряжения: генерирует scripts/conjugate/build.py (Qutrub) из src/data/verbs.json. Руками не править.
const forms = z.array(z.string()).length(13);
const conjugations = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/conjugations' }),
  schema: z.object({
    key: z.string(),
    verb: z.string(),
    future_type: z.enum(['فتحة', 'ضمة', 'كسرة']),
    transitive: z.boolean(),
    engine: z.string(),
    forms: z.object({ past: forms, present: forms, subjunctive: forms, jussive: forms, imperative: forms, passive_past: forms, passive_present: forms }),
  }),
});

export const collections = { decks, quizzes, exercises, courses, conjugations };
