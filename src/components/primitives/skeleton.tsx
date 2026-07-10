import { cn } from "@/lib/utils/cn";

/**
 * SKELETON — a loading placeholder that pulses luminosity (Breath), never
 * slides a shimmer bar across itself (that would break the no-displacement law).
 * Retires to a static block under Calm Motion via the global `.breath` rule.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("breath rounded-md bg-white/[0.06]", className)}
    />
  );
}
