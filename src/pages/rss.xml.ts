import rss from "@astrojs/rss";
import { getCollection, z } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection("article")).filter(
    (post) => !!post.data.pubDate,
  );
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: z.instanceof(URL).parse(context.site),
    items: posts.map((post) => ({
      ...post.data,
      link: `/logs/${post.id}/`,
    })),
  });
};
