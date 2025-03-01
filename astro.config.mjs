// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import autolink_headers from "rehype-autolink-headings";
import autolink_links from "rehype-external-links";
import add_ids_to_headers from "rehype-slugs";
import rehypeKatex from "rehype-katex";

import Icons from "unplugin-icons/vite";

export default defineConfig({
  site: "https://v-thomas.com",
  integrations: [mdx(), sitemap()],
  prefetch: true,
  devToolbar: { enabled: false },

  redirects: {
    "/github": "https://github.com/vincent-thomas",
    "/linkedin": "https://www.linkedin.com/in/vincent-thomas-08577b333/",
    "/x": "https://x.com/vincenttho1337",
  },

  adapter:
    process.env.NODE_ENV !== "production"
      ? undefined
      : cloudflare({
          imageService: "compile",
          platformProxy: { enabled: false },
        }),

  output: "static",
  scopedStyleStrategy: "attribute",
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

  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: "raw",
      }),
    ],
  },
});
