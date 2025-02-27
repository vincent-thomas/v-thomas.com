// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import autolink_headers from "rehype-autolink-headings";
import autolink_links from "rehype-external-links";
import add_ids_to_headers from "rehype-slugs";

import rehypeKatex from "rehype-katex";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://v-thomas.com",
  integrations: [mdx(), sitemap(), icon()],
  prefetch: true,
  devToolbar: { enabled: false },

  adapter: cloudflare({
    imageService: "cloudflare",
  }),

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
  },

  redirects: {
    "/github": "https://github.com/vincent-thomas",
    "/linkedin": "https://www.linkedin.com/in/vincent-thomas-08577b333/",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
