/**
 * THE FIVE WAVELENGTHS — the spectral heart of the constitution.
 *
 * "One light. Five ways forward." Each business is a color of the same light.
 * A wavelength is never hard-coded into a component; it flows *down* from the
 * Movement/Surface that owns the context. This module is the single, typed
 * source of truth for that spectrum — every ray inherits from it, and a future
 * sixth business is added here (plus a day-night position) and nowhere else.
 *
 * See docs/DESIGN_TOKENS.md for the governance rules these types enforce.
 */

/** The stable identifier for each of the five rays. */
export type Wavelength = "amber" | "azure" | "indigo" | "violet" | "teal";

/** The spine itself carries no color — it is undivided white light. */
export type Spectrum = Wavelength | "spine";

export interface WavelengthDefinition {
  /** Machine key, also the CSS custom-property namespace (`--wave-amber`). */
  readonly id: Wavelength;
  /** The business this ray emanates from. */
  readonly business: string;
  /** URL segment on the spine (`/real-estate`). */
  readonly slug: string;
  /** Display tone: large type, light-lines, glow on dark fields (≥3:1). */
  readonly display: string;
  /** Text tone: body-size on daylight surfaces (≥4.5:1 on cream). */
  readonly text: string;
  /** The Movement V transformation headline — the door verb. */
  readonly door: string;
  /** A single proof-atom shown beside the door. */
  readonly proof: string;
  /** One-line description of the wavelength's meaning. */
  readonly meaning: string;
}

/**
 * The spectrum, ordered as it fans in Movement II — amber (closest to Jody's
 * gold) through teal (Tyler's established flag). Order is meaningful: it is the
 * refraction order and the Movement V band sequence.
 */
export const WAVELENGTHS: Readonly<Record<Wavelength, WavelengthDefinition>> = {
  amber: {
    id: "amber",
    business: "McNamer Real Estate",
    slug: "real-estate",
    display: "#E89B4B",
    text: "#7A5310",
    door: "Find home.",
    proof: "23 years · 500+ properties",
    meaning: "The home wavelength — closest to Jody's gold; the 23-year foundation.",
  },
  azure: {
    id: "azure",
    business: "One Real Mortgage",
    slug: "mortgage",
    display: "#4FA3E8",
    text: "#175A93",
    door: "Fund it wisely.",
    proof: "The fog of lending, cleared",
    meaning: "Clarity, calm, financial trust.",
  },
  indigo: {
    id: "indigo",
    business: "Agent Broker Coach",
    slug: "coaching",
    display: "#8F8FF2",
    text: "#453FBE",
    door: "Become the authority.",
    proof: "Agents into experts, at scale",
    meaning: "Depth, mastery, the mentor's color.",
  },
  violet: {
    id: "violet",
    business: "Done For You Leads",
    slug: "leads",
    display: "#B07CE8",
    text: "#6B21A8",
    door: "Fill your pipeline.",
    proof: "One clear offer, one direct door",
    meaning: "Momentum, modern energy — the most product-like offer.",
  },
  teal: {
    id: "teal",
    business: "AutismWorks",
    slug: "autism-works",
    display: "#35C7B8",
    text: "#0F766E",
    door: "Change the world.",
    proof: "Lived experience, person-first",
    meaning: "Growth, calm waters — Tyler's established flag.",
  },
} as const;

/** The AutismWorks brand mark is preserved exactly; it is not a wavelength tone. */
export const AUTISMWORKS_BRAND_MARK = "#0D9488" as const;

/** Ordered list for iteration (fan order = refraction order = band order). */
export const WAVELENGTH_ORDER: readonly Wavelength[] = [
  "amber",
  "azure",
  "indigo",
  "violet",
  "teal",
] as const;

export const WAVELENGTH_LIST: readonly WavelengthDefinition[] =
  WAVELENGTH_ORDER.map((id) => WAVELENGTHS[id]);

/** Resolve a ray by its URL slug (used by the ray route templates). */
export function wavelengthBySlug(
  slug: string,
): WavelengthDefinition | undefined {
  return WAVELENGTH_LIST.find((w) => w.slug === slug);
}
