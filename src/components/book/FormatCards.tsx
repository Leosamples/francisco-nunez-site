import { formats } from "@/content/book";
import { ButtonLink, buttonClass } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function FormatCards() {
  return (
    <section id="formats" aria-labelledby="formats-heading" className="scroll-mt-20 border-t border-ink-line py-24 sm:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionHeading eyebrow="Get the book" id="formats-heading">
            Pick your format.
          </SectionHeading>
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {formats.map((f, i) => (
            <li key={f.name}>
              <Reveal
                delay={i * 0.08}
                className="flex h-full flex-col rounded-2xl border border-ink-line bg-ink-raised p-7 transition-colors hover:border-cyan/50"
              >
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate">{f.name}</h3>
                <p className="mt-4 text-5xl font-extrabold tracking-tight">{f.price}</p>
                <p className="mt-3 flex-1 text-slate">{f.note}</p>
                {f.href ? (
                  <ButtonLink href={f.href} className="mt-8 w-full">
                    Buy the {f.name.toLowerCase()}
                  </ButtonLink>
                ) : (
                  // Visual placeholder until distributor links are final.
                  <span
                    aria-disabled="true"
                    className={`${buttonClass("ghost")} mt-8 w-full cursor-default hover:border-ink-line hover:text-paper`}
                  >
                    Coming soon — get notified
                  </span>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
