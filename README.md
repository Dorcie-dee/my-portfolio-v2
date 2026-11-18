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

## Continuous integration

GitHub Actions workflows live in `.github/workflows`. Nothing is deployed.

| Workflow | Checks | Runs on |
| --- | --- | --- |
| **CI** | Frozen-lockfile install, `yarn lint`, `yarn typecheck`, `yarn build` (Node from `.nvmrc`) | PRs to `main`, pushes to `main`, manual |
| **Security** | `yarn audit` (blocks high or critical in production dependencies; reports dev dependencies without blocking), Gitleaks secret scan, dependency review of PR changes (blocks high or above) | PRs, pushes to `main`, weekly, manual |
| **CodeQL** | Static analysis of the TypeScript code and the workflow files | PRs, pushes to `main`, weekly, manual |
| **Conventional Commits** | PR title and every non-merge commit match `type(optional-scope): description` | PRs (including title edits) |

**Before merging**, every check above must pass. To check a message locally:
`.github/scripts/check-conventional-commit.sh message "ci: add quality checks"`.

**Manual GitHub settings** (repository owner):

1. **Code scanning:** in Settings → Code security, leave CodeQL **default setup** disabled, because this repository uses the CodeQL workflow (advanced setup).
2. **Branch protection:** in Settings → Branches (or Rules), protect `main` and require these status checks: `Lint, typecheck and build`, `Dependency audit`, `Secret scan`, `Dependency review`, `Analyze (javascript-typescript)`, `Analyze (actions)` and `PR title and commit messages`.
3. **Dependency graph** must stay enabled for dependency review. It is on by default for public repositories.

All third-party actions are pinned to full commit SHAs. Update them deliberately and check the release notes.

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
