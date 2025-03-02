import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const article = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageDescription: z.string().optional(),
    tags: z.array(z.string()).optional(),

    furtherReading: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { article };
