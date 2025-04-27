import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const article = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "*/index.mdoc" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z
      .object({
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date().optional(),
        heroImage: z
          .object({ dark: image(), light: image(), alt: z.string() })
          .optional(),
        tags: z.array(z.string()),

        partOfSeries: z.string().optional(),

        furtherReading: z
          .array(
            z.object({
              title: z.string(),
              url: z.string(),
            }),
          )
          .optional(),
      })
      .strict(),
});

const project = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "*.{md,mdx}" }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      date: z.coerce.date(),
      dateFinished: z.string().optional(),
      draft: z.boolean().optional(),
      repo: z.string(),
      license: z.string(),
      logPost: reference("article").optional(),
    })
    .strict(),
});

export const collections = { article, project };
