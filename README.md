# Project Olympus — mcnamer.com

**The definitive digital identity for Jody McNamer.**
_One light. Five ways forward._

This is not a marketing website. It is an authored work — a cinematic, editorial
experience engineered to the standard of a world-class product company. One
proven, principled man whose expertise refracts, through trust, into five ways
of turning what he knows into what other people become.

- **The white light** is Jody — undivided credibility, conviction, and care.
- **The prism** is the moment of contact — this site.
- **The five rays** are the businesses, each a color of the same light.
- **The medium is trust** — the only substance through which the light travels.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router, React Server Components, Server Actions) |
| Language | **TypeScript** (strict, `noUncheckedIndexedAccess`) |
| UI runtime | **React 19** |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) |
| Motion | **Framer Motion** (transform/opacity only) |
| Icons | **lucide-react** (1.5px line, traced-by-light) |
| Forms | **React Hook Form + Zod** (shared client/server schema) |
| Fonts | **next/font** — Inter (The Hand) + Source Serif 4 (The Voice) |
| Analytics | **Vercel Analytics + Speed Insights** |
| SEO | Native Metadata API, Schema.org JSON-LD, sitemap, robots |

## Quickstart

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build (static + SSG + one dynamic route)
npm run start      # serve the production build
npm run lint       # ESLint (next/core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
```

> Node ≥ 20.11. Fonts are fetched at build time by `next/font`.

## What's built

**The spine (mcnamer.com):**

- **`/` — "The Light"** — the flagship film, seven movements, one continuous
  scroll-as-dolly space.
- **`/story` — "One Light"** — chaptered long-form editorial (the deepest trust
  asset).
- **`/proof` — "The Record"** — the standalone evidence layer (figures, case
  study, testimonials).
- **`/insights` — "The Signal"** — the living layer, filterable by ray.
- **`/connect` — "The Door"** — one unified, intent-routed contact surface
  (Server Action + validated form).

**The five rays** (`/real-estate`, `/mortgage`, `/coaching`, `/leads`,
`/autism-works`) each run the same six-movement anatomy — Arrival → Problem →
Guide → Path → Proof → Door — in their own wavelength. Real Estate splits into
sub-paths (`/real-estate/va`, `/sell`, `/listings`).

## The constitution

This codebase _is_ the design system. Every rule the blueprint ratified is
encoded as a typed token or a machine-checkable structure, not left to
discipline:

- **Color** — one field (navy), one metal (gold, three jobs only), five
  wavelengths, two daylights. See [`docs/DESIGN_TOKENS.md`](docs/DESIGN_TOKENS.md).
- **Motion** — five verbs (Draw, Bloom, Fill, Settle, Refract) plus Breath.
  See [`docs/ANIMATION_SYSTEM.md`](docs/ANIMATION_SYSTEM.md).
- **Inheritance** — a new business is onboarded by declaring exactly two things:
  **a wavelength and a day-night position.** Everything else is inherited.

New contributors inherit judgment, not just files. Read the docs below before
composing.

## Documentation

| Guide | What it covers |
| --- | --- |
| [Developer Guide](docs/DEVELOPER_GUIDE.md) | Architecture, folder structure, conventions, adding a ray |
| [Component Guide](docs/COMPONENT_GUIDE.md) | The four component tiers, every primitive and molecule |
| [Design Tokens](docs/DESIGN_TOKENS.md) | Color, type, spacing, the permission architecture |
| [Animation System](docs/ANIMATION_SYSTEM.md) | The five verbs, motion tokens, the accessibility contract |
| [Deployment](docs/DEPLOYMENT.md) | Vercel, environment variables, CI, going live |

## Principles held throughout

- **Server-rendered first.** The film is an honest document — real headings in
  real order — legible to crawlers and screen readers before a byte of motion
  JS. The accessibility law and the SEO gift are the same law.
- **Nothing waits below the fold broken.** Every element is 100% legible at
  rest; entrance choreography is garnish on presence, never a precondition.
- **WCAG 2.2 AA is the floor.** Certified contrast, no color-alone meaning, full
  keyboard choreography, reduced-motion twins, a visible "Calm motion" toggle.
- **60fps or it doesn't ship.** Every verb runs on transform and opacity only.
- **The site is silent.** No UI sound, ever.

---

_© 2026 Jody McNamer — one light, five ways forward._
