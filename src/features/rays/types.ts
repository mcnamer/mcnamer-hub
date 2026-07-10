/**
 * THE RAY ANATOMY — a template of *meaning*, not layout. Every ray runs the
 * same six movements (Arrival → Problem → Guide → Path → Proof → Door) in its
 * own wavelength; identical skeleton, completely different flesh. A future
 * sixth business inherits this anatomy on day one by declaring a wavelength, a
 * day-night position, and this content shape.
 *
 * Copy discipline holds: headlines short, one idea per movement, evidence over
 * adjective, no ask without proof within a scroll.
 */

import type { Wavelength } from "@/lib/design/wavelengths";
import type { DayNight } from "@/lib/design/daynight";

export interface RaySubPath {
  label: string;
  blurb: string;
  href: string;
  /** A kinship/priority signal, e.g. "For those who served." */
  signal?: string;
}

export interface RayStep {
  title: string;
  body: string;
}

export interface RayFigure {
  figure: string;
  context: string;
}

export interface RayContent {
  /** Matches the wavelength slug (real-estate, mortgage, …). */
  slug: string;
  wavelength: Wavelength;
  /** The ray's ambient daylight position (AutismWorks is `day`; others darker). */
  dayNight: DayNight;
  business: string;
  /** SEO/meta description for this ray. */
  metaDescription: string;

  arrival: {
    eyebrow: string;
    headline: string;
    sub: string;
    /** Optional sub-path doors shown in Arrival (Real Estate splits three ways). */
    subPaths?: RaySubPath[];
  };
  problem: {
    headline: string;
    body: string;
  };
  guide: {
    headline: string;
    body: string;
    credentials: string[];
  };
  path: {
    headline: string;
    steps: RayStep[];
  };
  proof: {
    headline: string;
    figures: RayFigure[];
    quote?: { text: string; cite: string };
  };
  door: {
    headline: string;
    body: string;
    cta: { label: string; href: string };
    /** AutismWorks reframes the door as joining, never closing a sale. */
    posture?: "consult" | "join" | "purchase";
  };
}
