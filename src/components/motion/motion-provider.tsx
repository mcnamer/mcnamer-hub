"use client";

/**
 * MOTION PROVIDER — the single authority on whether the site may move.
 *
 * Two inputs, one answer:
 *   1. The OS `prefers-reduced-motion` signal (observed live).
 *   2. The ratified "Calm Motion" footer toggle (persisted to localStorage).
 *
 * When either says stop, motion stops: Breath halts, displacement zeroes, Draw
 * becomes instant presence, Fill/Bloom become crossfades. The provider writes
 * `data-calm-motion` on <html> so the CSS layer (globals.css) obeys too — one
 * source of truth spanning JS choreography and CSS ambience.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "olympus:calm-motion";

interface MotionContextValue {
  /** True when full choreography is permitted. */
  motionEnabled: boolean;
  /** The user's explicit Calm Motion preference (independent of the OS signal). */
  calmMotion: boolean;
  /** True when the OS requests reduced motion. */
  systemReduced: boolean;
  toggleCalmMotion: () => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(false);
  const [calmMotion, setCalmMotion] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Observe the OS signal live — visitors can flip it mid-session.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Restore the persisted Calm Motion choice.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setCalmMotion(true);
    setHydrated(true);
  }, []);

  const motionEnabled = hydrated && !systemReduced && !calmMotion;

  // Reflect the resolved state onto <html> for the CSS layer.
  useEffect(() => {
    const calm = calmMotion || systemReduced;
    document.documentElement.setAttribute(
      "data-calm-motion",
      calm ? "true" : "false",
    );
  }, [calmMotion, systemReduced]);

  const toggleCalmMotion = useCallback(() => {
    setCalmMotion((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const value = useMemo<MotionContextValue>(
    () => ({ motionEnabled, calmMotion, systemReduced, toggleCalmMotion }),
    [motionEnabled, calmMotion, systemReduced, toggleCalmMotion],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return ctx;
}
