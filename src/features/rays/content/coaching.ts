import type { RayContent } from "../types";

/**
 * COACHING — the indigo ray. Depth, mastery, the mentor's color. Opens on
 * Renee's mirror — the plateau named without flattery. The longest Guide of any
 * ray (the product IS the mentor); the ecosystem itself appears as proof. The
 * Door is tiered: free resource → All-Access → Certified Investor Agent.
 */
export const coaching: RayContent = {
  slug: "coaching",
  wavelength: "indigo",
  dayNight: "dusk",
  business: "Agent Broker Coach",
  metaDescription:
    "Agent Broker Coach — for the competent agent who's stuck. A real mentor who has done it at scale, not another course-seller. Free resources, All-Access, and the Certified Investor Agent program.",

  arrival: {
    eyebrow: "Agent Broker Coach",
    headline: "Become the authority.",
    sub: "For the agent who's good, stuck, and tired of courses that promise the world and teach nothing.",
  },
  problem: {
    headline: "You're competent. You've plateaued. You know it.",
    body: "You've bought the courses. You've watched the gurus. And you're still doing the same volume you did two years ago, wondering whether the next mentor is real or just better at selling mentorship.",
  },
  guide: {
    headline: "A mentor, not a course-seller.",
    body: "The difference is evidence. Jody didn't read about doing this at scale — he built five businesses and an AI-integrated ecosystem doing it. The proof that the method works is the empire it built. You don't get a PDF. You get the actual operating system, and someone who's run it, in the room with you.",
    credentials: [
      "500+ properties, personally",
      "Five businesses, one integrated ecosystem",
      "MoveIQ and an AI-integrated toolset",
      "Agents turned into experts, repeatedly",
    ],
  },
  path: {
    headline: "The ladder — climb at your pace.",
    steps: [
      { title: "Free resources", body: "Start here. Real value, no card required — proof before promises." },
      { title: "All-Access", body: "The full library, the frameworks, the community of operators." },
      { title: "Certified Investor Agent", body: "The flagship: the complete system, mentored, to build a real practice." },
      { title: "MoveIQ", body: "AI as a deliverable — the Builder pillar, in your hands." },
    ],
  },
  proof: {
    headline: "The ecosystem is the evidence.",
    figures: [
      { figure: "5", context: "Businesses built with the method you'll learn." },
      { figure: "500+", context: "Properties — the reps behind the teaching." },
    ],
    quote: {
      text: "Every other coach sold me a course. Jody showed me the machine and how he built it.",
      cite: "A Certified Investor Agent",
    },
  },
  door: {
    headline: "Start where you are.",
    body: "Take the free resources first. If they're worth your time, the next rung is right there — never forced.",
    cta: { label: "See the transformation record", href: "/connect?intent=agent" },
    posture: "consult",
  },
};
