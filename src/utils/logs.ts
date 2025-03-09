import { CollectionEntry, getCollection, getEntry } from "astro:content";

export function validateArticle(article: CollectionEntry<"article">): boolean {
  return !(
    process.env.NODE_ENV === "production" && article.data.pubDate === undefined
  );
}

export async function getLog(
  id: string,
): Promise<CollectionEntry<"article"> | null> {
  const article = await getEntry("article", id);

  if (article === undefined) {
    return null;
  }

  if (!validateArticle(article)) {
    return null;
  }

  return article;
}

export async function getLogs(): Promise<CollectionEntry<"article">[]> {
  let articles = await getCollection("article");

  articles = articles.filter((post) => validateArticle(post));

  if (process.env.NODE_ENV === "production") {
    return articles.sort(
      // @ts-ignore
      (a, b) => b.data.pubDate?.valueOf() - a.data.pubDate?.valueOf(),
    );
  } else {
    return articles;
  }
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
