// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import autolink_headers from "rehype-autolink-headings";
import autolink_links from "rehype-external-links";
import add_ids_to_headers from "rehype-slugs";
import rehypeKatex from "rehype-katex";

import { remarkReadingTime, remarkModifiedTime } from "./remark-plugins.mjs";

/**
 * @type {import('astro/dist/types/public/config').AstroUserConfig}
 */
const config = {
  site: "https://v-thomas.com",
  integrations: [mdx(), sitemap()],
  devToolbar: { enabled: false },

  build: {
    assets: "assets",
  },

  output: "static",
  scopedStyleStrategy: "where",
  trailingSlash: "never",

  markdown: {
    rehypePlugins: [
      add_ids_to_headers,
      [autolink_headers, { behavior: "wrap" }],
      [
        autolink_links,
        {
          content: { type: "text", value: " 🔗" },
        },
      ],
      rehypeKatex,
    ],
    remarkPlugins: [remarkReadingTime, remarkModifiedTime],
  },

  experimental: {
    contentIntellisense: true,
    responsiveImages: true,
  },

  vite: {
    esbuild: { legalComments: "none" },
  },
};

export default defineConfig(config);
