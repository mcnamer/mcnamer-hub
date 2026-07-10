"use client";

/**
 * MOVEMENT V — THE FIVE WAYS (Trust). The rays return as doors: five full-width
 * horizontal bands, each framed as a transformation. Hover floods the band with
 * its wavelength and opens it 12px. The bands' light-lines illuminate in
 * sequence as scrolled — walking past five lit doorways.
 *
 * This is the homepage's second (and directional) ask-moment.
 */

import { Section } from "@/components/layout/section";
import { RayBand } from "@/components/primitives/ray-band";
import { Stagger } from "@/components/motion/stagger";
import { Bloom } from "@/components/motion/bloom";
import { WAVELENGTH_LIST } from "@/lib/design/wavelengths";

export function MovementFiveWays() {
  return (
    <Section
      dayNight="dusk"
      label="The Five Ways — choose your door"
      className="px-6 py-[var(--breath)] md:px-12"
    >
      <div className="mx-auto max-w-[var(--container-content)]">
        <Bloom>
          <header className="mb-16 max-w-2xl">
            <p className="murmur mb-4 opacity-60">Five ways forward</p>
            <h2 className="font-voice text-display-2 text-balance">
              Same light. Five transformations. Choose where you want to go.
            </h2>
          </header>
        </Bloom>

        <Stagger step={0.1}>
          {WAVELENGTH_LIST.map((w) => (
            <RayBand
              key={w.id}
              href={`/${w.slug}`}
              wavelength={w.id}
              display={w.display}
              business={w.business}
              door={w.door}
              proof={w.proof}
            />
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
