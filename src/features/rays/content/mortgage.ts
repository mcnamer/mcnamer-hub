import type { RayContent } from "../types";

/**
 * MORTGAGE — the azure ray. Clarity, calm, financial trust. The Problem names
 * the fog of lending honestly; the Path is the star — the process rendered as a
 * lit, numbered line the visitor walks.
 */
export const mortgage: RayContent = {
  slug: "mortgage",
  wavelength: "azure",
  dayNight: "dusk",
  business: "One Real Mortgage",
  metaDescription:
    "One Real Mortgage — the fog of lending, cleared. A calm, numbered path from pre-approval to close, and straight answers from people who've done it for decades.",

  arrival: {
    eyebrow: "One Real Mortgage",
    headline: "Fund it wisely.",
    sub: "Lending without the fog — a clear, numbered path from where you are to keys in hand.",
  },
  problem: {
    headline: "Lending is made to feel confusing. It isn't.",
    body: "Rate sheets, points, escrow, PMI — the jargon exists to make you feel like you need someone. You do need someone honest. You don't need to be kept in the dark.",
  },
  guide: {
    headline: "Straight talk, start to finish.",
    body: "Financing sits inside the same ecosystem as the real estate and the coaching — which means your loan officer and your agent are already speaking the same language, working the same result: the right home, funded on terms you understand.",
    credentials: [
      "Integrated with McNamer Real Estate",
      "Plain-language at every step",
      "VA, conventional, and first-time-buyer fluent",
      "Answers the same day, not the same week",
    ],
  },
  path: {
    headline: "The path, lit end to end.",
    steps: [
      { title: "Pre-approval", body: "Know your real number before you fall in love with a house." },
      { title: "The scenario", body: "We walk the options side by side — no surprises, no pressure." },
      { title: "The lock", body: "Rate secured, terms in writing, plainly explained." },
      { title: "The close", body: "Coordinated with your agent so nothing falls between the cracks." },
    ],
  },
  proof: {
    headline: "Calm is the proof.",
    figures: [
      { figure: "1", context: "Team, one language — lending and real estate aligned." },
      { figure: "23 years", context: "Of judgment behind every scenario." },
    ],
  },
  door: {
    headline: "Let's clear the fog.",
    body: "Tell me where you are and I'll show you the whole path — before you commit to anything.",
    cta: { label: "Walk the process", href: "/connect?intent=mortgage" },
    posture: "consult",
  },
};
