import { book, pullQuote } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";

export function PullQuote() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <figure className="relative mx-auto max-w-4xl lg:pl-16">
            <span
              aria-hidden
              className="absolute -top-6 left-0 font-serif text-7xl leading-none text-red sm:text-8xl lg:-left-2 lg:top-0"
            >
              “
            </span>
            <blockquote className="pt-10 font-serif text-4xl leading-[1.15] font-light tracking-[-0.01em] text-balance text-paper italic sm:text-5xl lg:pt-0 lg:text-6xl">
              {pullQuote}
            </blockquote>
            <figcaption className="mt-10 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-muted uppercase">
              {book.author} · {book.title}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
