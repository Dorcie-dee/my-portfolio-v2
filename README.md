# dorcas-portfolio

Personal portfolio of **Dorcas Nyamekye Quaye**, a backend-focused software engineer.

It is written for recruiters, employers, freelance clients and potential collaborators. It will show practical engineering experience, backend development, full-stack projects and problem solving.

The visual direction is hybrid: dark and light sections alternate on the same page. This is not a user-controlled dark mode. See [docs/design-system.md](docs/design-system.md).

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Server Components by default) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4, with design tokens in `src/app/globals.css` |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Geist and Geist Mono via `next/font` (self-hosted at build time) |
| Linting | ESLint 9 with `eslint-config-next` |
| Runtime | Node.js 24 LTS |
| Package manager | Yarn Classic (1.22.x) |

There is no database, backend API or authentication. Motion is not installed. It will only be added if a specific design requirement needs it.

## Prerequisites

- **Node.js 24 LTS.** The version is pinned in `.nvmrc`, and `package.json` declares `"engines": { "node": ">=24 <25" }`. Yarn refuses to install on other major versions.
- **Yarn Classic 1.22.x.**

```bash
nvm install   # first time only; reads .nvmrc
nvm use
```

## Installation

```bash
yarn install --frozen-lockfile
```

## Development

```bash
yarn dev      # start the dev server at http://localhost:3000
```

## Build and verification

| Command | Purpose |
| --- | --- |
| `yarn typecheck` | Generates Next.js route types (`next typegen`), then runs `tsc --noEmit`. Works on a fresh clone without a prior build. |
| `yarn lint` | ESLint across the project |
| `yarn build` | Production build |
| `yarn start` | Serve the production build locally |

Run `yarn typecheck && yarn lint && yarn build` before opening a pull request.

## Folder structure

```text
dorcas-portfolio/
├── docs/
│   └── design-system.md     # design tokens and decisions
├── public/
│   ├── documents/           # downloadable files (e.g. CV)
│   ├── images/              # site-wide images (e.g. profile photo)
│   └── projects/            # project screenshots and media
├── src/
│   ├── app/                 # App Router routes, root layout, global CSS
│   ├── components/
│   │   ├── layout/          # page chrome: header, footer, navigation
│   │   ├── sections/        # page sections composed from content data
│   │   └── ui/              # small reusable primitives (buttons, tags, links)
│   ├── data/                # portfolio content as typed data, kept separate from presentation
│   ├── lib/                 # shared helpers and configuration (e.g. fonts)
│   └── types/               # shared TypeScript types for content data
├── .nvmrc
├── package.json
└── tsconfig.json
```

Empty folders contain a `.gitkeep` so they survive cloning. Delete the `.gitkeep` once a folder has a real file.

Import from `src` with the `@/` alias, for example `import { geistSans } from "@/lib/fonts"`.

## Engineering conventions

- Use Server Components by default. Add `"use client"` only when interactivity requires it.
- Keep content in `src/data` and types in `src/types`. Components only present that content.
- Use semantic HTML, visible keyboard focus and accessible names.
- Use the semantic colour utilities (`bg-surface`, `text-fg`, `text-accent`, etc.) rather than raw hex values.
- Avoid adding dependencies without a clear need.

## Current status

**Phase: project foundation.**

- [x] Next.js, TypeScript, Tailwind CSS 4, ESLint and Lucide React set up
- [x] Node.js 24 LTS configured, with a fresh-clone-safe `typecheck` script
- [x] Folder structure in place
- [x] Design tokens, surfaces, focus and reduced-motion styles
- [ ] Navigation, homepage and portfolio sections (not started)
- [ ] Real content: projects, experience, CV (not started)

`src/app/page.tsx` is currently a **temporary design-token check page**. It shows each surface, the type scale and the focus ring. It contains no portfolio content and will be replaced when the homepage is built.
