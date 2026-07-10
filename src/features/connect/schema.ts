import { z } from "zod";
import { INTENTS } from "@/lib/constants/content";

/**
 * THE CONNECT SCHEMA — minimum viable fields. "Forms never exceed minimum
 * viable fields; the intent router does the triage." Shared by the client form
 * (React Hook Form resolver) and the server action (re-validation) — one schema,
 * validated on both sides.
 */

const intentIds = INTENTS.map((i) => i.id) as [string, ...string[]];

export const connectSchema = z.object({
  intent: z.enum(intentIds),
  name: z
    .string()
    .trim()
    .min(1, "Please share your name.")
    .max(120, "That name looks a little long."),
  email: z
    .string()
    .trim()
    .min(1, "An email lets me reach you.")
    .email("That email doesn't look right."),
  message: z
    .string()
    .trim()
    .max(2000, "Let's keep it under 2000 characters for now.")
    .optional()
    .or(z.literal("")),
});

export type ConnectInput = z.infer<typeof connectSchema>;

export interface ConnectResult {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ConnectInput, string>>;
}
