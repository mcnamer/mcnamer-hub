"use client";

/**
 * MOVEMENT III — THE RECORD (Credibility). The field lightens one step — dawn
 * beginning. Monumental figures, one per scroll-beat, each with a context line
 * that turns the number into character. Evidence, never adjectives.
 *
 * Layout: 9/3 editorial asymmetry — heroic numeral left, context right-offset.
 * Entrance contract: figures settle-count once; the gold ledger-rule Draws as
 * each count settles. Proof wants stillness — this movement holds.
 */

import { motion } from "framer-motion";
import { Section } from "@/components/layout/section";
import { Counter } from "@/components/primitives/counter";
import { Stagger } from "@/components/motion/stagger";
import { useMotion } from "@/components/motion/motion-provider";
import { RECORD_FIGURES } from "@/lib/constants/content";
import { DURATION, EASE } from "@/lib/design/motion";

export function MovementRecord() {
  const { motionEnabled } = useMotion();

  return (
    <Section
      dayNight="dusk"
      label="The Record — the evidence"
      className="px-6 py-[var(--breath)] md:px-12"
    >
      <div className="mx-auto max-w-[var(--container-content)]">
        <header className="mb-20 max-w-2xl">
          <p className="murmur mb-4 opacity-60">The record</p>
          <h2 className="font-voice text-display-2 text-balance">
            The receipts, laid out plainly. You draw the conclusion.
          </h2>
        </header>

        <Stagger step={0.15} className="grid gap-16 md:gap-20" as="ol">
          {RECORD_FIGURES.map((f) => (
            <li
              key={f.figure}
              className="grid items-baseline gap-x-8 gap-y-4 md:grid-cols-[9fr_3fr]"
            >
              <div>
                <div className="font-voice text-display-hero font-medium leading-none tracking-tight">
                  <Counter value={f.figure} />
                </div>
                {/* The gold ledger-rule — Draws once the count settles. */}
                <motion.span
                  aria-hidden
                  className="mt-6 block h-px w-full max-w-md origin-left rounded-full bg-[var(--color-gold)]"
                  initial={motionEnabled ? { scaleX: 0 } : false}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: DURATION.settle,
                    ease: EASE.settle,
                    delay: DURATION.photographic / 1000 + 0.2,
                  }}
                />
              </div>
              <p className="text-body-large text-balance opacity-75 md:pt-4">
                {f.context}
              </p>
            </li>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
