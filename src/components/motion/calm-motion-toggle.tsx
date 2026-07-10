"use client";

/**
 * CALM MOTION TOGGLE — the ratified footer control. Ships visible, not buried
 * in a settings drawer. Under Calm Motion: Breath stops, Settle displacement
 * zeroes, Draw becomes instant presence, the pointer-light retires. "Nothing
 * lost but motion." Honours (and reflects) the OS reduced-motion signal too.
 */

import { Waves } from "lucide-react";
import { useMotion } from "./motion-provider";
import { cn } from "@/lib/utils/cn";

export function CalmMotionToggle() {
  const { calmMotion, systemReduced, toggleCalmMotion } = useMotion();
  const on = calmMotion || systemReduced;

  return (
    <button
      type="button"
      onClick={toggleCalmMotion}
      role="switch"
      aria-checked={on}
      disabled={systemReduced}
      title={
        systemReduced
          ? "Calm motion is on because your system requests reduced motion."
          : undefined
      }
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-caption transition-colors",
        "border-white/15 hover:border-white/30 disabled:opacity-50",
      )}
    >
      <Waves size={15} strokeWidth={1.5} aria-hidden />
      <span>Calm motion</span>
      <span
        aria-hidden
        className={cn(
          "relative ml-1 h-4 w-7 rounded-full transition-colors",
          on ? "bg-[var(--color-gold)]" : "bg-white/20",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-3 rounded-full bg-[var(--color-field-midnight)] transition-transform",
            on ? "translate-x-3.5" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}
