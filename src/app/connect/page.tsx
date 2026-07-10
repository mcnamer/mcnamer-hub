import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Bloom } from "@/components/motion/bloom";
import { LightLine } from "@/components/primitives/light-line";
import { ContactForm } from "@/features/connect/contact-form";
import { pageMetadata } from "@/lib/seo/metadata";

/**
 * CONNECT — "The Door." One unified contact surface that routes by intent. One
 * door, many rooms. The intent arrives via ?intent= from any ray's Door, and
 * the form pre-selects it — the router doing the triage before a field is typed.
 */

export const metadata: Metadata = pageMetadata({
  title: "Connect",
  description:
    "One door, many rooms. Tell Jody McNamer what you need — buying, selling, financing, coaching, or support — and reach a real person within one business day.",
  path: "/connect",
});

interface ConnectProps {
  searchParams: Promise<{ intent?: string }>;
}

export default async function ConnectPage({ searchParams }: ConnectProps) {
  const { intent } = await searchParams;

  return (
    <Section
      dayNight="night"
      label="Connect — the door"
      className="flex min-h-dvh items-center px-6 py-[calc(var(--breath)+4rem)] md:px-12"
    >
      <div className="mx-auto grid w-full max-w-[var(--container-content)] gap-16 md:grid-cols-[5fr_6fr] md:gap-24">
        <div>
          <Bloom>
            <p className="murmur mb-6 opacity-60">The door</p>
            <div className="mb-8 w-24">
              <LightLine draw thickness={2} glow />
            </div>
            <h1 className="font-voice text-display-1 text-balance">
              Where do you want to begin?
            </h1>
            <p className="mt-8 max-w-md text-body-large opacity-80">
              One door, many rooms. Name what you need and I&apos;ll open the
              right one — and only that one. No funnel, no pressure, no wall of
              inputs.
            </p>
          </Bloom>
        </div>

        <div className="md:pt-16">
          <ContactForm defaultIntent={intent} />
        </div>
      </div>
    </Section>
  );
}
