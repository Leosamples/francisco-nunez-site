import { book } from "@/content/book";
import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { BookStage } from "./BookStage";
import { FlashlightField } from "./FlashlightField";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-[radial-gradient(ellipse_at_70%_40%,var(--color-ink-raised),var(--color-ink)_65%)] pt-28 pb-20"
    >
      <FlashlightField />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">A new book</p>
          <h1 className="mt-6 text-6xl leading-[0.92] font-extrabold tracking-[-0.03em] sm:text-7xl lg:text-8xl">
            <span className="block text-paper">{book.titleLead}</span>
            <span className="text-glow block">{book.titleGlow}</span>
          </h1>
          <p className="mt-8 max-w-md text-xl leading-snug text-paper/75 sm:text-2xl">
            {book.subtitle.charAt(0).toUpperCase() + book.subtitle.slice(1)}.
          </p>
          <p className="mt-6 text-sm text-slate">By {book.author}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#formats" size="lg">
              Get The Book
            </ButtonLink>
            <ButtonLink href="#chapters" size="lg" variant="ghost">
              See inside
            </ButtonLink>
          </div>
        </div>
        <BookStage />
      </Container>
    </section>
  );
}
