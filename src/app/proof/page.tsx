import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Bloom } from "@/components/motion/bloom";
import { Stagger } from "@/components/motion/stagger";
import { LightLine } from "@/components/primitives/light-line";
import { pageMetadata } from "@/lib/seo/metadata";
import { RECORD_FIGURES } from "@/lib/constants/content";
import { Counter } from "@/components/primitives/counter";

/**
 * PROOF — "The Record." The standalone evidence layer, kept apart from The
 * Story on purpose: story is warm, the record is cold steel; each is stronger
 * unalloyed. Numbers, a case study, testimonials — proof structurally adjacent
 * to conviction. Entity gold for search.
 */

export const metadata: Metadata = pageMetadata({
  title: "Proof — The Record",
  description:
    "The record: 23+ years, 500+ properties, $50M+ in short sales since 2003, U.S. Navy veteran. Case studies and testimonials — the evidence, laid out plainly.",
  path: "/proof",
});

const TESTIMONIALS = [
  {
    quote:
      "He told me a house I loved was wrong for us — and he was right. That's when I trusted him with everything.",
    cite: "A Kitsap County family",
  },
  {
    quote:
      "Every other coach sold me a course. Jody showed me the machine and how he built it.",
    cite: "A Certified Investor Agent",
  },
  {
    quote:
      "We came for help with our son and found people who actually understood. No pity. Just respect.",
    cite: "An AutismWorks parent",
  },
];

export default function ProofPage() {
  return (
    <>
      <Section
        dayNight="dusk"
        label="Proof — the record"
        className="px-6 pb-[var(--breath)] pt-[calc(var(--breath)+4rem)] md:px-12"
      >
        <div className="mx-auto max-w-[var(--container-content)]">
          <Bloom>
            <p className="murmur mb-6 opacity-60">The record</p>
            <div className="mb-8 w-24">
              <LightLine draw thickness={2} glow />
            </div>
            <h1 className="max-w-4xl font-voice text-display-1 text-balance">
              Evidence, not adjectives. You draw the conclusion.
            </h1>
          </Bloom>

          {/* The figures */}
          <Stagger step={0.12} className="mt-24 grid gap-16 sm:grid-cols-2">
            {RECORD_FIGURES.map((f) => (
              <div key={f.figure}>
                <div className="font-voice text-display-hero font-medium leading-none">
                  <Counter value={f.figure} />
                </div>
                <span
                  aria-hidden
                  className="mt-5 block h-px w-full max-w-xs rounded-full"
                  style={{ backgroundColor: "var(--color-gold)" }}
                />
                <p className="mt-4 text-body-large opacity-75">{f.context}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* The case study — the stale-listing turnaround (the diagnostic mind). */}
      <Section
        dayNight="day"
        label="Case study"
        className="bg-[var(--color-light-cream)] px-6 py-[var(--breath)] text-[var(--color-ink)] md:px-12"
      >
        <div className="mx-auto max-w-3xl">
          <Bloom>
            <span className="murmur text-[var(--color-gold-deep)]">
              Case study · the stale-listing turnaround
            </span>
            <h2 className="mt-4 font-voice text-display-2 text-balance">
              A listing everyone had given up on.
            </h2>
            <div className="prose mt-8 space-y-5">
              <p className="text-body-large leading-relaxed opacity-80">
                A property sat on the market for months while three agents
                shrugged and dropped the price. Jody treated it the way he treats
                a short sale: as a diagnosis, not a discount.
              </p>
              <p className="text-body-large leading-relaxed opacity-80">
                The problem wasn&apos;t the price — it was the story the listing
                told. Re-photographed, re-sequenced, re-positioned to the buyer
                who was actually right for it, the home found its family in
                weeks. The analytical rigor that saves a foreclosure is the same
                rigor that revives a stale listing.
              </p>
            </div>
          </Bloom>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        dayNight="dusk"
        label="In their words"
        className="px-6 py-[var(--breath)] md:px-12"
      >
        <div className="mx-auto max-w-[var(--container-content)]">
          <Bloom>
            <h2 className="mb-16 font-voice text-display-2 text-balance">
              In their words.
            </h2>
          </Bloom>
          <Stagger step={0.12} className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.cite}
                className="flex flex-col rounded-xl border border-white/10 p-8"
              >
                <div className="mb-6 w-10">
                  <LightLine thickness={2} />
                </div>
                <blockquote className="flex-1 font-voice text-title italic leading-snug">
                  {`“${t.quote}”`}
                </blockquote>
                <figcaption className="murmur mt-6 opacity-60">
                  {t.cite}
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
