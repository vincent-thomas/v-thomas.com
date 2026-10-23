import { Markdoc, component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';

function isExternalHttpUrl(href) {
  if (typeof href !== 'string' || !/^(?:https?:)?\/\//i.test(href)) return false;

  try {
    const url = new URL(href, 'https://localhost');
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export default defineMarkdocConfig({
  nodes: {
    link: {
      ...nodes.link,
      transform(node, config) {
        const attributes = node.transformAttributes(config);

        if (isExternalHttpUrl(attributes.href)) {
          attributes.target = '_blank';
          attributes.rel = 'noopener noreferrer';
        }

        return new Markdoc.Tag('a', attributes, node.transformChildren(config));
      },
    },
  },
  tags: {
    // Renders the front matter description, which doubles as the meta description.
    // It's passed in as a <Content> prop, so it's absent when Astro collects headings.
    bio: {
      selfClosing: true,
      transform(node, config) {
        return Markdoc.transform(Markdoc.parse(config.variables?.description ?? '').children, config);
      },
    },
    nav: {
      render: 'nav',
      attributes: { label: { type: String, render: 'aria-label' } },
    },
    portrait: {
      render: 'figure',
      attributes: { class: { type: String, default: 'portrait-frame' } },
    },
    'post-list': {
      render: component('./src/components/PostList.astro'),
      attributes: {
        limit: {
          type: Number,
          validate(value) {
            return Number.isInteger(value) && value > 0
              ? []
              : [{ id: 'invalid-limit', level: 'error', message: 'limit must be a positive integer' }];
          },
        },
      },
    },
  },
});
