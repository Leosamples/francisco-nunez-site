"use client";

import { useState } from "react";
import { emailCapture } from "@/content/book";
import { buttonClass } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";

type Status = "idle" | "sending" | "success" | "error";

export function EmailCapture() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="updates" aria-labelledby="updates-heading" className="scroll-mt-16 pb-24 sm:pb-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-ink-line bg-[radial-gradient(ellipse_at_top,rgba(79,200,240,0.12),transparent_70%)] px-6 py-12 text-center sm:px-12">
          <h2 id="updates-heading" className="text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
            {emailCapture.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate">{emailCapture.body}</p>

          {status === "success" ? (
            <p role="status" className="mt-8 font-semibold text-cyan">
              You’re on the list. We’ll email you at launch.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="updates-email" className="sr-only">
                Email address
              </label>
              <input
                id="updates-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-ink-line bg-ink px-5 py-3 text-paper placeholder:text-slate/70 focus:border-cyan focus:outline-none"
              />
              {/* honeypot — hidden from people, filled by bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "md")}>
                {status === "sending" ? "Sending…" : "Notify me"}
              </button>
            </form>
          )}
          <p role="alert" className="mt-3 min-h-5 text-sm text-red-300">
            {status === "error" ? message : ""}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
