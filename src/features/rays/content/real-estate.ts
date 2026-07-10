import type { RayContent } from "../types";

/**
 * REAL ESTATE — the amber ray. The home wavelength, closest to Jody's gold.
 * Opens on Puget Sound light and splits immediately into three sub-path doors
 * so Marcus (military buyer) and Tom (investor-seller) never wade through each
 * other's story. The VA sub-path leads with Navy kinship in the first viewport.
 */
export const realEstate: RayContent = {
  slug: "real-estate",
  wavelength: "amber",
  dayNight: "dawn",
  business: "McNamer Real Estate",
  metaDescription:
    "Washington State real estate with 23+ years and 500+ properties behind it. VA and military buyers, sellers and investors, and current listings — guided by a Navy veteran who has seen the hard cases.",

  arrival: {
    eyebrow: "McNamer Real Estate",
    headline: "Find home.",
    sub: "Twenty-three years of placing families in the right house — never just closing a sale.",
    subPaths: [
      {
        label: "VA & military buyers",
        blurb:
          "PCS-ing into Kitsap or Pierce County? You're not a commission. VA fluency and a veteran who's walked it.",
        href: "/real-estate/va",
        signal: "For those who served",
      },
      {
        label: "Sellers & investors",
        blurb:
          "Burned before, or sitting on a stale listing? The short-sale diagnostic mind, turned to your result.",
        href: "/real-estate/sell",
        signal: "Proof-first",
      },
      {
        label: "Current listings",
        blurb: "What's on the market right now, across the Sound.",
        href: "/real-estate/listings",
      },
    ],
  },
  problem: {
    headline: "Most agents sell you a house. Then they disappear.",
    body: "A move is one of the largest decisions of your life, and the market rewards agents for speed over fit. That's how families end up in the wrong house at the wrong price — and how a listing goes stale while everyone shrugs.",
  },
  guide: {
    headline: "A guide who has seen the hard cases.",
    body: "Jody built his practice in 2003 saving families from foreclosure through short sales — the deals nobody else wanted, when the stakes were highest. That's where the judgment came from. Twenty-three years later it's the same principle: the right outcome for you, even when a faster one would pay him more.",
    credentials: [
      "23+ years, Washington State",
      "500+ properties placed",
      "$50M+ in short sales since 2003",
      "U.S. Navy veteran — VA-fluent",
    ],
  },
  path: {
    headline: "How the work goes.",
    steps: [
      {
        title: "The honest first conversation",
        body: "Your situation, your timeline, your real constraints — before a single listing link.",
      },
      {
        title: "The plan, in writing",
        body: "Price strategy or buying criteria grounded in the local data, not in a rush.",
      },
      {
        title: "The right house, or the right offer",
        body: "Whether buying or selling, we move only when the fit is real.",
      },
      {
        title: "The close, and the door left open",
        body: "The relationship doesn't end at signing. It's why most of this practice is referrals.",
      },
    ],
  },
  proof: {
    headline: "The record, adjacent to the ask.",
    figures: [
      { figure: "500+", context: "Properties placed across the Sound." },
      { figure: "$50M+", context: "In short sales — the hard cases, done right." },
      { figure: "23 years", context: "Same principle, every single year." },
    ],
    quote: {
      text: "He told me a house I loved was wrong for us — and he was right. That's when I knew.",
      cite: "A Kitsap County family",
    },
  },
  door: {
    headline: "Let's have the honest first conversation.",
    body: "No pressure, no funnel. Tell me where you're headed and I'll tell you, plainly, how I can help.",
    cta: { label: "Book a consult", href: "/connect?intent=buy-sell" },
    posture: "consult",
  },
};
