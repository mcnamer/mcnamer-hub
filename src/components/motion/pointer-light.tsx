"use client";

/**
 * THE POINTER-LIGHT — the single addition to the default system cursor. A soft
 * radial luminance ~220px across at ~5% peak opacity, carried with a damped lag
 * (carried light, not a glow filter). It takes the local wavelength, is active
 * only on night/dusk fields, and vanishes on daylight — "carried light means
 * nothing at noon." One composited layer; absent on touch; retired under Calm
 * Motion. It supplements explicit hover states; it never replaces them.
 */

import { useEffect, useRef } from "react";
import { useMotion } from "./motion-provider";
import { useSurface } from "./surface-provider";

export function PointerLight() {
  const { motionEnabled } = useMotion();
  const { carriedLight } = useSurface();
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const active = motionEnabled && carriedLight;

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    // Damped follow — the light lags the pointer like a carried lantern.
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      el.style.transform = `translate3d(${current.current.x - 110}px, ${
        current.current.y - 110
      }px, 0)`;
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      <div
        ref={ref}
        className="absolute h-[220px] w-[220px] rounded-full opacity-[0.05] blur-2xl transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, var(--wave) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
