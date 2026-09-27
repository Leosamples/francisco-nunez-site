import { book, pullQuote } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";

export function PullQuote() {
  return (
    <section className="border-t border-ink-line py-28 sm:py-40 lg:py-48">
      <Container>
        <Reveal>
          <figure className="mx-auto max-w-5xl text-center">
            <blockquote className="font-serif text-4xl leading-[1.12] text-balance italic sm:text-5xl lg:text-6xl">
              “{pullQuote}”
            </blockquote>
            <figcaption className="mt-10 text-sm text-slate">
              {book.author}, <cite className="not-italic">{book.title}</cite>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
