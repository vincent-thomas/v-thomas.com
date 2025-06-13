// @ts-check
import { defineConfig } from "astro/config";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

import icon from "astro-icon";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://docs.astro.build/en/reference/configuration-reference/#buildassetsprefix

/**
 * @type {import('astro/dist/types/public/config').AstroUserConfig}
 */
const config = {
  site: "https://v-thomas.com",
  integrations: [markdoc(), sitemap(), icon()],
  devToolbar: { enabled: false },

  build: {
    assets: "assets",
  },

  output: "server",
  adapter: node({ mode: "standalone" }),
  server: {
    host: "0.0.0.0",
  },

  scopedStyleStrategy: "where",

  // Redirects
  redirects: {
    "/x": "https://x.com/vincenttho1337",
    "/linkedin": "https://www.linkedin.com/in/vt06/",
    "/github": "https://github.com/vincent-thomas",
  },

  markdown: {
    remarkPlugins: [remarkReadingTime, remarkModifiedTime],
  },

  experimental: {
    contentIntellisense: true,
    responsiveImages: true,
    svg: true,
  },

  vite: {
    esbuild: { legalComments: "none" },
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
