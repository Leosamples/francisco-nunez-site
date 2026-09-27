import { hook } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function Hook() {
  return (
    <section aria-labelledby="hook-heading" className="py-28 sm:py-40 lg:py-48">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal>
          <SectionHeading eyebrow={hook.eyebrow} id="hook-heading">
            {hook.heading}
          </SectionHeading>
        </Reveal>
        <div className="max-w-[60ch] space-y-6 text-lg leading-relaxed text-slate lg:pt-12">
          {hook.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={i === 1 ? "text-xl leading-snug font-semibold text-paper" : undefined}>{p}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
