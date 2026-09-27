import { formats } from "@/content/book";
import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function FormatCards() {
  return (
    <section id="formats" aria-labelledby="formats-heading" className="scroll-mt-20 border-t border-ink-line py-28 sm:py-40 lg:py-48">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Get the book" id="formats-heading">
            Pick your format.
          </SectionHeading>
        </Reveal>
        <ul className="mt-16 grid border-y border-ink-line md:mt-24 md:grid-cols-3 md:divide-x md:divide-ink-line">
          {formats.map((f, i) => (
            <li key={f.name} className="border-b border-ink-line last:border-b-0 md:border-b-0">
              <Reveal delay={i * 0.08} className="flex h-full flex-col py-10 md:px-10 md:first:pl-0">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate">{f.name}</h3>
                <p className="mt-6 text-6xl font-bold tracking-tight">{f.price}</p>
                <p className="mt-4 flex-1 text-slate">{f.note}</p>
                {f.href ? (
                  <ButtonLink href={f.href} className="mt-10 self-start">
                    Buy the {f.name.toLowerCase()}
                  </ButtonLink>
                ) : (
                  // Visual placeholder until distributor links are final.
                  <span aria-disabled="true" className="mt-10 text-sm font-semibold text-paper/70">
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
