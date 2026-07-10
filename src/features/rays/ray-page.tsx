import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Bloom } from "@/components/motion/bloom";
import { Stagger } from "@/components/motion/stagger";
import { LightLine } from "@/components/primitives/light-line";
import { PullQuote } from "@/components/primitives/pull-quote";
import { ProofAtom } from "@/components/primitives/proof-atom";
import { Button } from "@/components/primitives/button";
import { Photo } from "@/components/primitives/photo";
import { RayThread } from "./ray-thread";
import type { RayContent } from "./types";
import type { DayNight } from "@/lib/design/daynight";
import { cn } from "@/lib/utils/cn";

/**
 * THE RAY PAGE — the six-movement anatomy rendered in a single wavelength, at
 * ~60% of the homepage's cinematic intensity (intent deserves efficiency).
 * Arrival → Problem → Guide → Path → Proof → Door. Every ask sits within one
 * scroll of evidence; AutismWorks inverts commerce behind care via its content.
 *
 * The whole surface adopts the ray's wavelength because each movement's Section
 * publishes it to the SurfaceProvider — "entering a ray shifts the environment
 * into its wavelength."
 */
export function RayPage({ content }: { content: RayContent }) {
  const isDay = content.dayNight === "day";
  // Movements alternate held/released; proof and door sit on the settled field.
  return (
    <>
      <RayThread />
      <Arrival content={content} />
      <Problem content={content} dark={!isDay} />
      <Guide content={content} dark={!isDay} />
      <Path content={content} dark={!isDay} />
      <Proof content={content} dark={!isDay} />
      <Door content={content} />
    </>
  );
}

/** A movement wrapper: anchors the Thread and declares the ray wavelength. */
function Movement({
  index,
  label,
  dayNight,
  wavelength,
  children,
  className,
  daySurface,
}: {
  index: number;
  label: string;
  dayNight: DayNight;
  wavelength: RayContent["wavelength"];
  children: React.ReactNode;
  className?: string;
  daySurface?: boolean;
}) {
  return (
    <Section
      id={`movement-${index}`}
      dayNight={dayNight}
      wavelength={wavelength}
      label={`${label} — movement ${index + 1} of 6`}
      className={cn(
        "px-6 md:px-12",
        daySurface &&
          "bg-[var(--color-light-cream)] text-[var(--color-ink)]",
        className,
      )}
    >
      <div data-movement-index={index} className="mx-auto max-w-[var(--container-content)]">
        {children}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- Arrival -- */
function Arrival({ content }: { content: RayContent }) {
  const { arrival, dayNight, wavelength } = content;
  return (
    <Movement
      index={0}
      label="Arrival"
      dayNight={dayNight}
      wavelength={wavelength}
      daySurface={dayNight === "day"}
      className="flex min-h-[88vh] flex-col justify-center py-[var(--breath)]"
    >
      <Bloom>
        <p className="murmur mb-6" style={{ color: "var(--wave-text)" }}>
          {arrival.eyebrow}
        </p>
        <div className="mb-8 w-24">
          <LightLine draw thickness={2} glow={dayNight !== "day"} />
        </div>
        <h1 className="font-voice text-display-hero text-balance leading-[1.02]">
          {arrival.headline}
        </h1>
        <p className="mt-8 max-w-2xl text-body-large opacity-80">{arrival.sub}</p>
      </Bloom>

      {arrival.subPaths && (
        <Stagger step={0.1} className="mt-16 grid gap-4 md:grid-cols-3">
          {arrival.subPaths.map((sp) => (
            <Link
              key={sp.href}
              href={sp.href}
              className="group relative flex flex-col rounded-xl border border-current/10 p-6 no-underline transition-colors hover:border-current/25"
            >
              <div className="mb-4 w-10">
                <LightLine responsive thickness={2} />
              </div>
              {sp.signal && (
                <span
                  className="murmur mb-2"
                  style={{ color: "var(--wave-text)" }}
                >
                  {sp.signal}
                </span>
              )}
              <h2 className="font-voice text-title">{sp.label}</h2>
              <p className="mt-2 flex-1 text-body opacity-70">{sp.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-caption opacity-60 transition-all group-hover:gap-3">
                Enter
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
              </span>
            </Link>
          ))}
        </Stagger>
      )}
    </Movement>
  );
}

/* ---------------------------------------------------------------- Problem -- */
function Problem({ content, dark }: { content: RayContent; dark: boolean }) {
  return (
    <Movement
      index={1}
      label="Problem"
      dayNight={dark ? "dusk" : "day"}
      wavelength={content.wavelength}
      daySurface={!dark}
      className="py-[var(--breath)]"
    >
      <Bloom>
        <div className="max-w-3xl">
          <h2 className="font-voice text-display-1 text-balance">
            {content.problem.headline}
          </h2>
          <p className="mt-8 text-body-large leading-relaxed opacity-80">
            {content.problem.body}
          </p>
        </div>
      </Bloom>
    </Movement>
  );
}

/* ------------------------------------------------------------------ Guide -- */
function Guide({ content, dark }: { content: RayContent; dark: boolean }) {
  return (
    <Movement
      index={2}
      label="Guide"
      dayNight={dark ? "dawn" : "day"}
      wavelength={content.wavelength}
      daySurface={!dark}
      className="py-[var(--breath)]"
    >
      <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        <div className="md:order-2">
          <Bloom>
            <h2 className="font-voice text-display-1 text-balance">
              {content.guide.headline}
            </h2>
            <p className="mt-8 text-body-large leading-relaxed opacity-80">
              {content.guide.body}
            </p>
          </Bloom>
          <Stagger step={0.08} className="mt-10 grid gap-3" as="ul">
            {content.guide.credentials.map((c) => (
              <li key={c} className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="h-4 w-px shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--wave)" }}
                />
                <span className="text-body">{c}</span>
              </li>
            ))}
          </Stagger>
        </div>
        <div className="md:order-1">
          <Photo
            alt={`Jody McNamer at work — ${content.business}, in Puget Sound light.`}
            ratio="4 / 5"
            tintWavelength
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>
    </Movement>
  );
}

/* ------------------------------------------------------------------- Path -- */
function Path({ content, dark }: { content: RayContent; dark: boolean }) {
  return (
    <Movement
      index={3}
      label="Path"
      dayNight={dark ? "dusk" : "day"}
      wavelength={content.wavelength}
      daySurface={!dark}
      className="py-[var(--breath)]"
    >
      <Bloom>
        <h2 className="mb-16 font-voice text-display-1 text-balance">
          {content.path.headline}
        </h2>
      </Bloom>
      {/* The process as a lit, numbered line the visitor walks. */}
      <Stagger step={0.12} className="relative grid gap-10" as="ol">
        {content.path.steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[auto_1fr] gap-6">
            <div className="flex flex-col items-center">
              <span
                className="grid size-10 place-items-center rounded-full border text-caption tabular-nums"
                style={{ borderColor: "var(--wave)", color: "var(--wave-text)" }}
              >
                {i + 1}
              </span>
              {i < content.path.steps.length - 1 && (
                <span
                  aria-hidden
                  className="mt-2 w-px flex-1 rounded-full opacity-40"
                  style={{ backgroundColor: "var(--wave)", minHeight: 32 }}
                />
              )}
            </div>
            <div className="pb-2">
              <h3 className="font-voice text-title">{step.title}</h3>
              <p className="mt-2 max-w-xl text-body opacity-75">{step.body}</p>
            </div>
          </li>
        ))}
      </Stagger>
    </Movement>
  );
}

/* ------------------------------------------------------------------ Proof -- */
function Proof({ content, dark }: { content: RayContent; dark: boolean }) {
  return (
    <Movement
      index={4}
      label="Proof"
      dayNight={dark ? "dusk" : "day"}
      wavelength={content.wavelength}
      daySurface={!dark}
      className="py-[var(--breath)]"
    >
      <Bloom>
        <p className="murmur mb-4" style={{ color: "var(--wave-text)" }}>
          The record
        </p>
        <h2 className="mb-16 font-voice text-display-2 text-balance">
          {content.proof.headline}
        </h2>
      </Bloom>
      <Stagger
        step={0.12}
        className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {content.proof.figures.map((f) => (
          <ProofAtom
            key={f.figure}
            figure={f.figure}
            context={f.context}
            size="compact"
          />
        ))}
      </Stagger>
      {content.proof.quote && (
        <div className="mt-24">
          <PullQuote cite={content.proof.quote.cite}>
            {content.proof.quote.text}
          </PullQuote>
        </div>
      )}
    </Movement>
  );
}

/* ------------------------------------------------------------------- Door -- */
function Door({ content }: { content: RayContent }) {
  const joinPosture = content.door.posture === "join";
  return (
    <Movement
      index={5}
      label="Door"
      dayNight={content.dayNight === "day" ? "day" : "night"}
      wavelength={content.wavelength}
      daySurface={content.dayNight === "day"}
      className="flex min-h-[80vh] flex-col items-center justify-center py-[var(--breath)] text-center"
    >
      <Bloom>
        <div className="mx-auto mb-8 w-16">
          <LightLine draw thickness={2} glow={content.dayNight !== "day"} />
        </div>
        <h2 className="mx-auto max-w-3xl font-voice text-display-1 text-balance">
          {content.door.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-body-large opacity-80">
          {content.door.body}
        </p>
        <div className="mt-12 flex flex-col items-center gap-4">
          <Button href={content.door.cta.href} magnetic>
            {content.door.cta.label}
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
          </Button>
          <p className="text-caption opacity-50">
            {joinPosture
              ? "Nothing to buy to belong."
              : "No ask you haven't already seen the evidence for."}
          </p>
        </div>
      </Bloom>
    </Movement>
  );
}
