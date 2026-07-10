import type { Wavelength } from "@/lib/design/wavelengths";

/**
 * SIGNAL ENTRIES — the living layer's seed. In production these pour in from the
 * existing content engines (the 365-topic real estate calendar, the AutismWorks
 * planner, Mortgage Matters, "Autism, Answered") through the transcription →
 * summary → schema pipeline. Here is a representative slice so the ray filter is
 * demonstrably real. Internal linking follows the prism: each links up its ray.
 */

export interface SignalEntry {
  slug: string;
  title: string;
  summary: string;
  ray: Wavelength;
  kind: "video" | "article";
  readingTime: string;
}

export const SIGNAL_ENTRIES: readonly SignalEntry[] = [
  {
    slug: "va-loan-kitsap-what-agents-miss",
    title: "The VA-loan detail most Kitsap agents miss",
    summary:
      "Why the appraisal timeline trips up PCS moves — and how to plan around it before you write an offer.",
    ray: "amber",
    kind: "video",
    readingTime: "6 min watch",
  },
  {
    slug: "stale-listing-diagnostic",
    title: "Your listing isn't overpriced. It's mistold.",
    summary:
      "A diagnostic walk-through of the three things that actually stall a listing, none of which is the number.",
    ray: "amber",
    kind: "article",
    readingTime: "5 min read",
  },
  {
    slug: "reading-a-rate-lock",
    title: "How to read a rate lock without the jargon",
    summary:
      "The three lines on the sheet that matter, and the ones designed to make you feel lost.",
    ray: "azure",
    kind: "article",
    readingTime: "4 min read",
  },
  {
    slug: "plateau-to-authority",
    title: "From plateau to authority: the first move",
    summary:
      "The single operational change that separates agents who scale from agents who stall.",
    ray: "indigo",
    kind: "video",
    readingTime: "9 min watch",
  },
  {
    slug: "qualified-vs-raw-leads",
    title: "Qualified conversations beat raw lists every time",
    summary:
      "Why volume is a vanity metric, and what to measure instead when you buy leads.",
    ray: "violet",
    kind: "article",
    readingTime: "3 min read",
  },
  {
    slug: "autism-answered-first-questions",
    title: "Autism, Answered: the first questions parents ask",
    summary:
      "Plain, respectful answers to the questions that come up at midnight — no jargon, no judgment.",
    ray: "teal",
    kind: "video",
    readingTime: "8 min watch",
  },
  {
    slug: "person-first-language",
    title: "Why person-first language changes everything",
    summary:
      "Tyler McNamer on the difference between a condition to manage and a person to understand.",
    ray: "teal",
    kind: "article",
    readingTime: "5 min read",
  },
];
