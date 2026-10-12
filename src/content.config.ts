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
  schema: z.object({ ...base, kind: z.enum(['quiz', 'test']).default('quiz'), legacy: z.string().optional() }),
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

export const collections = { decks, quizzes, exercises, courses };
