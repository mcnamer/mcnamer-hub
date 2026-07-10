"use client";

/**
 * THE BUTTON — the one primary button style. A quiet capsule that Fills with
 * the contextual wavelength from its left edge on hover/focus; press deepens
 * the fill and drops the 2px lift. Disabled dims to 40% and loses its
 * light-line — "lightless = dormant," never gray.
 *
 * Optional magnetic pull (a Settle toward the pointer, capped at 6px) is the
 * blueprint's "magnetic button"; it retires under Calm Motion and on touch.
 *
 * Polymorphic: renders an <a> (via next/link) when `href` is present, else a
 * <button>. Keyboard users get the identical Fill + lift choreography.
 */

import Link from "next/link";
import {
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotion } from "@/components/motion/motion-provider";
import { cn } from "@/lib/utils/cn";

type Variant = "solid" | "quiet";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  prefetch?: boolean;
}

/** Handlers whose React and Framer Motion signatures conflict on motion.button. */
type ConflictingHandlers =
  | "className"
  | "children"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop";

interface ActionButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers> {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

const MAGNET_CAP = 6;

export function Button(props: ButtonProps) {
  const { children, variant = "solid", magnetic = false, className } = props;
  const { motionEnabled } = useMotion();
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMove(e: React.PointerEvent) {
    if (!magnetic || !motionEnabled || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAGNET_CAP, Math.min(MAGNET_CAP, relX * 0.3)));
    y.set(Math.max(-MAGNET_CAP, Math.min(MAGNET_CAP, relY * 0.3)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3",
    "text-body font-medium no-underline",
    "transition-[transform,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:-translate-y-[2px] active:translate-y-0 focus-visible:-translate-y-[2px]",
    variant === "solid"
      ? "text-[var(--field)] [--fill-opacity:1]"
      : "border border-[var(--color-field-slate)] text-[var(--ink-on-field)] [--fill-opacity:0.14]",
    "disabled:pointer-events-none disabled:opacity-40 disabled:[--fill-opacity:0]",
    className,
  );

  const inner = (
    <>
      {/* The Fill: wavelength flooding from the left edge. Transform-only. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-left scale-x-0 rounded-full",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100",
        )}
        style={{
          backgroundColor: "var(--wave)",
          opacity: "var(--fill-opacity)" as unknown as number,
        }}
      />
      {/* The light-line beneath the capsule — dormant on disabled. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-1/2 h-px w-8 -translate-x-1/2 rounded-full opacity-70 transition-all duration-300 group-hover:w-12 group-focus-visible:w-12"
        style={{ backgroundColor: "var(--wave)" }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const sharedMotion = {
    ref: ref as React.Ref<never>,
    style: magnetic ? { x: springX, y: springY } : undefined,
    onPointerMove: handleMove,
    onPointerLeave: reset,
  };

  if ("href" in props && props.href) {
    return (
      <motion.span {...sharedMotion} className="inline-block">
        <Link
          href={props.href}
          prefetch={props.prefetch}
          className={classes}
        >
          {inner}
        </Link>
      </motion.span>
    );
  }

  const { href: _href, magnetic: _m, variant: _v, className: _c, children: _ch, ...rest } =
    props as ActionButtonProps;
  void _href;
  void _m;
  void _v;
  void _c;
  void _ch;

  return (
    <motion.button {...sharedMotion} className={classes} {...rest}>
      {inner}
    </motion.button>
  );
}
