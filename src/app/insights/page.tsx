import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Bloom } from "@/components/motion/bloom";
import { LightLine } from "@/components/primitives/light-line";
import { InsightsExplorer } from "@/features/insights/insights-explorer";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * INSIGHTS — "The Signal." The living layer: video and writing across all five
 * businesses, filterable by ray. It powers return visits and the SEO engine —
 * 365 scattered topics resolved into topical clusters.
 */

export const metadata: Metadata = pageMetadata({
  title: "Insights — The Signal",
  description:
    "The Signal: video and writing across real estate, mortgage, coaching, leads, and AutismWorks — filterable by ray. Practical, person-first, and always evidence-first.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <Section
      dayNight="dusk"
      label="Insights — the signal"
      className="min-h-dvh px-6 pb-[var(--breath)] pt-[calc(var(--breath)+4rem)] md:px-12"
    >
      <div className="mx-auto max-w-[var(--container-content)]">
        <Bloom>
          <p className="murmur mb-6 opacity-60">The signal</p>
          <div className="mb-8 w-24">
            <LightLine draw thickness={2} glow />
          </div>
          <h1 className="max-w-3xl font-voice text-display-1 text-balance">
            What I know, across all five ways.
          </h1>
          <p className="mt-8 max-w-2xl text-body-large opacity-80">
            Filter by the way that brought you here — or read across the whole
            spectrum. Each piece links back to its ray and to the record behind
            it.
          </p>
        </Bloom>

        <div className="mt-20">
          <InsightsExplorer />
        </div>
      </div>
    </Section>
  );
}
