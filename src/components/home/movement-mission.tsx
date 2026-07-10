"use client";

/**
 * MOVEMENT VI — THE MISSION (Inspiration). One subject: purpose. The field is
 * full warm cream — the teal ray's closing solo. Tyler, named as author and
 * co-founder; one line of the mission. The most spacious composition on the
 * page — whitespace as reverence. No selling: elevation, not conversion.
 *
 * Motion: almost none — slow light drift. Stillness is the choreography.
 * (This section declares the teal wavelength so its accents inherit it.)
 */

import { Section } from "@/components/layout/section";
import { Photo } from "@/components/primitives/photo";
import { Bloom } from "@/components/motion/bloom";
import { MISSION } from "@/lib/constants/content";

export function MovementMission() {
  return (
    <Section
      dayNight="day"
      wavelength="teal"
      label="The Mission — AutismWorks"
      className="bg-[var(--color-light-cream)] px-6 py-[calc(var(--breath)*1.3)] text-[var(--color-ink)] md:px-12"
    >
      <div className="mx-auto max-w-4xl text-center">
        <Bloom photographic>
          <p
            className="murmur mb-8"
            style={{ color: "var(--color-teal-text)" }}
          >
            {MISSION.eyebrow}
          </p>
        </Bloom>

        <Bloom photographic delay={0.1}>
          <h2 className="font-voice text-display-1 text-balance leading-tight">
            {MISSION.headline}
          </h2>
        </Bloom>

        <Bloom photographic delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-body-large leading-relaxed opacity-80">
            {MISSION.body}
          </p>
        </Bloom>

        <div className="mx-auto mt-16 max-w-2xl">
          <Photo
            alt="Tyler McNamer speaking with quiet confidence to a small, attentive group — a community gathered in calm daylight."
            ratio="16 / 9"
            tintWavelength
            sizes="(max-width: 768px) 100vw, 42rem"
          />
        </div>

        <Bloom delay={0.1}>
          <p
            className="murmur mt-10"
            style={{ color: "var(--color-teal-text)" }}
          >
            {MISSION.attribution}
          </p>
        </Bloom>
      </div>
    </Section>
  );
}
