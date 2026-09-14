# v-thomas.com

Personal website built with Astro. Posts are Markdown files stored in this repository.

## Editing the landing page

Edit `src/pages/index.md` to update the homepage heading, profile links, portrait, copy, and metadata. `src/layouts/HomeLayout.astro` supplies the latest posts, footer, styling, and email-link behavior.

## Writing a post

Create `src/content/posts/my-post.md` (or copy `example.md`):

```markdown
---
title: 'My post'
date: 2026-09-14
description: 'A short summary for post lists and search engines.'
draft: true
---

Your post goes here. Use Markdown headings, links, lists, images, and fenced code blocks.
```

The filename determines the URL: `my-post.md` becomes `/posts/my-post/`. Use lowercase, hyphen-separated filenames. Nested folders are also supported.

- `title`, `date`, and `description` are required; use `YYYY-MM-DD` for dates.
- Drafts appear in local development with a draft label, but are excluded from production lists and routes. Draft files are still visible to anyone who can read the repository.
- Set `draft: false` (or remove the field), commit, and deploy the site to publish.
- Dates control newest-first sorting, not scheduled publication. A future-dated non-draft post will be published on the next build.
- The homepage shows the latest five posts; `/posts/` shows every published post.
- Put images in `public/images/` and reference them with `![Description](/images/filename.jpg)`, or use relative Markdown image paths to images beside your post.

`example.md` is an unpublished starter. Rename and edit it, or delete it once you've written your first post.

## Development

```sh
bun install
bun astro dev --background
```

Manage the background server with `bun astro dev status`, `bun astro dev logs`, and `bun astro dev stop`.

```sh
bun run build   # Build production output into dist/
bun run preview # Preview the production build (drafts excluded)
```
