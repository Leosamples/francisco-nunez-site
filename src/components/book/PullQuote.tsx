import { book, pullQuote } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";

export function PullQuote() {
  return (
    <section className="relative overflow-hidden border-y border-ink-line bg-ink-raised py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-[4deg] bg-[linear-gradient(90deg,transparent,rgba(79,200,240,0.35),transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-serif text-3xl leading-tight text-balance italic sm:text-4xl lg:text-5xl">
              “{pullQuote}”
            </blockquote>
            <figcaption className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-cyan">
              {book.author} · {book.title}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
