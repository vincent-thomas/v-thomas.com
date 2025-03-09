import { CollectionEntry, getCollection, getEntry } from "astro:content";

export function validateArticle(
  article?: CollectionEntry<"article">,
): CollectionEntry<"article"> | null {
  if (article === undefined) {
    return null;
  }

  if (
    process.env.NODE_ENV === "production" &&
    article.data.pubDate === undefined
  ) {
    return null;
  }

  return article;
}

export async function getLog(
  id: string,
): Promise<CollectionEntry<"article"> | null> {
  const article = await getEntry("article", id);

  return validateArticle(article);
}

export async function getLogs(): Promise<CollectionEntry<"article">[]> {
  const articles = await getCollection("article");

  return articles
    .filter((post) => validateArticle(post) !== null)
    .sort((a, b) => b.data.pubDate!.valueOf() - a.data.pubDate!.valueOf());
}

export async function getLogsFromTag(
  tag: string,
): Promise<CollectionEntry<"article">[]> {
  const articles = await getLogs();

  return articles.filter((post) => post.data.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const articles = await getLogs();

  return articles.flatMap((post) => post.data.tags);
}
