"use client";

/**
 * THE PROOF-ATOM — figure + context + the gold ledger-rule. The sequence IS
 * the meaning: the numeral settles its count, *then* the gold rule Draws
 * beneath it — proof, then the ledger line. Used in The Record (9/3 heroic)
 * and, compact, beside every ray's Door.
 *
 * Gold's first sanctioned job lives here. It is drawn, never decorative.
 */

import { motion } from "framer-motion";
import { Counter } from "./counter";
import { useMotion } from "@/components/motion/motion-provider";
import { DURATION, EASE } from "@/lib/design/motion";
import { cn } from "@/lib/utils/cn";

interface ProofAtomProps {
  figure: string;
  context: string;
  /** Heroic (Movement III) vs. compact (beside a Door). */
  size?: "hero" | "compact";
  className?: string;
}

export function ProofAtom({
  figure,
  context,
  size = "hero",
  className,
}: ProofAtomProps) {
  const { motionEnabled } = useMotion();
  const isHero = size === "hero";

  return (
    <div className={cn("grid items-baseline gap-x-8 gap-y-3", className)}>
      <div
        className={cn(
          "font-voice font-medium leading-none",
          isHero ? "text-display-hero" : "text-display-2",
        )}
      >
        <Counter value={figure} />
      </div>

      {/* The gold ledger-rule — Draws after the count settles. */}
      <motion.span
        aria-hidden
        className="col-start-1 block h-px w-full origin-left rounded-full"
        style={{ backgroundColor: "var(--color-gold)" }}
        initial={motionEnabled ? { scaleX: 0 } : false}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: DURATION.settle,
          ease: EASE.settle,
          delay: DURATION.photographic / 1000 + 0.2,
        }}
      />

      <p
        className={cn(
          "col-start-1 max-w-sm text-balance",
          isHero ? "text-body-large" : "text-body",
          "opacity-75",
        )}
      >
        {context}
      </p>
    </div>
  );
}
