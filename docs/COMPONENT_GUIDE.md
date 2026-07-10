# Component Guide

Components are organized in four tiers. A component may **express** a wavelength,
but only a Movement (Tier 3) or Surface (Tier 4) **decides** which wavelength —
color flows down from context, never hard-coded.

---

## Tier 1 — Primitives

The atomic vocabulary. `src/components/primitives/`.

### `LightLine` — the atomic brand unit
One element carrying the prism metaphor everywhere: underline, divider, progress
indicator, nav accent. _The most repeated gesture is the identity._

```tsx
<LightLine draw responsive breath glow thickness={2} active />
```

| Prop | Effect |
| --- | --- |
| `draw` | Self-draws (scaleX 0→1) when scrolled into view |
| `breath` | Ambient ±luminosity at rest (retires under Calm Motion) |
| `responsive` | Brightens + extends on parent `.group` hover/focus |
| `active` | Steady burn — the "you are here" state inside a ray |
| `glow` | Static wavelength halo (dark fields only) |

Colour is always `var(--wave)`.

### `Button` — the one primary button
A quiet capsule that Fills with the contextual wavelength from its left edge;
press deepens the fill and drops the 2px lift. Disabled dims to 40% and loses
its light-line (_lightless = dormant_, never gray). Polymorphic: renders
`next/link` with `href`, otherwise a `<button>`. `magnetic` adds a ≤6px pull
toward the pointer (retires on touch / Calm Motion).

### `PrismMark` — the mark
The prism glyph (gold's third sanctioned job). White light enters, refracts,
leaves as five rays that self-draw on mount.

### `Counter`
A single 0.6s settle-count — _never a slot machine_. Parses the numeric core of
a figure (`$50M+`, `23 years`) and counts only that, preserving prefix/suffix.

### `Skeleton`
A loading placeholder that pulses luminosity (Breath) — never a sliding shimmer
bar (that would break the no-displacement law).

---

## Tier 2 — Molecules

Assembled from primitives. Each carries one meaning.

### `ProofAtom` — figure + context + gold ledger-rule
The sequence _is_ the meaning: the numeral settles its count, **then** the gold
rule Draws. Sizes: `hero` (Movement III scale) and `compact` (beside a Door).

### `PullQuote`
The rule Draws first, then the text Blooms — _the site breathes before someone
speaks._ `gold` swaps the accent from the contextual wavelength to gold.

### `Photo` — photo-with-settle
Real photography renders through `next/image` (AVIF/WebP, responsive, lazy).
Until `src` is wired, it renders a refined "light study" placeholder in the
surface's own light — never a gray box. **Alt text is required and written
editorially**: for a screen-reader visitor, the alt text _is_ the photography.

### `RayBand` — the door
The richest hover on the site: three verbs in 300ms — Fill floods from the
light-line, the band Settles open 12px, the arrow Draws 4px forward. Full-width
horizontal band; **never a card grid** (banned template-scent).

### `IntentRouter` — the master converter
Honest radio choices under the glass. Selecting an intent warms the surface
toward that wavelength and reveals the single next step. The one molecule
permitted to warm the field.

---

## Tier 3 — Movements

`src/components/home/` (the seven homepage movements) and
`src/features/rays/ray-page.tsx` (the six ray movements). Each carries a fixed
**entrance contract** and declares a day-night position + wavelength via
`<Section>`.

**Homepage:** Aperture · Refraction · Record · The Man · Five Ways · Mission ·
Door.
**Ray anatomy:** Arrival · Problem · Guide · Path · Proof · Door.

### `Section` — the movement wrapper
Renders a real `<section>` landmark with an accessible label, applies grain on
dark surfaces, and — while most in view — publishes its day-night + wavelength
to the `SurfaceProvider`, dawning the whole field to its lighting.

```tsx
<Section dayNight="dusk" wavelength="amber" label="The Record — the evidence">
  …
</Section>
```

---

## Tier 4 — Surfaces

Assembled pages in `src/app/**`. Surfaces choose content and compose Movements.
They never reach past a Movement to style a primitive directly.

---

## Motion components — `src/components/motion/`

| Component | Verb | Use |
| --- | --- | --- |
| `Bloom` | Bloom | Replaces every fade-in; luminosity + ≤12px settle |
| `Stagger` | Bloom (sequence) | Children arrive along reading direction |
| `PointerLight` | Breath | Carried light on night/dusk fields only |
| `CalmMotionToggle` | — | The ratified, always-visible footer switch |
| `MotionProvider` / `SurfaceProvider` | — | The two context authorities |

Every one of these checks `useMotion()` and degrades to still, legible content.

---

## Navigation — `src/components/navigation/`

| Layer | Component | Role |
| --- | --- | --- |
| 1 — Prism Bar | `PrismBar` | Conventional labeled bar; wavelength hairlines within; glass on scroll |
| 2 — Refractor | `Refractor` | Command-palette dialog; type-to-find; fully keyboard-native |
| 3 — Thread | `RayThread` | Position in a ray's six movements + the constant way home |

`NavigationShell` wires them together (⌘K / Ctrl-K summons the Refractor).
`ScrollProgress` is the sitewide progress light-line.

**System rule:** no interaction may be the only way to do something. Every
journey is completable without the Refractor.
