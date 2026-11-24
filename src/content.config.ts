import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().trim().min(1),
    date: z.coerce.date(),
    description: z.string().trim().min(1),
    draft: z.boolean().default(false),
    cover: z.string().trim().min(1).optional(),
    coverAlt: z.string().trim().min(1).optional(),
  }).refine((post) => !post.cover || post.coverAlt, {
    message: 'coverAlt is required when cover is set',
    path: ['coverAlt'],
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.string(),
  }),
});

export const collections = { posts, pages };
