interface RequiredData {
  data: {
    tags: string[];
  };
}

export function listTags<T extends RequiredData>(articles: T[]) {
  const tags: Record<string, Set<T>> = {};
  articles.forEach((article) => {
    article.data.tags.forEach((tag) => {
      tags[tag] = tags[tag] || new Set();
    });

    article.data.tags.forEach((tag) => {
      tags[tag].add(article);
    });
  });

  return tags;
}
