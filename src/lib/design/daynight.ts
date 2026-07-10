/**
 * THE DAY–NIGHT AXIS — the second half of the inheritance contract.
 *
 * "Proof at dusk, people in daylight, doors at nightfall."
 *
 * Every page template and every Movement declares a position on this axis.
 * The position selects the field color, the ink color, whether grain is
 * present, and whether carried light (the pointer-light) may appear. A new
 * page inherits the entire environment by declaring exactly two things: a
 * wavelength and a day-night position (see wavelengths.ts).
 */

export type DayNight = "night" | "dusk" | "dawn" | "day";

export interface DayNightDefinition {
  readonly id: DayNight;
  /** Background field token name (maps to a CSS custom property). */
  readonly field: string;
  /** Text/ink token appropriate for the field. */
  readonly ink: string;
  /** Whether the fine dark grain material is present. */
  readonly grain: boolean;
  /** Whether carried light (pointer-light / scroll-light) is permitted. */
  readonly carriedLight: boolean;
  /** Whether this is a dark environment (drives focus-ring variant, etc.). */
  readonly dark: boolean;
}

export const DAY_NIGHT: Readonly<Record<DayNight, DayNightDefinition>> = {
  night: {
    id: "night",
    field: "var(--field-midnight)",
    ink: "var(--light-cream)",
    grain: true,
    carriedLight: true,
    dark: true,
  },
  dusk: {
    id: "dusk",
    field: "var(--field-navy)",
    ink: "var(--light-cream)",
    grain: true,
    carriedLight: true,
    dark: true,
  },
  dawn: {
    id: "dawn",
    field: "var(--field-dusk)",
    ink: "var(--light-cream)",
    grain: true,
    carriedLight: false,
    dark: true,
  },
  day: {
    id: "day",
    field: "var(--light-cream)",
    ink: "var(--ink)",
    grain: false,
    carriedLight: false,
    dark: false,
  },
} as const;

/**
 * The homepage's seven-movement day-night journey — the film's lighting plan.
 * Movement I opens in night; the field warms to full daylight by the Mission;
 * the Door returns to night. This is the choreography of light, tokenized.
 */
export const HOMEPAGE_LIGHTING: readonly DayNight[] = [
  "night", // I — The Aperture
  "night", // II — The Refraction
  "dusk", // III — The Record (proof at dusk)
  "day", // IV — The Man (people in daylight)
  "dusk", // V — The Five Ways
  "day", // VI — The Mission (warm cream)
  "night", // VII — The Door (doors at nightfall)
] as const;
