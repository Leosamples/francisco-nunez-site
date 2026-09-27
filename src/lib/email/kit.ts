import type { EmailProvider } from "./index";

// Kit (ConvertKit) API v4. Creates/upserts the subscriber, then adds them
// to the launch form so the form's automations and tags apply.
// Docs: https://developers.kit.com/api-reference

const API = "https://api.kit.com/v4";

async function kitPost(path: string, body: object) {
  return fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": process.env.KIT_API_KEY!,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export const kit: EmailProvider = {
  name: "kit",
  isConfigured: () => Boolean(process.env.KIT_API_KEY && process.env.KIT_FORM_ID),
  async subscribe(email) {
    const created = await kitPost("/subscribers", { email_address: email });
    if (!created.ok) {
      console.error("[kit] create subscriber failed", created.status, await created.text());
      return { ok: false, error: "Couldn’t add you to the list. Please try again." };
    }
    const added = await kitPost(`/forms/${process.env.KIT_FORM_ID}/subscribers`, {
      email_address: email,
      referrer: process.env.NEXT_PUBLIC_SITE_URL,
    });
    if (!added.ok) {
      console.error("[kit] add to form failed", added.status, await added.text());
      return { ok: false, error: "Couldn’t add you to the list. Please try again." };
    }
    return { ok: true };
  },
};
