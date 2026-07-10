# Animation System

_Motion is never a performance; it is physics. When motion is noticed, it has
failed. When it is felt, it has worked._

Tokens live in `src/lib/design/motion.ts` (JS) and `globals.css` (CSS). The
implementation lives in `src/components/motion/` and the primitives.

---

## The grammar — five verbs, only five

If a proposed animation cannot be named with one of these, it does not ship.

| Verb | Meaning | Where |
| --- | --- | --- |
| **Draw** | Light traces a path into existence | Light-lines, icons, ledger-rules, form underlines. Always along reading direction, always finishes — never loops. |
| **Bloom** | Luminosity arriving (change of light, not position) | Photo exposure-settles, elevation, hover warmth, dawn. Replaces every fade-in. |
| **Fill** | Wavelength flooding a bounded shape from its light source | Buttons from the left edge, bands from the light-line. Always has a directional origin. |
| **Settle** | Displacement resolving into stillness | Parallax, hover lift. The only verb permitted to move things through space; token-capped; always decelerates. **No bounce, ever.** |
| **Refract** | The world-change | Spine↔ray transitions, the Movement II split, the Refractor opening. The sacred verb: one per user action, never ambient. |

**Breath** is a sub-perceptual sixth layer: the 4s ±2% luminosity cycle, aurora
drift, pointer-light. Never triggered, never stops — the pulse between
interactions.

---

## Motion tokens

| Token | Value | Use |
| --- | --- | --- |
| `tempo-breath` | 4000ms, sine, infinite | Ambient only |
| `tempo-settle` | 300ms / 600ms photographic, decelerate | All hovers, reveals, fills |
| `tempo-refraction` | 900ms, accelerate-through-middle | World-changes only |

**Distance caps (hard):** parallax 12px · hover lift 2px · band-open 12px ·
light-line extend 8px. Nothing on this site moves further than 12px.

Named eases and transitions are exported from `motion.ts` (`EASE`, `DURATION`,
`DISTANCE`, `TRANSITION`) so the film's timing is defined once.

---

## Scroll choreography — three laws

1. **The wheel belongs to the visitor.** No scroll-jacking, no trapped scroll.
   Choreography binds to scroll _position_ (`useScroll` + `useTransform`) —
   scrub forward, the film advances; scrub back, it rewinds. See
   `MovementRefraction`.
2. **Trigger zones, not points.** Every reveal completes across ~20% viewport
   height (`viewport={{ margin: "0px 0px -20% 0px" }}`).
3. **Nothing waits below the fold broken.** Any element reached by deep link,
   find-in-page, or screen reader sits at 100% legibility. Entrance choreography
   is garnish on presence.

---

## The accessibility contract

Two inputs, one answer — `MotionProvider`:

- The OS `prefers-reduced-motion` signal (observed live).
- The ratified **"Calm motion"** footer toggle (persisted, ships visible).

When either says stop: Breath stops, Settle displacement zeroes, Draw becomes
instant presence, Fill/Bloom become crossfades, Refract becomes a 300ms
crossfade twin, the pointer-light retires. _Nothing lost but motion._

- **No motion flashes** — nothing exceeds three luminosity changes per second.
- **No interaction depends on hover** — every hover has a focus twin and a touch
  equivalent.
- **Keyboard users receive the same choreography** as pointer users, plus a
  designed focus ring (2px wavelength on daylight, warm gold on dark).

Every animated component calls `useMotion()` and renders a still, legible
fallback when motion is off. This is not optional — it is how the contract is
enforced in code.

---

## The performance contract

- Every verb executes on **transform and opacity exclusively.** No animated
  layout, no animated blur beyond the two glass surfaces, no animated
  box-shadow.
- Scroll binding via passive observation (`IntersectionObserver`, Framer
  `useScroll`), never scroll-event thrash.
- Grain is a static tile. The pointer-light is one composited layer following on
  a single `requestAnimationFrame` loop.
- **Zero bytes of motion media** — no Lottie, no video backgrounds, no canvas
  engines on the spine.
- **Budget:** full homepage film interactive < 3s on mid-range mobile; 60fps
  sustained. If a choreography forces a choice between frame rate and flourish,
  the frame rate wins without a meeting.

---

## Transition architecture

| Transition | Behavior |
| --- | --- |
| Spine → ray | Destination light-line sweeps the viewport (tempo-refraction); environment re-tints through the sweep. No white flash, no spinner. |
| Ray → spine | Reverse tint — color returning to white light; coming home reads as re-convergence. |
| Ray → ray | Light re-converges to white for 150ms mid-sweep before splitting into the new wavelength — all rays pass through the source. |
| Within a ray | No Refract — Bloom and Settle only. World-changes are for worlds. |

The `SurfaceProvider`'s 700ms field crossfade implements the tint change;
`template.tsx` provides the restrained per-navigation Bloom.
