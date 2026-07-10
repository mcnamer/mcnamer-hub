"use client";

/**
 * MOVEMENT IV — THE MAN (Human Connection). The field warms to cream — first
 * daylight, photography enters for the first time. A compressed triptych: the
 * professional, the father (Tyler; AutismWorks), the man (faith, the outdoors).
 * Closes on a first-person pull quote in Jody's register.
 *
 * Layout: editorial 7/5 and 8/4 splits, heavy-side alternating per beat. Motion:
 * photographs Bloom + Settle — a print developing; nothing slides in.
 */

import { Section } from "@/components/layout/section";
import { Photo } from "@/components/primitives/photo";
import { PullQuote } from "@/components/primitives/pull-quote";
import { Bloom } from "@/components/motion/bloom";
import { TRIPTYCH } from "@/lib/constants/content";
import { cn } from "@/lib/utils/cn";

const PHOTO_ALT = [
  "Jody McNamer in his element on a Puget Sound waterfront, reviewing property documents in late-afternoon light.",
  "Jody and Tyler McNamer side by side beside the water, a printed manuscript of Population: ONE between them.",
  "Jody McNamer outdoors at golden hour, unhurried, the Olympic mountains soft in the distance.",
] as const;

export function MovementTheMan() {
  return (
    <Section
      dayNight="day"
      label="The Man — human connection"
      className="bg-[var(--color-light-cream)] px-6 py-[var(--breath)] text-[var(--color-ink)] md:px-12"
    >
      <div className="mx-auto max-w-[var(--container-content)]">
        <Bloom>
          <p className="murmur mb-16 text-[var(--color-gold-deep)]">
            {TRIPTYCH.eyebrow}
          </p>
        </Bloom>

        <div className="space-y-24 md:space-y-32">
          {TRIPTYCH.panels.map((panel, i) => {
            const photoLeft = i % 2 === 0;
            const split = i === 1 ? "md:grid-cols-[8fr_4fr]" : "md:grid-cols-[7fr_5fr]";
            return (
              <article
                key={panel.key}
                className={cn("grid items-center gap-8 md:gap-16", split)}
              >
                <div className={cn(photoLeft ? "md:order-1" : "md:order-2")}>
                  <Photo
                    alt={PHOTO_ALT[i] ?? panel.title}
                    ratio={i === 1 ? "4 / 3" : "4 / 5"}
                    tintWavelength={false}
                  />
                </div>
                <div
                  className={cn(
                    "max-w-md",
                    photoLeft ? "md:order-2" : "md:order-1",
                  )}
                >
                  {"teal" in panel && panel.teal && (
                    <span
                      aria-hidden
                      className="mb-5 block h-px w-12 rounded-full"
                      style={{ backgroundColor: "var(--color-teal-brand)" }}
                    />
                  )}
                  <h2 className="font-voice text-display-2 text-balance">
                    {panel.title}
                  </h2>
                  <p className="mt-5 text-body-large leading-relaxed opacity-80">
                    {panel.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-32 border-t border-[var(--color-light-linen)] pt-24 text-[var(--color-ink)]">
          <PullQuote gold cite="Jody McNamer">
            {TRIPTYCH.pullQuote}
          </PullQuote>
        </div>
      </div>
    </Section>
  );
}
