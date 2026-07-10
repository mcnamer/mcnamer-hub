"use client";

/**
 * MOVEMENT VII — THE DOOR (Action). Return to the navy field of the opening —
 * night sky again, the five rays resting as a settled aurora. "Where do you
 * want to begin?" Beneath it, the intent router.
 *
 * The only centered movement on the page — arrival earns symmetry. The third
 * and final ask-moment: the invitation, never a pitch.
 */

import { Section } from "@/components/layout/section";
import { IntentRouter } from "@/components/primitives/intent-router";
import { Bloom } from "@/components/motion/bloom";

export function MovementDoor() {
  return (
    <Section
      dayNight="night"
      label="The Door — where do you want to begin?"
      className="flex min-h-dvh flex-col items-center justify-center px-6 py-[var(--breath)]"
      id="door"
    >
      {/* The settled aurora — the five rays at rest along the top edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 h-40 opacity-30 blur-3xl"
        style={{
          background:
            "linear-gradient(90deg, var(--color-amber), var(--color-azure), var(--color-indigo), var(--color-violet), var(--color-teal))",
        }}
      />

      <div className="relative w-full text-center">
        <Bloom>
          <h2 className="font-voice text-display-1 text-balance">
            Where do you want to begin?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-body-large opacity-70">
            Name what you need. I&apos;ll open the right room — and only that
            room.
          </p>
        </Bloom>

        <div className="mt-14">
          <IntentRouter />
        </div>
      </div>
    </Section>
  );
}
