import { Skeleton } from "@/components/primitives/skeleton";

/** The Door's loading state — a calm skeleton, never a spinner. */
export default function ConnectLoading() {
  return (
    <div className="flex min-h-dvh items-center px-6 py-[calc(var(--breath)+4rem)] md:px-12">
      <div className="mx-auto grid w-full max-w-[var(--container-content)] gap-16 md:grid-cols-[5fr_6fr] md:gap-24">
        <div className="space-y-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-px w-24" />
          <Skeleton className="h-16 w-full max-w-md" />
          <Skeleton className="h-24 w-full max-w-md" />
        </div>
        <div className="space-y-6 md:pt-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
