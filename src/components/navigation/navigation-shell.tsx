"use client";

/**
 * NAVIGATION SHELL — wires the three navigation layers together and owns the
 * Refractor's open state. The Refractor can be summoned three ways (the
 * blueprint's rule: no interaction may be the only way to do something): the
 * Prism Bar's menu affordance, and the ⌘K / Ctrl-K keyboard shortcut.
 */

import { useCallback, useEffect, useState } from "react";
import { PrismBar } from "./prism-bar";
import { Refractor } from "./refractor";
import { ScrollProgress } from "./scroll-progress";

export function NavigationShell() {
  const [refractorOpen, setRefractorOpen] = useState(false);

  const openRefractor = useCallback(() => setRefractorOpen(true), []);
  const closeRefractor = useCallback(() => setRefractorOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setRefractorOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollProgress />
      <PrismBar onOpenRefractor={openRefractor} />
      <Refractor open={refractorOpen} onClose={closeRefractor} />
    </>
  );
}
