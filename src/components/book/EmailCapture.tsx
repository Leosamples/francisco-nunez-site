import { emailCapture } from "@/content/book";
import { buttonClass } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";

// Visual placeholder only — not connected to an email platform yet.
// The field is disabled so visitors can't type an address that goes nowhere.
export function EmailCapture() {
  return (
    <section id="updates" aria-labelledby="updates-heading" className="scroll-mt-20 pb-24 sm:pb-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-ink-line bg-[radial-gradient(ellipse_at_top,rgba(79,200,240,0.12),transparent_70%)] px-6 py-12 text-center sm:px-12">
          <h2 id="updates-heading" className="text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
            {emailCapture.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate">{emailCapture.body}</p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="updates-email" className="sr-only">
              Email address
            </label>
            <input
              id="updates-email"
              type="email"
              disabled
              placeholder="you@example.com"
              className="min-w-0 flex-1 cursor-default rounded-full border border-ink-line bg-ink px-5 py-3 text-paper placeholder:text-slate/70"
            />
            <span aria-disabled="true" className={`${buttonClass("primary", "md")} cursor-default`}>
              Notify me
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
