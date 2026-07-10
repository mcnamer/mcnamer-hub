"use client";

/**
 * INSIGHTS EXPLORER — the ray filter that turns scattered topics into topical
 * clusters. Filtering by ray is real navigation: it re-tints the surface to the
 * chosen wavelength and lists that ray's Signal. "All" returns to white light.
 * Colour never carries meaning alone — every filter is a labelled control.
 */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, FileText } from "lucide-react";
import { SIGNAL_ENTRIES } from "./data";
import { WAVELENGTH_LIST, type Wavelength } from "@/lib/design/wavelengths";
import { useMotion } from "@/components/motion/motion-provider";
import { DURATION, EASE } from "@/lib/design/motion";
import { cn } from "@/lib/utils/cn";

type Filter = Wavelength | "all";

export function InsightsExplorer() {
  const { motionEnabled } = useMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const entries = useMemo(
    () =>
      filter === "all"
        ? SIGNAL_ENTRIES
        : SIGNAL_ENTRIES.filter((e) => e.ray === filter),
    [filter],
  );

  const activeWave =
    filter === "all"
      ? "var(--color-gold)"
      : WAVELENGTH_LIST.find((w) => w.id === filter)!.display;

  return (
    <div style={{ ["--wave" as string]: activeWave }}>
      {/* The filter — the prism as a control surface. */}
      <div
        role="tablist"
        aria-label="Filter insights by ray"
        className="mb-16 flex flex-wrap gap-2"
      >
        <FilterChip
          label="All"
          color="var(--color-gold)"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {WAVELENGTH_LIST.map((w) => (
          <FilterChip
            key={w.id}
            label={w.business.replace(/^McNamer |^One Real /, "")}
            color={w.display}
            active={filter === w.id}
            onClick={() => setFilter(w.id)}
          />
        ))}
      </div>

      <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => {
            const color = WAVELENGTH_LIST.find((w) => w.id === entry.ray)!
              .display;
            return (
              <motion.li
                key={entry.slug}
                layout={motionEnabled}
                initial={motionEnabled ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={motionEnabled ? { opacity: 0, y: -8 } : undefined}
                transition={{ duration: DURATION.settle, ease: EASE.settle }}
              >
                <article className="group flex h-full flex-col rounded-xl border border-white/10 p-6 transition-colors hover:border-white/25">
                  <div className="mb-5 w-10">
                    <span
                      aria-hidden
                      className="block h-px w-full rounded-full transition-all duration-300 group-hover:w-14"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                  <div className="mb-3 flex items-center gap-2 text-caption opacity-60">
                    {entry.kind === "video" ? (
                      <Play size={13} strokeWidth={1.75} aria-hidden />
                    ) : (
                      <FileText size={13} strokeWidth={1.75} aria-hidden />
                    )}
                    <span>{entry.readingTime}</span>
                  </div>
                  <h3 className="font-voice text-title leading-snug">
                    {entry.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body opacity-70">
                    {entry.summary}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function FilterChip({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-caption transition-all",
        active
          ? "border-white/30 bg-white/[0.06]"
          : "border-white/10 hover:border-white/20",
      )}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </button>
  );
}
