import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  deck: z.string(),
  date: z.string(),
  issue: z.string(),
  topic: z.string(),
  readTime: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  translationSlug: z.string().optional(),
  articleDOI: z.string().optional(),
  theSmallPrint: z.string().optional(),
  paperTitle: z.string().optional(),
  paperAuthors: z.string().optional(),
  paperJournal: z.string().optional(),
  paperYear: z.string().optional(),
  paperDOI: z.string().optional(),
  paperURL: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: articleSchema,
});

const articlesEs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles-es' }),
  schema: articleSchema,
});

export const collections = { articles, articlesEs };
