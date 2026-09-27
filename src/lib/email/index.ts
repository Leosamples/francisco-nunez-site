// Email-list adapter. The API route only talks to `subscribe()`; to switch
// platforms, add a provider file and register it below.

import { kit } from "./kit";

export type SubscribeResult = { ok: true } | { ok: false; error: string };

export type EmailProvider = {
  name: string;
  isConfigured: () => boolean;
  subscribe: (email: string) => Promise<SubscribeResult>;
};

const providers: Record<string, EmailProvider> = { kit };

export function getEmailProvider(): EmailProvider | null {
  const p = providers[process.env.EMAIL_PROVIDER ?? "kit"];
  return p && p.isConfigured() ? p : null;
}
