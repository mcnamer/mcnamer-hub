"use server";

/**
 * THE CONNECT ACTION — a Server Action that receives an intent-routed inquiry.
 * It re-validates on the server (never trust the client), then hands off to the
 * lead sink. In production this is where the five-agent command-center /
 * HubSpot integration lives ("HubSpot as the memory, the site as the front
 * door"); here it validates and acknowledges so the surface is fully wired.
 *
 * The contract that matters: every submission is answered instantly with an
 * honest next step — "silence after a form is where trust dies."
 */

import { connectSchema, type ConnectResult } from "./schema";

export async function submitConnect(
  _prev: ConnectResult | null,
  formData: FormData,
): Promise<ConnectResult> {
  const parsed = connectSchema.safeParse({
    intent: formData.get("intent"),
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: ConnectResult["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      message: "A couple of details need a second look.",
      fieldErrors,
    };
  }

  // Hand-off point — deliver to the CRM / command-center here.
  // await deliverLead(parsed.data);

  return {
    ok: true,
    message:
      "Thank you — this reached me directly. You'll hear back within one business day, from a real person.",
  };
}
