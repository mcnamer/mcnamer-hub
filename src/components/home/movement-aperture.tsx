"use client";

/**
 * MOVEMENT I — THE APERTURE (Curiosity).
 * Near-black navy field, utterly quiet. A single horizontal line of white light
 * Draws itself left-to-right on load (1.2s), then breathes — the page's
 * heartbeat. Beneath it, spaced capitals: JODY McNAMER. After two seconds of
 * stillness, a downward glyph and the word "Begin."
 *
 * Entrance contract: the line Draws, nothing else moves for 2s.
 */

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/layout/section";
import { useMotion } from "@/components/motion/motion-provider";
import { EASE, DURATION } from "@/lib/design/motion";

export function MovementAperture() {
  const { motionEnabled } = useMotion();

  return (
    <Section
      dayNight="night"
      label="The Aperture — Jody McNamer"
      className="flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6"
      id="aperture"
    >
      <div className="relative flex flex-col items-center">
        {/* The line — draws itself, then breathes. ~40% width, centered. */}
        <motion.span
          aria-hidden
          className="block h-px w-[min(40vw,22rem)] origin-center rounded-full bg-[var(--color-light-cream)]"
          style={{
            boxShadow: "0 0 16px color-mix(in srgb, white 40%, transparent)",
          }}
          initial={motionEnabled ? { scaleX: 0, opacity: 0 } : false}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE.settle }}
        />
        <motion.span
          aria-hidden
          className="absolute top-0 block h-px w-[min(40vw,22rem)] rounded-full bg-[var(--color-light-cream)] breath"
        />

        {/* The name — spaced capitals. This is the page's H1. */}
        <motion.h1
          className="murmur mt-6 !text-base tracking-[0.35em] text-[var(--color-light-cream)] sm:!text-lg"
          initial={motionEnabled ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.photographic, delay: 1 }}
        >
          Jody&nbsp;&nbsp;McNamer
        </motion.h1>
      </div>

      {/* Begin — arrives after two seconds of stillness. */}
      <motion.a
        href="#refraction"
        className="group absolute bottom-14 flex flex-col items-center gap-2 no-underline opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        initial={motionEnabled ? { opacity: 0, y: -6 } : false}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: DURATION.photographic, delay: 2, ease: EASE.settle }}
        aria-label="Begin — scroll to the story"
      >
        <span className="murmur">Begin</span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          aria-hidden
          className="animate-[bounce_2.5s_ease-in-out_infinite] motion-reduce:animate-none"
        />
      </motion.a>
    </Section>
  );
}
