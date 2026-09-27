import Image from "next/image";
import { author } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function AboutAuthor() {
  return (
    <section id="author" aria-labelledby="author-heading" className="scroll-mt-16 border-t border-ink-line py-24 sm:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div aria-hidden className="bg-flame absolute -inset-px rounded-2xl opacity-60 blur-xl" />
            <Image
              src={author.photo.src}
              width={author.photo.width}
              height={author.photo.height}
              alt={`Portrait of ${author.name}`}
              sizes="(min-width: 768px) 24rem, 90vw"
              className="relative aspect-[4/5] w-full rounded-2xl object-cover object-top"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6">
          <SectionHeading eyebrow="About the author" id="author-heading">
            {author.name}
          </SectionHeading>
          <div className="space-y-4 text-lg leading-relaxed text-slate">
            {author.bio.map((p, i) => (
              <p key={i} className={i === author.bio.length - 1 ? "font-semibold text-paper" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
