"use client";

/**
 * THE CONTACT FORM — minimum viable fields, engineered for thumbs and autofill.
 * React Hook Form + Zod drive live, respectful validation; the Server Action is
 * the authority. The form lights up as it is completed: focus Draws the rule in
 * the contextual wavelength, a valid field self-Draws a check, an error Blooms a
 * warm rule with an icon and words (never colour alone). Every submission is
 * answered instantly on-screen.
 */

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Send } from "lucide-react";

import { submitConnect } from "./actions";
import { connectSchema, type ConnectInput } from "./schema";
import { INTENTS } from "@/lib/constants/content";
import { WAVELENGTHS } from "@/lib/design/wavelengths";
import { cn } from "@/lib/utils/cn";

function intentColor(id: string): string {
  const intent = INTENTS.find((i) => i.id === id);
  if (!intent || intent.wavelength === "spine") return "var(--color-gold)";
  return WAVELENGTHS[intent.wavelength].display;
}

export function ContactForm({ defaultIntent }: { defaultIntent?: string }) {
  const initialIntent =
    INTENTS.find((i) => i.id === defaultIntent)?.id ?? INTENTS[0]!.id;

  const [state, formAction] = useActionState(submitConnect, null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    watch,
    formState: { errors, touchedFields, dirtyFields },
    reset,
  } = useForm<ConnectInput>({
    resolver: zodResolver(connectSchema),
    mode: "onTouched",
    defaultValues: {
      intent: initialIntent as ConnectInput["intent"],
      name: "",
      email: "",
      message: "",
    },
  });

  const currentIntent = watch("intent");

  // On a successful server round-trip, clear the fields.
  useEffect(() => {
    if (state?.ok) reset();
  }, [state?.ok, reset]);

  if (state?.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center"
        role="status"
      >
        <div
          className="mx-auto grid size-12 place-items-center rounded-full"
          style={{ backgroundColor: intentColor(currentIntent) }}
        >
          <Check size={22} strokeWidth={2} className="text-[var(--color-field-midnight)]" aria-hidden />
        </div>
        <p className="mt-6 text-body-large text-balance">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid gap-6"
      style={{ ["--wave" as string]: intentColor(currentIntent) }}
      noValidate
    >
      {/* Intent — the router as an honest select. */}
      <Field label="I'm reaching out about" htmlFor="intent">
        <select
          id="intent"
          {...register("intent")}
          className="w-full appearance-none bg-transparent py-2 text-body-large focus:outline-none"
        >
          {INTENTS.map((i) => (
            <option
              key={i.id}
              value={i.id}
              className="bg-[var(--color-field-navy)]"
            >
              {i.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Your name"
        htmlFor="name"
        error={touchedFields.name ? errors.name?.message : undefined}
        valid={!!dirtyFields.name && !errors.name}
      >
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Rivera"
          {...register("name")}
          className="w-full bg-transparent py-2 text-body-large placeholder:opacity-30 focus:outline-none"
        />
      </Field>

      <Field
        label="Email"
        htmlFor="email"
        error={touchedFields.email ? errors.email?.message : undefined}
        valid={!!dirtyFields.email && !errors.email}
      >
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="jane@example.com"
          {...register("email")}
          className="w-full bg-transparent py-2 text-body-large placeholder:opacity-30 focus:outline-none"
        />
      </Field>

      <Field label="Anything you'd like me to know? (optional)" htmlFor="message">
        <textarea
          id="message"
          rows={4}
          placeholder="A sentence is plenty."
          {...register("message")}
          className="w-full resize-none bg-transparent py-2 text-body-large placeholder:opacity-30 focus:outline-none"
        />
      </Field>

      {state && !state.ok && (
        <p
          role="alert"
          className="flex items-center gap-2 text-caption text-[var(--color-amber)]"
        >
          <AlertCircle size={15} strokeWidth={1.75} aria-hidden />
          {state.message}
        </p>
      )}

      <SubmitButton intent={currentIntent} />
      <p className="text-caption opacity-50">
        This reaches Jody directly. You&apos;ll hear back within one business day.
      </p>
    </form>
  );
}

/* --------------------------------------------------------------- Field ---- */
interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  valid?: boolean;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, valid, children }: FieldProps) {
  return (
    <div className="group">
      <label htmlFor={htmlFor} className="murmur mb-1 block opacity-60">
        {label}
      </label>
      <div className="relative flex items-center gap-2">
        <div className="flex-1">{children}</div>
        {/* Valid completion self-Draws a check. */}
        <AnimatePresence>
          {valid && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="shrink-0"
              style={{ color: "var(--wave)" }}
            >
              <Check size={16} strokeWidth={2} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {/* The rule: linen at rest, Draws the wavelength on focus, warm on error. */}
      <div
        className={cn(
          "h-px w-full origin-left rounded-full transition-all duration-300",
          "bg-white/15",
          "group-focus-within:h-[2px]",
        )}
        style={{
          backgroundColor: error
            ? "var(--color-amber)"
            : undefined,
        }}
      >
        <span
          aria-hidden
          className="block h-full w-0 origin-left rounded-full transition-all duration-300 group-focus-within:w-full"
          style={{ backgroundColor: error ? "var(--color-amber)" : "var(--wave)" }}
        />
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-caption text-[var(--color-amber)]">
          <AlertCircle size={13} strokeWidth={1.75} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------- SubmitButton --- */
function SubmitButton({ intent }: { intent: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-body font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      style={{
        backgroundColor: intentColor(intent),
        color: "var(--color-field-midnight)",
      }}
    >
      {pending ? "Sending…" : "Send"}
      <Send
        size={17}
        strokeWidth={1.75}
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );
}
