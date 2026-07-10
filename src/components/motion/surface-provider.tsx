"use client";

/**
 * SURFACE PROVIDER — the day-night axis, made live.
 *
 * The homepage is "one continuous space," not stacked sections. As the visitor
 * scrolls, whichever Section is most in view becomes the dominant surface and
 * publishes its day-night position + wavelength here. The provider writes those
 * onto the document root as CSS custom properties (`--field`, `--ink-on-field`,
 * `--wave`, `--wave-text`) with a slow transition, so the field *dawns* from
 * night to day exactly as the film intends — and the pointer-light knows when
 * it is permitted (night/dusk only).
 *
 * This is the runtime expression of the constitution's binding law: colour
 * flows down from context; components never hard-code a wavelength.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DAY_NIGHT, type DayNight } from "@/lib/design/daynight";
import {
  WAVELENGTHS,
  AUTISMWORKS_BRAND_MARK,
  type Spectrum,
} from "@/lib/design/wavelengths";

interface SurfaceState {
  dayNight: DayNight;
  wavelength: Spectrum;
}

interface SurfaceContextValue extends SurfaceState {
  /** Whether carried light (pointer-light / scroll-light) is permitted here. */
  carriedLight: boolean;
  /** A Section reports it has become dominant. */
  publish: (id: string, state: SurfaceState, priority: number) => void;
  withdraw: (id: string) => void;
}

const DEFAULT: SurfaceState = { dayNight: "night", wavelength: "spine" };

const SurfaceContext = createContext<SurfaceContextValue | null>(null);

function resolveWave(wavelength: Spectrum): {
  wave: string;
  waveText: string;
} {
  if (wavelength === "spine") {
    return { wave: "var(--color-gold)", waveText: "var(--color-gold-deep)" };
  }
  if (wavelength === "teal") {
    // AutismWorks preserves its brand mark for the display tone.
    return { wave: AUTISMWORKS_BRAND_MARK, waveText: WAVELENGTHS.teal.text };
  }
  const def = WAVELENGTHS[wavelength];
  return { wave: def.display, waveText: def.text };
}

export function SurfaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SurfaceState>(DEFAULT);
  // Track all currently-dominant candidates; highest priority (most visible) wins.
  const candidates = useRef<Map<string, { state: SurfaceState; priority: number }>>(
    new Map(),
  );

  const recompute = useCallback(() => {
    let best: { state: SurfaceState; priority: number } | null = null;
    for (const entry of candidates.current.values()) {
      if (!best || entry.priority > best.priority) best = entry;
    }
    setState(best?.state ?? DEFAULT);
  }, []);

  const publish = useCallback(
    (id: string, next: SurfaceState, priority: number) => {
      candidates.current.set(id, { state: next, priority });
      recompute();
    },
    [recompute],
  );

  const withdraw = useCallback(
    (id: string) => {
      candidates.current.delete(id);
      recompute();
    },
    [recompute],
  );

  // Publish the resolved surface to the document root.
  useEffect(() => {
    const root = document.documentElement;
    const dn = DAY_NIGHT[state.dayNight];
    const { wave, waveText } = resolveWave(state.wavelength);
    root.style.setProperty("--field", dn.field);
    root.style.setProperty("--ink-on-field", dn.ink);
    root.style.setProperty("--wave", wave);
    root.style.setProperty("--wave-text", waveText);
    root.style.setProperty("--carried-light", dn.carriedLight ? "1" : "0");
    root.style.colorScheme = dn.dark ? "dark" : "light";
  }, [state]);

  const value = useMemo<SurfaceContextValue>(
    () => ({
      ...state,
      carriedLight: DAY_NIGHT[state.dayNight].carriedLight,
      publish,
      withdraw,
    }),
    [state, publish, withdraw],
  );

  return (
    <SurfaceContext.Provider value={value}>
      {/* The field transition lives on a wrapper so the whole world dawns together. */}
      <div
        className="min-h-dvh transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          backgroundColor: "var(--field)",
          color: "var(--ink-on-field)",
        }}
      >
        {children}
      </div>
    </SurfaceContext.Provider>
  );
}

export function useSurface(): SurfaceContextValue {
  const ctx = useContext(SurfaceContext);
  if (!ctx) {
    throw new Error("useSurface must be used within a SurfaceProvider");
  }
  return ctx;
}
