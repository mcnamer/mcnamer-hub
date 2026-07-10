import type { RayContent } from "../types";

/**
 * AUTISMWORKS — the teal ray, and the most self-contained: a complete sanctuary.
 * Warm cream field throughout, slower pacing, Tyler's voice leading. Resources
 * and "Autism, Answered" sit ahead of the books; the commerce layer lives
 * behind the care layer, never in front. Person-first language is absolute; the
 * Door is framed as joining a community, never closing a sale.
 *
 * This ray holds the strictest calm — the most generous type, the least motion.
 * Sanctuary is a design requirement, not a mood.
 */
export const autismWorks: RayContent = {
  slug: "autism-works",
  wavelength: "teal",
  dayNight: "day",
  business: "AutismWorks",
  metaDescription:
    "AutismWorks — co-founded by Tyler McNamer, author of Population: ONE. Lived-experience support, answers, and community for families, built on person-first respect. You are welcome here.",

  arrival: {
    eyebrow: "AutismWorks",
    headline: "You're welcome here.",
    sub: "A community built by people who live it — led by Tyler McNamer, author of Population: ONE.",
  },
  problem: {
    headline: "Searching at midnight, afraid of being sold to.",
    body: "When you're looking for help for your child, the last thing you need is pity, platitudes, or a pitch. You need people who actually understand — and who talk to you like a parent, not a lead.",
  },
  guide: {
    headline: "Lived experience, not a brochure.",
    body: "AutismWorks began at home. Tyler McNamer is autistic, an author, and the co-founder of this work — which means every answer here comes from the inside. We speak person-first, always. We meet you where you are, at your pace.",
    credentials: [
      "Co-founded with Tyler McNamer",
      "Author of Population: ONE and Becoming ONE",
      "Person-first, lived-experience led",
      "Answers before anything is ever sold",
    ],
  },
  path: {
    headline: "Start wherever you need to.",
    steps: [
      {
        title: "Autism, Answered",
        body: "Plain, respectful answers to the questions parents actually ask — no jargon, no judgment.",
      },
      {
        title: "The resources",
        body: "Guidance gathered and written for real families, freely available.",
      },
      {
        title: "Tyler's books",
        body: "Population: ONE and Becoming ONE — the story, in his own words.",
      },
      {
        title: "The community",
        body: "When you're ready, a place to belong. Only when you're ready.",
      },
    ],
  },
  proof: {
    headline: "In his words.",
    figures: [
      { figure: "2", context: "Books authored by Tyler McNamer." },
      { figure: "1", context: "Population: ONE — the title says the whole thesis." },
    ],
    quote: {
      text: "I'm not a puzzle to be solved. I'm a person. That's where everything good starts.",
      cite: "Tyler McNamer, Population: ONE",
    },
  },
  door: {
    headline: "Come in. Stay as long as you like.",
    body: "There's nothing to buy to belong. Join the community, read the answers, and reach a real person whenever the moment is right for you.",
    cta: { label: "Enter the community", href: "/connect?intent=parent" },
    posture: "join",
  },
};
