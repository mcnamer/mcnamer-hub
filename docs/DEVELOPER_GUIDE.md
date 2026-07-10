# Developer Guide

How the codebase is organized, the conventions it holds, and how to extend it
without drifting from the constitution.

## Architecture at a glance

Three ideas govern everything:

1. **The spine and the rays are decoupled.** The spine (homepage + Story, Proof,
   Insights, Connect) is white light. Each ray is a wavelength. A ray can deepen
   tenfold without touching another.
2. **Color flows down from context, never up from a component.** A component
   reads `--wave`; it never hard-codes a hex. The active wavelength is published
   by whichever `Section` is most in view.
3. **Inheritance is two declarations.** A surface declares a **wavelength** and a
   **day-night position**; field, ink, grain, permitted tones, and carried-light
   all follow.

## Folder structure

```
src/
├── app/                         # App Router — routes only, thin
│   ├── layout.tsx               # Root: providers, nav shell, footer, schema
│   ├── template.tsx             # Per-navigation crossfade
│   ├── page.tsx                 # Homepage — assembles the seven movements
│   ├── globals.css              # The CSS half of the constitution (@theme)
│   ├── [ray]/                   # Dynamic ray route (SSG from the registry)
│   │   ├── page.tsx
│   │   └── [sub]/page.tsx       # Sub-path route (depth law: max 2 refractions)
│   ├── story|proof|insights/    # Spine pages
│   ├── connect/                 # The Door (Server Action + loading skeleton)
│   ├── sitemap.ts robots.ts manifest.ts icon.svg
│   └── not-found.tsx
├── components/
│   ├── primitives/              # Tier 1–2: light-line, button, proof-atom, …
│   ├── navigation/              # Prism Bar, Refractor, Thread, scroll progress
│   ├── motion/                  # Providers, verbs, pointer-light, calm toggle
│   ├── layout/                  # Section, Footer
│   ├── home/                    # Tier 3: the seven homepage movements
│   └── seo/                     # JsonLd
├── features/                    # Feature-based domains
│   ├── rays/                    # The six-movement ray anatomy + content registry
│   ├── connect/                 # Contact schema, Server Action, form
│   └── insights/                # Signal data + ray filter explorer
└── lib/
    ├── design/                  # tokens: wavelengths, daynight, motion
    ├── constants/               # site config, spine content
    ├── seo/                     # schema.org, metadata helpers
    └── utils/                   # cn()
```

**Rule of thumb:** `app/` holds routes and is thin. Real UI lives in
`components/` (cross-cutting) and `features/` (domain). `lib/` holds no JSX.

## The rendering model

- **Server Components by default.** Pages, movements that don't animate, and all
  content are server-rendered. This is a hard requirement: the film must be a
  legible document for crawlers and screen readers (Phase 6 law).
- **Client Components only where interaction lives** — anything importing Framer
  Motion, using hooks, or reading a provider. They are marked `"use client"` and
  kept as leaves.
- **The providers** (`MotionProvider`, `SurfaceProvider`) wrap the tree once in
  `layout.tsx`. Server components render freely inside them.

## The two providers

| Provider | Owns | Reads |
| --- | --- | --- |
| `MotionProvider` | Whether motion may run (OS reduced-motion + Calm Motion toggle) | `useMotion()` |
| `SurfaceProvider` | The live day-night + wavelength of the dominant `Section`; writes `--field`, `--ink-on-field`, `--wave`, `--wave-text`, `--carried-light` to `:root` | `useSurface()` |

Every animated component asks `useMotion()` first and renders a still, legible
fallback when motion is off. **Never** animate without this check.

## Adding a new ray (a weekend of composition)

1. Add the wavelength to `src/lib/design/wavelengths.ts` (display + text tone,
   door verb, proof atom) and to `WAVELENGTH_ORDER`. Add its CSS custom
   properties to `@theme` in `globals.css`.
2. Verify contrast (see [DESIGN_TOKENS.md](DESIGN_TOKENS.md#contrast-law)).
3. Write one content file in `src/features/rays/content/<slug>.ts` to the
   `RayContent` shape.
4. Register it in `src/features/rays/content/index.ts`.

That's it. The route, the Refractor, the Movement V band stack, the footer, the
sitemap, and the SEO all absorb it — no structural change. This is
_amendment over erosion_: the future can add, but it cannot drift.

## Adding a spine page

Create `src/app/<slug>/page.tsx`, export `metadata` via `pageMetadata(...)`,
wrap content in one or more `<Section>` elements declaring a day-night position,
and register the page in `SPINE_PAGES` (`src/lib/constants/site.ts`) so it
appears in navigation and the sitemap.

## Conventions

- **Copy is data.** Words live in `lib/constants/content.ts` or a ray's content
  file, never inline in JSX. Headlines ≤ 6 words; context lines one sentence.
- **Class composition** goes through `cn()`.
- **No magic hexes in components.** Reach for a token (`var(--wave)`,
  `bg-field-navy`). If a value isn't a token, it probably shouldn't exist.
- **Accessibility is not optional.** Every interactive element has a focus twin
  and a label; every colored signal is paired with text or position.
- **Strict typing.** `noUncheckedIndexedAccess` is on — guard array access.

## Scripts & tooling

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build |
| `npm run start` | Serve the build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Run `typecheck` and `lint` before every commit; both are clean on `main`.
