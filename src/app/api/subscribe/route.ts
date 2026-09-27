import { getEmailProvider } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance rate limit. Serverless instances don't share
// memory, so this only slows down naive abuse.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many attempts. Please wait a minute." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as { email?: unknown; website?: unknown } | null;

  // Honeypot filled → pretend success so bots don't retry.
  if (body?.website) return Response.json({ ok: true });

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const provider = getEmailProvider();
  if (!provider) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[subscribe] no email provider configured — would have subscribed ${email}`);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[subscribe] no email provider configured; signup dropped");
    return Response.json({ error: "Signups aren’t open yet. Please check back soon." }, { status: 503 });
  }

  const result = await provider.subscribe(email);
  if (!result.ok) return Response.json({ error: result.error }, { status: 502 });
  return Response.json({ ok: true });
}
