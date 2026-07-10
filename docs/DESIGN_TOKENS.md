# Design Tokens

_One field, one metal, five wavelengths, two daylights._

Tokens live in two mirrored places:

- **CSS** — `src/app/globals.css` (`@theme`) → Tailwind utilities + raw custom
  properties for runtime work.
- **TypeScript** — `src/lib/design/*` → the typed constitution the routing and
  motion systems read.

They must stay in sync. When you add a wavelength, edit both.

---

## The permission architecture

Every token declares **where it may appear**. These rules are the difference
between a system that ages like architecture and one that ages like a garage.

- **Gold's three jobs, and only three:** the ledger-rule under proof figures,
  the warm focus-ring variant on dark, and the mark itself. Gold is never a
  button, never a background, never decoration. Scarcity keeps it metal.
- **No wavelength is ever the sole carrier of meaning.** Every colored signal is
  paired with a label, position, or the Thread.
- **Glass is whitelisted to exactly two surfaces:** the scrolled Prism Bar and
  the Refractor. A third requires amending the constitution.
- **Exactly one centered movement per page** — the earned symmetry of arrival.
- **No gradients as decoration.** Gradients exist only as _light behavior_ (dawn
  transitions, wavelength floods).

---

## Color

### The Field (navy — dark surfaces never use gray)

| Token | Hex | Use |
| --- | --- | --- |
| `field-midnight` | `#0A1626` | Deepest space — Movements I, II, VII |
| `field-navy` | `#16304D` | Brand anchor — standard dark field, footer |
| `field-dusk` | `#22436B` | Elevated dark surfaces, Refractor tint base |
| `field-slate` | `#3A5678` | Borders + quiet structure on dark only |

### The Daylight (cream)

| Token | Hex | Use |
| --- | --- | --- |
| `light-cream` | `#FAF6EE` | The human field — Mvt IV, Story, AutismWorks |
| `light-paper` | `#FDFCF9` | Content surfaces on cream |
| `light-linen` | `#F1EAD9` | Recessed surfaces, 1px print rules |
| `ink` | `#1C2B3A` | Body text on daylight (~13.5:1 on cream) |

### The Metal

| Token | Hex | Sanctioned jobs |
| --- | --- | --- |
| `gold` | `#E0A93B` | Ledger-rule · warm focus ring on dark · the mark |
| `gold-deep` | `#8A6210` | The rare gold word on light (≥4.5:1 on cream) |

### The Five Wavelengths (display tone / text tone)

| Ray | Display | Text | Business |
| --- | --- | --- | --- |
| Amber | `#E89B4B` | `#7A5310` | Real Estate |
| Azure | `#4FA3E8` | `#175A93` | Mortgage |
| Indigo | `#8F8FF2` | `#453FBE` | Coaching |
| Violet | `#B07CE8` | `#6B21A8` | Leads |
| Teal | `#35C7B8` | `#0F766E` | AutismWorks |

AutismWorks' brand mark itself stays `#0D9488`. Amber is deliberately a
half-step warmer/deeper than brand gold — siblings, not twins.

### Contrast law

- **Display tones** are for large-text/graphical use on `field-midnight` /
  `field-navy` (all ≥ 3:1).
- **Text tones** are for body text on `light-cream` / `light-paper` (all ≥
  4.5:1). Teal `#0F766E` is the tightest of the family — re-verify on any new
  daylight surface.
- **Never** use a display tone for body text on daylight; use `--wave-text`.
- Reading surfaces run 12–14:1 — comfort while reading _is_ trust.

---

## The day-night axis

`night | dusk | dawn | day`, defined in `src/lib/design/daynight.ts`. A surface
declares one and inherits field, ink, grain, and carried-light. _Proof at dusk,
people in daylight, doors at nightfall._ The homepage's seven-movement lighting
plan is `HOMEPAGE_LIGHTING`.

---

## Typography

Two families, absolute division of labor: **the serif speaks, the sans works.**

- **The Voice** — Source Serif 4: headlines, heroic numerals, pull quotes.
- **The Hand** — Inter: all body, nav, labels, buttons, forms, captions.
- **The Murmur** — Inter small caps, 12–13px, +8% tracking: "BEGIN", ray names,
  eyebrows (`.murmur`).

### The scale (fluid, clamp-based)

| Step | Range | Use |
| --- | --- | --- |
| `display-hero` | 56→120px | Thesis, Record numerals |
| `display-1` | 40→72px | Movement headlines |
| `display-2` | 28→44px | Ray-movement headlines |
| `title` | 22→28px | Component headings |
| `body-large` | 18→20px | Standard narrative paragraph |
| `body` | 16px | UI and dense reference layers |
| `caption` | 13–14px | The murmur register |

Line-height: display 1.05–1.15, body 1.6 — nothing between. Measure never
exceeds 68 characters (`.prose`).

---

## Spacing

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`, plus the super-token
**`--breath`** (fluid 160→240px) — the inter-movement gap, the film's pacing
tunable in one place.

**Rule:** whitespace is bought from the top of the scale first. When cramped, the
fix is a larger token, not a smaller font.

---

## Grid

12-col desktop (1280px content in a 1440px stage) → 6 tablet → 4 mobile.
Editorial asymmetry is the system: narrative movements use 7/5 or 8/4 splits
(heavy side alternating); The Record uses 9/3; reference layers may be
symmetric. Exactly one centered movement per page.

---

## Lighting & depth — _depth is made of light, not shadow_

| Level | Spec |
| --- | --- |
| 0 — Field | The plane itself |
| 1 — Lift | +4% surface luminosity (row/band hover) |
| 2 — Presence | +8% luminosity + 1px wavelength rim (cards, panels) |
| 3 — Focus | +12% luminosity + full-perimeter rim (active, modals) |

One shadow exists in the whole system: a soft navy-tinted ambient under Level 3
on daylight only.
