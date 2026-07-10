import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Bloom } from "@/components/motion/bloom";
import { LightLine } from "@/components/primitives/light-line";
import { PullQuote } from "@/components/primitives/pull-quote";
import { Photo } from "@/components/primitives/photo";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * THE STORY — "One Light." Long-form editorial and the deepest trust asset.
 * Chaptered and magazine-grade; warm where The Record is cold steel. Person-
 * first throughout. This is entity gold for search — biography on a stable URL.
 */

export const metadata: Metadata = pageMetadata({
  title: "The Story",
  description:
    "One light. The long-form story of Jody McNamer — the Navy years, 2003 and the short-sale era, Tyler and AutismWorks, faith, and the building of five businesses.",
  path: "/story",
});

interface Chapter {
  n: string;
  title: string;
  body: string[];
  alt: string;
  flip?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    n: "I",
    title: "The discipline came first",
    body: [
      "Before the deals, there was the Navy. It is where Jody learned that character is not a thing you claim — it is a thing you are caught doing when no one is grading you.",
      "That posture never left. It became the quiet spine of everything built afterward: show the receipts, let the other person draw the conclusion, and never oversell — because overselling is what people who lack proof do.",
    ],
    alt: "A young Jody McNamer in Navy service — a portrait in disciplined, understated light.",
  },
  {
    n: "II",
    title: "2003 — saving families, not selling them",
    body: [
      "When the ground gave way for so many households, Jody built his practice on the deals nobody else wanted: short sales. $50M+ of them, beginning in 2003 — the hardest cases, at the highest stakes, when a family's home was on the line.",
      "That is where the judgment came from. You cannot fake your way through a short sale. You learn to tell people hard truths gently, and to put their outcome ahead of a faster commission. Twenty-three years and 500+ properties later, it is still the whole method.",
    ],
    alt: "Jody McNamer at a kitchen table with a family, documents spread out, listening more than talking.",
    flip: true,
  },
  {
    n: "III",
    title: "Tyler, and the reason it's personal",
    body: [
      "AutismWorks began at home. Jody's son Tyler McNamer is autistic, an author — Population: ONE and Becoming ONE — and the co-founder of a mission to help individuals with autism change the world.",
      "Tyler taught the family, and then the business, a language: person-first, always. Never a condition to be managed, always a person to be understood. It is the value that quietly governs every other thing on this site.",
    ],
    alt: "Jody and Tyler McNamer side by side beside Puget Sound, a printed manuscript between them, both mid-laugh.",
  },
  {
    n: "IV",
    title: "Faith, family, and the long game",
    body: [
      "Faith and traditional values are not decoration here; they are the reason the work is patient. You do not rush people you actually care about, and you do not sell them what isn't right.",
      "It is why so much of the practice is referral, and why the relationships outlast the transactions.",
    ],
    alt: "Jody McNamer outdoors at golden hour, unhurried, the Olympic mountains soft behind him.",
    flip: true,
  },
  {
    n: "V",
    title: "Five businesses, one light",
    body: [
      "Real estate, mortgage, coaching, leads, and AutismWorks are not five ventures competing for attention. They emanate from one source — one proven, principled man whose expertise refracts, through trust, into five ways of turning what he knows into what other people become.",
      "And the site you are reading is itself part of the proof: an authored work, made with the same taste, restraint, and care Jody brings to everything else. One light. Five ways forward.",
    ],
    alt: "A wide, quiet composition of the Puget Sound at first light — the horizon a single line.",
  },
];

export default function StoryPage() {
  return (
    <>
      <Section
        dayNight="night"
        label="The Story — one light"
        className="flex min-h-[70vh] flex-col justify-center px-6 py-[var(--breath)] md:px-12"
      >
        <div className="mx-auto w-full max-w-[var(--container-content)]">
          <Bloom>
            <p className="murmur mb-6 opacity-60">The story</p>
            <div className="mb-8 w-24">
              <LightLine draw thickness={2} glow />
            </div>
            <h1 className="max-w-4xl font-voice text-display-hero text-balance leading-[1.02]">
              One light.
            </h1>
            <p className="mt-8 max-w-2xl text-body-large opacity-80">
              The long version — the years, the hard cases, the people, and the
              principle that ties all five businesses to a single source.
            </p>
          </Bloom>
        </div>
      </Section>

      <Section
        dayNight="day"
        label="The chapters"
        className="bg-[var(--color-light-cream)] px-6 py-[var(--breath)] text-[var(--color-ink)] md:px-12"
      >
        <div className="mx-auto max-w-[var(--container-content)] space-y-32 md:space-y-40">
          {CHAPTERS.map((ch) => (
            <article
              key={ch.n}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <div className={ch.flip ? "md:order-2" : "md:order-1"}>
                <Photo alt={ch.alt} ratio="4 / 5" />
              </div>
              <div className={ch.flip ? "md:order-1" : "md:order-2"}>
                <span className="murmur text-[var(--color-gold-deep)]">
                  Chapter {ch.n}
                </span>
                <h2 className="mt-3 font-voice text-display-2 text-balance">
                  {ch.title}
                </h2>
                <div className="prose mt-6 space-y-4">
                  {ch.body.map((p, i) => (
                    <p key={i} className="text-body-large leading-relaxed opacity-80">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-40 max-w-[var(--container-content)] border-t border-[var(--color-light-linen)] pt-24">
          <PullQuote gold cite="Jody McNamer">
            I&apos;ve spent my life learning things the hard way so the people I
            serve don&apos;t have to.
          </PullQuote>
        </div>
      </Section>
    </>
  );
}
