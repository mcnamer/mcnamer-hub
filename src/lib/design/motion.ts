/**
 * MOTION TOKENS — "motion is never a performance; it is physics."
 *
 * The three tempos and the distance caps that govern every animation on the
 * site. Framer Motion transitions are built from these constants so the film's
 * pacing is tunable in exactly one place. Every token has a reduced-motion twin
 * (see components/motion). Distances are capped hard: nothing on this site
 * moves further than 12px.
 */

import type { Transition } from "framer-motion";

/** Cubic-bezier eases, expressed once. */
export const EASE = {
  /** Standard decelerate — everything that settles into stillness. */
  settle: [0.22, 1, 0.36, 1] as const,
  /** Photographic decelerate — the slow bloom of a print developing. */
  photographic: [0.16, 1, 0.3, 1] as const,
  /** Refraction — accelerates through the middle; world-changes only. */
  refraction: [0.65, 0, 0.35, 1] as const,
  /** Sine, for the ambient Breath. */
  sine: [0.37, 0, 0.63, 1] as const,
} as const;

/** Durations in seconds (Framer Motion's unit). */
export const DURATION = {
  breath: 4,
  settle: 0.3,
  photographic: 0.6,
  refraction: 0.9,
  /** The 150ms re-convergence when passing ray → ray through white. */
  reconverge: 0.15,
} as const;

/** Hard distance caps (px). A world of light and glass — no bounce, ever. */
export const DISTANCE = {
  parallax: 12,
  hoverLift: 2,
  bandOpen: 12,
  /** The light-line extension on hover/focus. */
  lineExtend: 8,
} as const;

/** The named Framer transitions, ready to spread into `transition={...}`. */
export const TRANSITION = {
  settle: {
    duration: DURATION.settle,
    ease: EASE.settle,
  } satisfies Transition,
  photographic: {
    duration: DURATION.photographic,
    ease: EASE.photographic,
  } satisfies Transition,
  refraction: {
    duration: DURATION.refraction,
    ease: EASE.refraction,
  } satisfies Transition,
} as const;

/** The reduced-motion twin: crossfade at settle tempo, zero displacement. */
export const REDUCED_TRANSITION = {
  duration: DURATION.settle,
  ease: EASE.settle,
} satisfies Transition;
