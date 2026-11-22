# dorcas-portfolio

Personal portfolio of **Dorcas Nyamekye Quaye**, a Full-Stack Software Engineer with a backend focus.

It is written for recruiters, employers, freelance clients and potential collaborators. It will show practical engineering experience, backend development, full-stack projects and problem solving.

The visual identity, "Plum & Marigold", uses warm ivory pages, violet and deep plum, marigold highlights and a woven stripe motif. There is no dark mode toggle. See [docs/design-system.md](docs/design-system.md).

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Server Components by default) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4, with design tokens in `src/app/globals.css` |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Play (headings) and Nunito Sans (body) via `next/font` (self-hosted at build time) |
| Content | [Sanity](https://www.sanity.io) CMS, with the Studio embedded at `/manage` |
| Linting | ESLint 9 with `eslint-config-next` |
| Runtime | Node.js 24 LTS |
| Package manager | Yarn Classic (1.22.x) |

There is no custom database, backend API or authentication: content is stored in Sanity, and editing access is controlled by Sanity project membership. Motion is not installed. It will only be added if a specific design requirement needs it.

## Content management

Portfolio content (profile, projects, experience, skills, social links, CV and site settings) is edited in Sanity Studio at **`/manage`**. Published changes appear on the site within about 1 to 2 minutes, without a redeploy.

See **[docs/SANITY_SETUP_AND_USAGE.md](docs/SANITY_SETUP_AND_USAGE.md)** for a step-by-step guide.

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

## Deployment (Vercel)

Two public (non-secret) environment variables are required. Add them in Vercel as type **Config**, for Production, Preview and Development:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

The same two values are needed as GitHub Actions **Variables** for CI, and in a local `.env` file (see `.env.example`).

- **Site URL:** `src/lib/site-url.ts` uses `NEXT_PUBLIC_SITE_URL` if it is set. Otherwise it uses Vercel's built-in `VERCEL_PROJECT_PRODUCTION_URL` (your production domain, including a custom domain once assigned), and falls back to `http://localhost:3000` locally. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) only to override that.
- **Build settings:** Vercel detects Next.js and Yarn (from `yarn.lock`) automatically. Keep the defaults: install `yarn install`, build `next build`. Node.js 24 is selected from the `engines` field in `package.json`.
- There are no secrets or API tokens: the site reads published content from a public Sanity dataset.

## Continuous integration

GitHub Actions workflows live in `.github/workflows`. Nothing is deployed.

| Workflow | Checks | Runs on |
| --- | --- | --- |
| **CI** | Frozen-lockfile install, `yarn lint`, `yarn typecheck`, `yarn build` (Node from `.nvmrc`) | PRs to `main`, pushes to `main`, manual |
| **Security** | `yarn audit` (blocks high or critical in production dependencies; reports dev dependencies without blocking), Gitleaks secret scan, dependency review of PR changes (blocks high or above) | PRs, pushes to `main`, weekly, manual |
| **CodeQL** | Static analysis of the TypeScript code and the workflow files | PRs, pushes to `main`, weekly, manual |
| **Conventional Commits** | PR title and every non-merge commit match `type(optional-scope): description`. An invalid PR title (such as GitHub's default) is renamed automatically from the branch name, e.g. `feat/sanity-cms` becomes `feat: sanity cms`. | PRs (including title edits) |

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
- Content is managed in Sanity (`/manage`) and fetched in `src/sanity/lib`. Components only present that content. Run `yarn typegen` after changing schemas or queries.
- Use semantic HTML, visible keyboard focus and accessible names.
- Use the semantic colour utilities (`bg-surface`, `text-fg`, `text-accent`, etc.) rather than raw hex values.
- Avoid adding dependencies without a clear need.

## Current status

**Phase: site built, pre-launch.**

- [x] Foundation: Next.js, TypeScript, Tailwind CSS 4, ESLint, Node.js 24, design tokens
- [x] CI quality gates and security scanning
- [x] Shared header (with mobile menu), footer and homepage
- [x] About, Projects, project case studies (`/projects/[slug]`), Experience and Contact pages
- [x] Metadata, Open Graph image, icon, sitemap, robots and a custom 404 page
- [ ] Upload the current CV PDF in `/manage` → CV and turn on "Show CV on website"
- [ ] Choose hosting and set `NEXT_PUBLIC_SITE_URL`

Content lives in Sanity and is edited at `/manage`; published changes appear on the site within about two minutes, without a redeploy. `src/data` holds the original content used by the one-off migration script. Only verified public links are used, and private repositories are never linked.
