import { hook } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function Hook() {
  return (
    <section aria-labelledby="hook-heading" className="py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={hook.eyebrow} id="hook-heading">
            {hook.heading}
          </SectionHeading>
        </Reveal>
        <div className="space-y-5 text-lg leading-relaxed text-slate">
          {hook.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className={i === 1 ? "font-semibold text-paper" : undefined}>{p}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
