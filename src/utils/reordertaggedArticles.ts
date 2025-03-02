import { type CollectionEntry } from "astro:content";

export function listTags(articles: CollectionEntry<"article">[]) {
  const tags: Record<string, Set<CollectionEntry<"article">>> = {};
  articles
    .filter((nice) => !!nice.data.pubDate)
    .forEach((article) => {
      article.data.tags.forEach((tag) => {
        tags[tag] = tags[tag] || new Set();
      });

      article.data.tags.forEach((tag) => {
        tags[tag].add(article);
      });
    });

  return tags;
}
