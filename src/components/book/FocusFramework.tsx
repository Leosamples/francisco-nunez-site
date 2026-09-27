import { focusFramework } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function FocusFramework() {
  const { eyebrow, heading, intro, disciplines } = focusFramework;
  return (
    <section id="bonus" aria-labelledby="bonus-heading" className="scroll-mt-20 border-t border-ink-line py-28 sm:py-40 lg:py-48">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <SectionHeading eyebrow={eyebrow} id="bonus-heading">
            {heading}
          </SectionHeading>
          <p className="max-w-[60ch] text-lg leading-relaxed text-slate lg:pt-12">{intro}</p>
        </Reveal>

        <ol className="mt-20 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
          {disciplines.map((d, i) => (
            <li key={d.title}>
              <Reveal delay={(i % 3) * 0.08} className="border-t border-ink-line pt-6">
                <p className="text-sm font-semibold tabular-nums text-cyan">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{d.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
