// @ts-check
import {
  defineMarkdocConfig,
  nodes,
  component,
  Markdoc,
} from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  nodes: {
    image: {
      ...nodes.image,
      attributes: {
        ...nodes.image.attributes,
        __optimizedSrc: { type: "Object" },
      },
      render: component("./src/markdoc/nodes/Img.astro"),
    },
    document: {
      ...nodes.document,
      render: null,
    },
    hr: {
      ...nodes.hr,
      render: component("./src/markdoc/nodes/Hr.astro"),
    },
    heading: {
      ...nodes.heading,
      render: component("./src/markdoc/nodes/Heading.astro"),
    },
    link: {
      ...nodes.link,
      transform: (node, config) => {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        return new Markdoc.Tag(
          "a",
          { ...attributes, rel: "nofollow" },
          children,
        );
      },
    },
  },
  tags: {
    callout: {
      render: component("./src/markdoc/tags/Callout/Callout.astro"),
      attributes: {
        type: {
          type: String,
          default: "note",
          matches: ["note", "tip", "caution", "warning"],
          errorLevel: "critical",
        },
      },
    },
    math: {
      render: component("./src/markdoc/tags/Math.astro"),
      children: [],
    },
  },

  extends: [
    shiki({
      theme: {
        name: "radix-theme",
        colors: {
          "editor.foreground": "var(--gray-12)",
          "editor.background": "var(--gray-1)",
          "editor.selectionBackground": "var(--gray-3)",
          "editor.lineHighlightBackground": "var(--gray-4)",
          "editorCursor.foreground": "var(--blue-8)",
        },
        settings: [
          {
            scope: "comment",
            settings: { foreground: "var(--gray-11)" },
          },
          {
            scope: "variable",
            settings: { foreground: "var(--blue-12)" },
          },
          {
            scope: "keyword",
            settings: { foreground: "var(--red-11)", fontStyle: "bold" },
          },
          {
            scope: "string",
            settings: { foreground: "var(--green-10)" },
          },
          {
            scope: "constant.numeric",
            settings: { foreground: "var(--blue-6)" },
          },
          {
            scope: "constant.language",
            settings: { foreground: "var(--red-9)" },
          },
          {
            scope: "function",
            settings: { foreground: "var(--blue-7)" },
          },
          {
            scope: "storage",
            settings: { foreground: "var(--red-11)" },
          },
          {
            scope: "operator",
            settings: { foreground: "var(--gray-10)" },
          },
          {
            scope: "punctuation",
            settings: { foreground: "var(--gray-9)" },
          },
          {
            scope: "meta.import",
            settings: { foreground: "var(--red-8)" },
          },
          {
            scope: "entity.name.type",
            settings: { foreground: "var(--blue-11)" },
          },
          {
            scope: "entity.name.function",
            settings: { foreground: "var(--blue-11)" },
          },
          {
            scope: "meta.class",
            settings: { foreground: "var(--red-10)", fontStyle: "bold" },
          },
        ],
      },
    }),
  ],
});
