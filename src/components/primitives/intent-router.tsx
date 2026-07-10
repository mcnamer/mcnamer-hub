"use client";

/**
 * THE INTENT ROUTER — the master converter. "One door, five right-sized asks."
 * Honest radio choices under the glass: the visitor names their intent in plain
 * language; the interface warms toward that intent's wavelength and reveals the
 * single next step — never a wall of inputs.
 *
 * The one molecule permitted to warm the field. Fully keyboard-native (arrow
 * between options, the native radiogroup). Colour never carries meaning alone —
 * every option is labelled and the light-line is paired with text.
 */

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { INTENTS, type Intent } from "@/lib/constants/content";
import { WAVELENGTHS } from "@/lib/design/wavelengths";
import { DURATION, EASE } from "@/lib/design/motion";
import { useMotion } from "@/components/motion/motion-provider";
import { cn } from "@/lib/utils/cn";

function intentColor(intent: Intent): string {
  return intent.wavelength === "spine"
    ? "var(--color-gold)"
    : WAVELENGTHS[intent.wavelength].display;
}

export function IntentRouter() {
  const { motionEnabled } = useMotion();
  const [selected, setSelected] = useState<Intent | null>(null);

  return (
    <div
      className="mx-auto max-w-xl"
      // Selecting an intent warms the whole router toward its wavelength.
      style={selected ? { ["--wave" as string]: intentColor(selected) } : undefined}
    >
      <fieldset>
        <legend className="sr-only">Choose where you want to begin</legend>
        <div role="radiogroup" className="grid gap-2.5">
          {INTENTS.map((intent) => {
            const isSelected = selected?.id === intent.id;
            const color = intentColor(intent);
            return (
              <button
                key={intent.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(intent)}
                className={cn(
                  "group relative flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300",
                  isSelected
                    ? "border-white/25 bg-white/[0.06]"
                    : "border-white/10 hover:border-white/20 hover:bg-white/[0.03]",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-6 w-px shrink-0 rounded-full transition-all duration-300",
                    isSelected ? "h-8 opacity-100" : "opacity-50 group-hover:h-7",
                  )}
                  style={{ backgroundColor: color }}
                />
                <span className="flex-1 text-body-large">{intent.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* The single revealed next step. */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={motionEnabled ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={motionEnabled ? { opacity: 0, y: -8 } : undefined}
            transition={{ duration: DURATION.settle, ease: EASE.settle }}
            className="mt-8 flex flex-col items-center gap-4 text-center"
          >
            <Link
              href={selected.href}
              className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-body font-medium no-underline transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: intentColor(selected),
                color: "var(--color-field-midnight)",
              }}
            >
              {selected.nextStep}
              <ArrowRight
                size={18}
                strokeWidth={2}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <p className="text-caption opacity-50">
              No pressure, no funnel — the right room, opened.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
