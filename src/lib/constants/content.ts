/**
 * SPINE CONTENT — the words of the homepage film.
 * Copy is data: headlines ≤6 words, context lines one sentence, evidence over
 * adjective. Editing the film's language happens here, never in JSX.
 */

/** Movement III — The Record. Evidence, never adjectives. */
export interface ProofFigure {
  readonly figure: string;
  readonly context: string;
}

export const RECORD_FIGURES: readonly ProofFigure[] = [
  {
    figure: "23 years",
    context: "Turning what I know into what people become, in Washington State.",
  },
  {
    figure: "500+",
    context: "Properties — families placed, not commissions chased.",
  },
  {
    figure: "$50M+",
    context: "In short sales, beginning in 2003 — saving families, not selling them.",
  },
  {
    figure: "U.S. Navy",
    context: "Veteran. The discipline came before the deals.",
  },
] as const;

/** Movement II — the thesis, resolved. */
export const THESIS = {
  headline: "One light. Five ways forward.",
  sub: "Twenty-three years of turning what I know into what people become.",
} as const;

/** Movement IV — The Man triptych. */
export const TRIPTYCH = {
  eyebrow: "The man behind the record",
  panels: [
    {
      key: "professional",
      title: "The professional",
      body: "Twenty-three years in the field. Five businesses built on the same principle: never sell someone what isn't right for them.",
    },
    {
      key: "father",
      title: "The father",
      body: "Co-founder of AutismWorks with his son Tyler McNamer — author of Population: ONE and Becoming ONE — proof that lived experience changes what a business can be.",
      teal: true,
    },
    {
      key: "man",
      title: "The man",
      body: "Faith, traditional values, and the Puget Sound outdoors. Certainty without volume.",
    },
  ],
  pullQuote:
    "I've spent my life learning things the hard way so the people I serve don't have to.",
} as const;

/** Movement VI — The Mission (AutismWorks solo). */
export const MISSION = {
  eyebrow: "The mission",
  headline: "Helping individuals with autism change the world.",
  body: "AutismWorks began at home. Tyler McNamer — author, co-founder, and the reason this work is personal — leads a community built on person-first respect, not pity. Population: ONE.",
  attribution: "Tyler McNamer · author & co-founder",
} as const;

/** Movement VII — The Door intent router. */
export interface Intent {
  readonly id: string;
  readonly label: string;
  readonly wavelength: "amber" | "azure" | "indigo" | "violet" | "teal" | "spine";
  readonly href: string;
  readonly nextStep: string;
}

export const INTENTS: readonly Intent[] = [
  {
    id: "buy-sell",
    label: "I want to buy or sell a home",
    wavelength: "amber",
    href: "/real-estate",
    nextStep: "Book a no-pressure consult",
  },
  {
    id: "mortgage",
    label: "I need a mortgage",
    wavelength: "azure",
    href: "/mortgage",
    nextStep: "Walk the lending process",
  },
  {
    id: "agent",
    label: "I'm an agent who wants to grow",
    wavelength: "indigo",
    href: "/coaching",
    nextStep: "See the transformation record",
  },
  {
    id: "leads",
    label: "I need more qualified leads",
    wavelength: "violet",
    href: "/leads",
    nextStep: "See the offer",
  },
  {
    id: "parent",
    label: "I'm a parent seeking support",
    wavelength: "teal",
    href: "/autism-works",
    nextStep: "Enter the community",
  },
  {
    id: "other",
    label: "Something else",
    wavelength: "spine",
    href: "/connect",
    nextStep: "Tell me what you need",
  },
] as const;
