import type { RayContent } from "../types";

/**
 * LEADS — the violet ray. The sprinter: problem, mechanism, proof, price, door.
 * Momentum and modern energy — the most product-like offer, in a Stripe-
 * product-page register. Its buyer wants the sprint, so this ray is the leanest.
 */
export const leads: RayContent = {
  slug: "leads",
  wavelength: "violet",
  dayNight: "dusk",
  business: "Done For You Leads",
  metaDescription:
    "Done For You Leads — one clear offer, one direct door. A qualified-lead engine for agents who want the pipeline handled, not another dashboard to babysit.",

  arrival: {
    eyebrow: "Done For You Leads",
    headline: "Fill your pipeline.",
    sub: "One clear offer. Qualified leads, handled — so you can do the work you're actually good at.",
  },
  problem: {
    headline: "An empty pipeline is a full-time job.",
    body: "Prospecting eats the hours you should spend closing. Most 'lead gen' hands you a dashboard and a bill. You wanted deals, not homework.",
  },
  guide: {
    headline: "Done for you means done for you.",
    body: "Built on the same operator experience behind the coaching and the real estate — a system that produces qualified conversations, not raw lists. You get the pipeline; the machinery is our problem.",
    credentials: [
      "Qualified conversations, not raw lists",
      "Run by operators who close, not vendors",
      "Transparent price, transparent mechanism",
      "One direct door — no maze",
    ],
  },
  path: {
    headline: "How it works.",
    steps: [
      { title: "The mechanism", body: "We source and qualify; you receive ready conversations." },
      { title: "The handoff", body: "Leads arrive with context, routed to you the moment they're warm." },
      { title: "The result", body: "You spend your time closing, not chasing." },
    ],
  },
  proof: {
    headline: "Simple, and it works.",
    figures: [
      { figure: "1", context: "Offer, one price, one door — no upsell maze." },
      { figure: "24hr", context: "Warm leads routed while they're still warm." },
    ],
  },
  door: {
    headline: "See the offer.",
    body: "Clear price, clear mechanism, clear result. If it fits, you'll know in a minute.",
    cta: { label: "See the offer", href: "/connect?intent=leads" },
    posture: "purchase",
  },
};
