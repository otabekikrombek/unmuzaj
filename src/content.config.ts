import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const base = {
  key: z.string(),
  title: z.string(),
  description: z.string(),
  level: z.string().default('A1'),
  topics: z.array(z.string()).default([]),
  added: z.string(), // ГГГГ-ММ-ДД
  courses: z.array(z.string()).default([]),
};

const decks = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/decks' }),
  schema: z.object({
    ...base,
    items: z.array(z.object({ a: z.string(), r: z.string(), t: z.string() })),
  }),
});

const quizzes = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/quizzes' }),
  schema: z
    .object({
      ...base,
      kind: z.enum(['quiz', 'test']).default('quiz'),
      legacy: z.string().optional(),
      title_ar: z.string().optional(),
      // план: части по порядку и сколько вопросов из каждой берётся
      plan: z.array(z.tuple([z.string(), z.number().int().positive()])),
      sections: z.record(z.string(), z.object({ ar: z.string().optional(), ru: z.string(), icon: z.string(), sec: z.number().positive() })),
      ins: z.record(z.string(), z.object({ ar: z.string(), ru: z.string() })).optional(),
      text_in: z.array(z.string()).optional(), // в каких частях доступна кнопка «Текст» (по умолчанию — во всех)
      para: z.array(z.object({ label: z.string(), sentences: z.array(z.string()) })).optional(),
      lis: z.array(z.object({ who: z.string(), text: z.string() })).optional(),
      audio: z.string().optional(), // файл записи диалога в public/ (если есть)
      levels: z.array(z.object({ min: z.number().int(), label: z.string() })),
      pool: z.array(z.object({ id: z.number().int(), s: z.string(), q: z.string(), o: z.array(z.string()).min(2), e: z.string().default('') })),
    })
    .superRefine((q, ctx) => {
      const ids = new Set<number>();
      for (const p of q.pool) {
        if (ids.has(p.id)) ctx.addIssue({ code: 'custom', message: `повторяется id вопроса ${p.id}` });
        ids.add(p.id);
        if (!q.sections[p.s]) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: нет части «${p.s}» в sections` });
        if (new Set(p.o).size !== p.o.length) ctx.addIssue({ code: 'custom', message: `вопрос ${p.id}: одинаковые варианты ответа` });
      }
      for (const [s, n] of q.plan) {
        const have = q.pool.filter(p => p.s === s).length;
        if (have < n) ctx.addIssue({ code: 'custom', message: `часть ${s}: в плане ${n} вопросов, а в pool только ${have}` });
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
    audience: z.string().optional(),
    added: z.string(),
    items: z.array(z.object({ kind: z.enum(['deck', 'quiz', 'test', 'exercise', 'grammar', 'text']), key: z.string(), note: z.string().optional() })),
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
