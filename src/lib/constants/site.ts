/**
 * SITE CONFIGURATION — the spine's constants.
 * One source of truth for identity, spine pages, and navigation structure.
 */

import { WAVELENGTH_LIST } from "@/lib/design/wavelengths";

export const SITE = {
  name: "Jody McNamer",
  domain: "mcnamer.com",
  url: "https://mcnamer.com",
  thesis: "One light. Five ways forward.",
  tagline:
    "The proven guide who turns what he knows into what you become.",
  description:
    "Jody McNamer — U.S. Navy veteran, 23+ years in Washington State real estate, co-founder of AutismWorks. One proven, principled man whose expertise refracts into five ways of turning what he knows into what other people become.",
  locale: "en_US",
  author: "Jody McNamer",
} as const;

/** THE SPINE — the five undivided-light destinations. */
export interface SpinePage {
  readonly label: string;
  readonly subtitle: string;
  readonly href: string;
  readonly description: string;
}

export const SPINE_PAGES: readonly SpinePage[] = [
  {
    label: "The Story",
    subtitle: "One Light",
    href: "/story",
    description:
      "Long-form editorial: the Navy years, 2003 and the short-sale era, Tyler, faith, and the building of five businesses.",
  },
  {
    label: "Proof",
    subtitle: "The Record",
    href: "/proof",
    description:
      "The standalone evidence layer — numbers, history, testimonials, case studies, press. Cold steel.",
  },
  {
    label: "Insights",
    subtitle: "The Signal",
    href: "/insights",
    description:
      "The living layer — video and writing across all five businesses, filterable by ray.",
  },
  {
    label: "Connect",
    subtitle: "The Door",
    href: "/connect",
    description:
      "One unified contact surface that routes by intent. One door, many rooms.",
  },
] as const;

/**
 * THE PRISM BAR — the primary navigation model.
 * The five rays first (the businesses emanate from the source), then the two
 * standalone trust assets (Story, Proof), then the Door button (right).
 */
export const PRISM_BAR_RAYS = WAVELENGTH_LIST.map((w) => ({
  label: w.business.replace(/^McNamer /, "").replace(/^One Real /, ""),
  shortLabel: rayShortLabel(w.id),
  href: `/${w.slug}`,
  wavelength: w.id,
}));

function rayShortLabel(id: string): string {
  switch (id) {
    case "amber":
      return "Real Estate";
    case "azure":
      return "Mortgage";
    case "indigo":
      return "Coaching";
    case "violet":
      return "Leads";
    case "teal":
      return "AutismWorks";
    default:
      return id;
  }
}

/** Spine links surfaced in the Prism Bar (Story + Proof; Insights lives in the Refractor). */
export const PRISM_BAR_SPINE = [
  { label: "Story", href: "/story" },
  { label: "Proof", href: "/proof" },
] as const;

export const DOOR = {
  label: "Connect",
  href: "/connect",
} as const;
