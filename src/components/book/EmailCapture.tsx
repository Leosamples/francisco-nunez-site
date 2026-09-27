import { emailCapture } from "@/content/book";
import { buttonClass } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";

// Visual placeholder only — not connected to an email platform yet.
// The field is disabled so visitors can't type an address that goes nowhere.
export function EmailCapture() {
  return (
    <section id="updates" aria-labelledby="updates-heading" className="scroll-mt-20 border-t border-ink-line py-28 sm:py-40">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="updates-heading" className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {emailCapture.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-slate">{emailCapture.body}</p>
          <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
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
