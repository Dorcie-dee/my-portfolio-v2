# Design system foundation

Status: **initial draft.** Refine it before page implementation begins.

All tokens are defined in [`src/app/globals.css`](../src/app/globals.css). Fonts are loaded in [`src/lib/fonts.ts`](../src/lib/fonts.ts).

## 1. Hybrid surfaces

Pages alternate dark and light sections. This is a layout choice, not a dark mode, so there is no theme toggle and no `prefers-color-scheme` switching.

Each section declares **one** surface class:

| Class | Use |
| --- | --- |
| `surface-light` | Default (also applied to `<body>` and `:root`). Warm off-white. |
| `surface-dark` | Deep navy feature sections |
| `surface-muted` | Neutral grey secondary sections |

A surface class sets the background, text colour, `color-scheme` (for native scrollbars and controls) and a set of CSS variables. Components use **semantic** utilities that read those variables, so the same component renders correctly on any surface:

```tsx
<section className="surface-dark py-section">
  <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
    <h2 className="text-headline text-fg">…</h2>
    <p className="text-fg-muted">…</p>
    <a className="text-accent">…</a>
  </div>
</section>
```

Surfaces can be nested. For example, a `surface-dark` card inside a light section works without any changes.

## 2. Colour

### Semantic tokens (use these in components)

| Utility | Light | Muted | Dark |
| --- | --- | --- | --- |
| `bg-surface` | `#FAF8F3` | `#EEECE7` | `#0B1220` |
| `bg-surface-raised` | `#FFFFFF` | `#F7F6F2` | `#131C2E` |
| `text-fg` | `#111827` | `#111827` | `#F5F3EE` |
| `text-fg-muted` | `#525B6B` | `#525B6B` | `#A3ACBD` |
| `text-accent` / `bg-accent` | `#3F6212` (deep green) | `#3F6212` | `#B5E655` (lime) |
| `text-accent-contrast` (text on accent) | `#FAF8F3` | `#FAF8F3` | `#0B1220` |
| `border-line` | `#D6D3CC` | `#D6D3CC` | `#22304A` |

The accent changes per surface on purpose. Lime on off-white is about 1.4:1, which fails WCAG, so light surfaces use a deep green from the same hue family.

### Raw palette

Available as utilities (for example `bg-navy-950`), but use them only when a semantic token does not fit:

`navy-950 #0B1220`, `navy-900 #131C2E`, `navy-800 #22304A`, `navy-300 #A3ACBD`, `cream-50 #FAF8F3`, `sand-50 #F7F6F2`, `sand-100 #EEECE7`, `sand-300 #D6D3CC`, `ink-900 #111827`, `ink-600 #525B6B`, `accent-lime #B5E655`, `accent-green #3F6212`.

### Measured contrast (WCAG 2.x)

| Pair | Ratio | Level |
| --- | --- | --- |
| Dark: text on background | 16.88:1 | AAA |
| Dark: muted text on background | 8.20:1 | AAA |
| Dark: accent on background | 12.85:1 | AAA |
| Dark: muted text on raised | 7.45:1 | AAA |
| Light: text on background | 16.71:1 | AAA |
| Light: muted text on background | 6.45:1 | AA |
| Light: accent on background | 6.67:1 | AA |
| Muted: text on background | 15.03:1 | AAA |
| Muted: muted text on background | 5.80:1 | AA |
| Muted: accent on background | 5.99:1 | AA |
| Lime button: navy text | 12.85:1 | AAA |
| Green button: cream text | 6.67:1 | AA |

Borders (`border-line`) are decorative and are not required to meet the 3:1 non-text contrast ratio. Do not use a border as the only indicator of state.

## 3. Typography

- **Sans:** Geist (`font-sans`, the default)
- **Mono:** Geist Mono (`font-mono`), for code, technical labels and metadata

Both are self-hosted through `next/font` with `display: swap`.

**Scale:** use Tailwind's default scale (`text-sm` … `text-5xl`) for body and UI text, plus two fluid sizes for large headings:

| Utility | Size | Line height | Tracking |
| --- | --- | --- | --- |
| `text-display` | `clamp(2.5rem, 4vw + 1.5rem, 4.5rem)` | 1.05 | -0.025em |
| `text-headline` | `clamp(1.875rem, 2vw + 1.25rem, 3rem)` | 1.15 | -0.02em |

## 4. Spacing and layout

- **Spacing:** Tailwind's 4px-based scale.
- **Section rhythm:** `py-section` = `clamp(4rem, 8vw, 8rem)`.
- **Content width:** `max-w-content` = 72rem.
- **Reading width:** `max-w-prose-narrow` = 44rem.
- **Horizontal gutter (convention):** `px-4 sm:px-6 lg:px-8`.
- **Breakpoints:** Tailwind defaults (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem). Design mobile-first.

## 5. Accessibility

- **Focus:** all focusable elements get a 2px `:focus-visible` outline in the surface's accent colour, offset by 3px. The accent is at least 6:1 against every background. Do not remove outlines without providing an equal or stronger alternative.
- **Reduced motion:** smooth scrolling is enabled only under `prefers-reduced-motion: no-preference`. Under `reduce`, animations and transitions are effectively turned off globally.
- **Selection:** text selection uses the accent and accent-contrast pair.

## 6. Decisions

### Confirmed

1. **Accent colours.** Lime `#B5E655` on dark surfaces and deep green `#3F6212` on light and muted surfaces.
2. **Existing identity.** Echo it subtly without copying the old portfolio design.
3. **Default Tailwind palette.** It stays available, for example for status colours. Use the semantic tokens for the main interface.

### Still open

1. **Identity details.** Decide which specific elements to echo, such as a colour, monogram, photo treatment or tone of voice. Decide this with the navigation and hero work.
2. **Section order.** Decide which content gets dark, light or muted surfaces once the homepage structure is agreed.
3. **Component radius and elevation.** Set border-radius and shadow tokens when the first UI primitives are built.
