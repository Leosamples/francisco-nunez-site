import { focusFramework } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function FocusFramework() {
  const { eyebrow, heading, intro, disciplines } = focusFramework;
  return (
    <section id="bonus" aria-labelledby="bonus-heading" className="scroll-mt-16 pb-24 sm:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-cyan/25 bg-ink-raised p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 size-72 rounded-full bg-cyan/10 blur-3xl"
          />
          <Reveal className="relative max-w-2xl space-y-5">
            <span className="bg-flame inline-block rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
            <SectionHeading id="bonus-heading">{heading}</SectionHeading>
            <p className="text-lg text-slate">{intro}</p>
          </Reveal>

          <ol className="relative mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((d, i) => (
              <li key={d.title} className="bg-ink-raised">
                <Reveal delay={(i % 3) * 0.08} className="h-full space-y-3 p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">
                    Discipline {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-extrabold tracking-tight">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-slate">{d.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
