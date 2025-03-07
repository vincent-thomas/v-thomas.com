// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

import autolink_headers from "rehype-autolink-headings";
import autolink_links from "rehype-external-links";
import add_ids_to_headers from "rehype-slugs";
import rehypeKatex from "rehype-katex";

import icon from "astro-icon";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://docs.astro.build/en/reference/configuration-reference/#buildassetsprefix

/**
 * @type {import('astro/dist/types/public/config').AstroUserConfig}
 */
const config = {
  site: "https://v-thomas.com",
  integrations: [mdx(), sitemap(), icon()],
  devToolbar: { enabled: false },

  build: {
    assets: "assets",
  },

  output: "server",
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: { enabled: false },
  }),

  scopedStyleStrategy: "where",

  // Redirects
  redirects: {
    "/x": "https://x.com/vincenttho1337",
    "/linkedin": "https://www.linkedin.com/in/vincent-thomas-08577b333/",
    "/github": "https://github.com/vincent-thomas",
  },

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
    server: {
      origin: "http://localhost:3001",
    },
    plugins: [
      vanillaExtractPlugin({
        identifiers: ({ hash }) => `v${hash}`,
      }),
    ],
  },
};

export default defineConfig(config);

import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import { execSync } from "child_process";

export function remarkReadingTime() {
  // @ts-ignore
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    data.astro.frontmatter.minuteRead = readingTime.minutes;
  };
}

export function remarkModifiedTime() {
  // @ts-ignore
  return function (_tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}
