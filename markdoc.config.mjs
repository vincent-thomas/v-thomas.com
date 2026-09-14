import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
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
