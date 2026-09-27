import Image from "next/image";
import { author } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function AboutAuthor() {
  return (
    <section id="author" aria-labelledby="author-heading" className="scroll-mt-20 py-28 sm:py-40 lg:py-48">
      <Container className="grid items-center gap-14 md:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <Image
            src={author.photo.src}
            width={author.photo.width}
            height={author.photo.height}
            alt={`Portrait of ${author.name}`}
            sizes="(min-width: 768px) 28rem, 90vw"
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-lg object-cover object-top"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="About the author" id="author-heading">
            {author.name}
          </SectionHeading>
          <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-slate">
            {author.bio.map((p, i) => (
              <p key={i} className={i === author.bio.length - 1 ? "text-paper" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
