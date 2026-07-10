"use client";

/**
 * THE PULL QUOTE — "the site breathes before someone speaks." The rule Draws
 * first, then the text Blooms. Jody's voice, in the display serif, full-width.
 */

import { motion } from "framer-motion";
import { LightLine } from "./light-line";
import { useMotion } from "@/components/motion/motion-provider";
import { DURATION, EASE } from "@/lib/design/motion";
import { cn } from "@/lib/utils/cn";

interface PullQuoteProps {
  children: string;
  cite?: string;
  /** Render the accent rule in gold rather than the contextual wavelength. */
  gold?: boolean;
  className?: string;
}

export function PullQuote({ children, cite, gold, className }: PullQuoteProps) {
  const { motionEnabled } = useMotion();

  return (
    <figure className={cn("mx-auto max-w-4xl text-center", className)}>
      <div className="mx-auto mb-10 w-16">
        <LightLine
          draw
          thickness={2}
          className={gold ? "!bg-[var(--color-gold)]" : undefined}
        />
      </div>
      <motion.blockquote
        className="font-voice text-display-2 text-balance italic"
        initial={motionEnabled ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: DURATION.photographic,
          ease: EASE.photographic,
          delay: 0.25,
        }}
      >
        {`“${children}”`}
      </motion.blockquote>
      {cite && (
        <figcaption className="murmur mt-8 opacity-70">{cite}</figcaption>
      )}
    </figure>
  );
}
