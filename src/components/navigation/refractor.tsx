"use client";

/**
 * THE REFRACTOR — Layer 2 of the navigation, the power layer (never a
 * dependency; every journey is completable without it). A command-palette-style
 * Glass surface — the system's second and final sanctioned glass — presenting
 * the five rays as luminous panels, spine destinations beneath, and type-to-find
 * routing by intent.
 *
 * Built as a proper dialog: focus moves in on open and is trapped until escape
 * or selection; focus returns to the trigger on close. Fully keyboard-native
 * (arrow to move, enter to go, escape to leave). The one molecule permitted the
 * sacred Refract verb on selection.
 */

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { WAVELENGTH_LIST } from "@/lib/design/wavelengths";
import { SPINE_PAGES } from "@/lib/constants/site";
import { INTENTS } from "@/lib/constants/content";
import { useMotion } from "@/components/motion/motion-provider";
import { DURATION, EASE } from "@/lib/design/motion";
import { cn } from "@/lib/utils/cn";

interface RefractorProps {
  open: boolean;
  onClose: () => void;
}

interface Destination {
  id: string;
  label: string;
  detail: string;
  href: string;
  color: string;
  group: "ray" | "spine" | "intent";
}

export function Refractor({ open, onClose }: RefractorProps) {
  const router = useRouter();
  const { motionEnabled } = useMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const destinations = useMemo<Destination[]>(() => {
    const rays: Destination[] = WAVELENGTH_LIST.map((w) => ({
      id: `ray-${w.id}`,
      label: w.business,
      detail: w.door,
      href: `/${w.slug}`,
      color: w.display,
      group: "ray",
    }));
    const spine: Destination[] = SPINE_PAGES.map((p) => ({
      id: `spine-${p.href}`,
      label: p.label,
      detail: p.subtitle,
      href: p.href,
      color: "var(--color-gold)",
      group: "spine",
    }));
    const intents: Destination[] = INTENTS.map((i) => ({
      id: `intent-${i.id}`,
      label: i.label,
      detail: i.nextStep,
      href: i.href,
      color:
        i.wavelength === "spine"
          ? "var(--color-gold)"
          : WAVELENGTH_LIST.find((w) => w.id === i.wavelength)?.display ??
            "var(--color-gold)",
      group: "intent",
    }));
    return [...rays, ...spine, ...intents];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(
      (d) =>
        d.label.toLowerCase().includes(q) ||
        d.detail.toLowerCase().includes(q),
    );
  }, [query, destinations]);

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  // Focus management: move focus in on open, restore on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    setQuery("");
    setActiveIndex(0);
    return () => previouslyFocused?.focus();
  }, [open]);

  // Keyboard: escape, arrows, enter, and a simple focus trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const target = results[activeIndex];
        if (target) {
          e.preventDefault();
          go(target.href);
        }
      } else if (e.key === "Tab") {
        // Trap focus within the panel.
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'input, button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex, onClose, go]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (activeIndex > results.length - 1) setActiveIndex(0);
  }, [results.length, activeIndex]);

  const dur = motionEnabled ? DURATION.refraction : DURATION.settle;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-6 md:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.settle, ease: EASE.settle }}
        >
          {/* Scrim */}
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[color-mix(in_srgb,var(--color-field-midnight)_70%,transparent)]"
          />

          {/* The Glass sheet */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="The Refractor — jump to any destination"
            className={cn(
              "relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10",
              "bg-[color-mix(in_srgb,var(--color-field-dusk)_80%,transparent)] backdrop-blur-2xl",
              "shadow-2xl shadow-black/40",
            )}
            initial={{
              opacity: 0,
              y: motionEnabled ? -12 : 0,
              scale: motionEnabled ? 0.98 : 1,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: motionEnabled ? -8 : 0, scale: 0.99 }}
            transition={{ duration: dur, ease: EASE.refraction }}
          >
            {/* Search — type-to-find */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={18} strokeWidth={1.5} className="opacity-60" aria-hidden />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where do you want to begin?"
                aria-label="Search destinations by name or intent"
                className="w-full bg-transparent text-body-large text-[var(--color-light-cream)] placeholder:opacity-40 focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close the Refractor"
                className="grid size-8 place-items-center rounded-full opacity-60 transition-opacity hover:opacity-100"
              >
                <X size={18} strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            {/* Results */}
            <div
              role="listbox"
              aria-label="Destinations"
              className="max-h-[60vh] overflow-y-auto p-2 text-[var(--color-light-cream)]"
            >
              {results.length === 0 && (
                <p className="px-4 py-8 text-center text-body opacity-50">
                  Nothing by that name — try “buy,” “agent,” or “parent.”
                </p>
              )}
              <RefractorGroup
                title="The five ways"
                items={results.filter((r) => r.group === "ray")}
                results={results}
                activeIndex={activeIndex}
                onHover={setActiveIndex}
                onSelect={go}
              />
              <RefractorGroup
                title="The spine"
                items={results.filter((r) => r.group === "spine")}
                results={results}
                activeIndex={activeIndex}
                onHover={setActiveIndex}
                onSelect={go}
              />
              <RefractorGroup
                title="Or tell me your intent"
                items={results.filter((r) => r.group === "intent")}
                results={results}
                activeIndex={activeIndex}
                onHover={setActiveIndex}
                onSelect={go}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface GroupProps {
  title: string;
  items: Destination[];
  results: Destination[];
  activeIndex: number;
  onHover: (i: number) => void;
  onSelect: (href: string) => void;
}

function RefractorGroup({
  title,
  items,
  results,
  activeIndex,
  onHover,
  onSelect,
}: GroupProps) {
  if (items.length === 0) return null;
  return (
    <div className="mb-1">
      <p className="murmur px-4 py-2 opacity-50">{title}</p>
      <ul>
        {items.map((item) => {
          const index = results.indexOf(item);
          const active = index === activeIndex;
          return (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                onMouseEnter={() => onHover(index)}
                onClick={() => onSelect(item.href)}
                className={cn(
                  "group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors",
                  active ? "bg-white/8" : "hover:bg-white/5",
                )}
              >
                <span
                  aria-hidden
                  className="h-8 w-px shrink-0 rounded-full transition-all group-hover:h-9"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1">
                  <span className="block text-body-large">{item.label}</span>
                  <span className="block text-caption opacity-60">
                    {item.detail}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className={cn(
                    "shrink-0 transition-transform",
                    active ? "translate-x-1 opacity-100" : "opacity-40",
                  )}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
