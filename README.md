# zachrobertson.tech

Personal site and blog, built with [Next.js](https://nextjs.org) (App Router) and deployed on [Vercel](https://vercel.com).

## Writing a post

Add a Markdown file to `content/blog/`. The file name becomes the URL (`/blog/<name>`).

```markdown
---
title: "Post title"
date: "2026-01-31"
author: "Zach Robertson"
description: "One sentence shown on cards and in the RSS feed."
tags: ["simulation", "ai"]
---
```

Raw HTML (`<figure>`, `<video>`) is allowed in posts. Put images and video under `public/blog/<name>/`.

## Development

```bash
yarn install
yarn dev      # http://localhost:3000
yarn lint
yarn build
```

No environment variables or API keys are required.
