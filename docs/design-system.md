# Design system: "Plum & Marigold"

Status: **current identity** (replaces the earlier navy-and-lime foundation).

All tokens are defined in [`src/app/globals.css`](../src/app/globals.css). Fonts are loaded in [`src/lib/fonts.ts`](../src/lib/fonts.ts).

## 1. Direction

The identity continues the owner's existing visual signature instead of starting from a neutral template:

- **Purple** from the previous portfolio (`#9F00FF` accent, `#4F3274` hero), deepened so it meets WCAG AA on light backgrounds.
- **Play** headings from the Flawless Wears project: squarish but friendly letterforms, technical without feeling futuristic.
- **Warmth** from Flawless Wears' Afrocentric character, expressed as a restrained **woven stripe** (plum, violet, marigold, lilac) and a marigold highlight.

Principles: warm light pages instead of grey or white, colour used deliberately, bold outlines and solid offset ("stamp") shadows instead of gradients, glass or glow effects, and typography doing most of the work.

## 2. Typography

| Role | Font | Notes |
| --- | --- | --- |
| Headings (`h1`–`h3`), eyebrow labels | **Play** 700 (`font-display`) | Applied to `h1`–`h3` in the base layer |
| Body and UI | **Nunito Sans** (`font-sans`) | Large x-height and Verdana-like readability; Verdana is the fallback |

Both fonts are self-hosted via `next/font`, with no runtime requests to Google. Monospace is intentionally not used.

**Scale:** use Tailwind's default scale for body and UI text, plus:

| Utility | Size | Line height |
| --- | --- | --- |
| `text-display` | `clamp(2.25rem, 3vw + 1.25rem, 3.75rem)` | 1.06 |
| `text-headline` | `clamp(1.75rem, 2vw + 1.1rem, 2.75rem)` | 1.12 |
| `eyebrow` (utility) | 0.8125rem, uppercase, 0.14em tracking, Play 700 | 1.4 |

## 3. Colour

### Palette

| Token | Hex | Use |
| --- | --- | --- |
| `ivory` | `#FFFAF3` | Default page background |
| white | `#FFFFFF` | Cards; `surface-paper` sections |
| `lilac` | `#F3ECFB` | Alternate sections, tags, soft shadows |
| `butter` | `#FFF3D9` | Contact band, in-progress status, date pills |
| `marigold` | `#F4B740` | Highlights, project panels, accent on plum |
| `violet` | `#6A2BC4` | Primary buttons, links, active navigation |
| `violet-deep` | `#5420A8` | Hover state for violet fills |
| `plum` | `#2E1A47` | Outlines, stamp shadows, headings, footer |
| `ink` | `#2A1740` | Body text |
| `muted` | `#5E5470` | Secondary text |

### Surfaces

Each section uses **one** surface class. Components use the semantic utilities (`bg-surface`, `bg-surface-raised`, `text-fg`, `text-fg-muted`, `text-accent`, `bg-accent`, `text-accent-contrast`, `border-line`, `border-outline`), so they adapt to any surface automatically.

| Class | Background | Raised | Accent | Use |
| --- | --- | --- | --- | --- |
| `surface-base` | ivory | white | violet | Default, hero, page headers |
| `surface-paper` | white | ivory | violet | Content sections |
| `surface-lilac` | lilac | white | violet | Technical focus, earlier projects |
| `surface-butter` | butter | white | violet | Contact invitation |
| `surface-plum` | plum | `#3B2559` | marigold | Footer only |

**Homepage rhythm:** ivory hero → white about → lilac technical focus → ivory projects → white experience → butter contact → plum footer.

### Measured contrast (WCAG 2.x)

| Pair | Ratio | Level |
| --- | --- | --- |
| Ink on ivory | 15.61:1 | AAA |
| Muted on ivory | 6.79:1 | AA |
| Violet on ivory | 7.34:1 | AAA |
| Muted on white | 7.05:1 | AAA |
| Ink on lilac | 14.06:1 | AAA |
| Muted on lilac | 6.11:1 | AA |
| Violet on lilac | 6.61:1 | AA |
| Muted on butter | 6.40:1 | AA |
| Violet on butter | 6.92:1 | AA |
| White text on violet | 7.62:1 | AAA |
| White text on violet-deep | 9.77:1 | AAA |
| Ink text on marigold | 9.03:1 | AAA |
| Ivory on plum | 14.92:1 | AAA |
| Lilac text (`#D9C8F2`) on plum | 9.96:1 | AAA |
| Marigold on plum | 8.63:1 | AAA |
| Muted (plum surface) on plum-raised | 8.46:1 | AAA |

The project panel combinations (plum on marigold, white on violet, plum on lilac, marigold on plum) are 7.6:1 or higher.

## 4. Signature details

- **Woven stripe** (`stripe` utility): a band at the top of the header, the footer and key cards, and a 60px mark before each eyebrow label. Decorative and `aria-hidden`.
- **Highlight** (`highlight` utility): a marigold band behind one phrase of the hero headline only.
- **Stamp shadows:** `shadow-stamp` (4px plum) on primary buttons, which press in on click, and `shadow-stamp-lg` (8px plum) on cards. Lilac, violet or marigold variants mark emphasis (featured project, experience).
- **Outlines:** cards and buttons use a 2px `border-outline` (plum).
- **Project panels:** colour-blocked graphics that cycle marigold → violet → lilac → plum (`src/lib/project-tone.ts`), with a numbered label, a dot pattern (`dot-pattern` utility) and the project monogram. They are labelled on the page as illustrative, never screenshots, and hidden from assistive technology.
- **Navigation:** the current page shows as a violet pill (`aria-current="page"`), with nested routes matching their section.
- **Bullets:** small rotated violet squares.

## 5. Layout and spacing

- **Spacing:** Tailwind's 4px scale. Section rhythm is `py-section` = `clamp(4rem, 8vw, 7.5rem)`.
- **Widths:** `max-w-content` (72rem); `max-w-prose-narrow` (44rem) for reading.
- **Gutters:** `px-4 sm:px-6 lg:px-8` via `Container`.
- **Radii:** `rounded-xl` for buttons, `rounded-2xl`/`rounded-3xl` for cards, `rounded-full` for pills and tags.
- **Breakpoints:** Tailwind defaults (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem). Design mobile-first.

## 6. Accessibility

- **Focus:** a 2px `:focus-visible` outline in the surface accent (violet, or marigold on plum), offset by 3px. It is at least 7:1 against every background.
- **Reduced motion:** smooth scrolling only under `prefers-reduced-motion: no-preference`. Under `reduce`, transitions (button press and card lift) are effectively turned off.
- **Decorative elements** (stripes, panels, dots) are `aria-hidden`. Status and meaning are always also conveyed as text.

## 7. Open decisions

1. **Photo:** none for now. A real photo can be added to `public/images/` and placed in the hero or on the About page.
