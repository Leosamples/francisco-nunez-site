import { book } from "@/content/book";
import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { BookStage } from "./BookStage";
import { FlashlightField } from "./FlashlightField";
import { LaserBeam } from "./LaserBeam";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-[radial-gradient(ellipse_at_70%_40%,var(--color-ink-raised),var(--color-ink)_70%)] pt-24 pb-16">
      <FlashlightField />
      <LaserBeam />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        <div className="max-w-xl space-y-7">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">The new book by {book.author}</p>
          <h1 className="text-5xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            <span className="text-flame">{book.title}</span>
          </h1>
          <p className="text-xl leading-snug font-semibold text-paper/90 sm:text-2xl">
            {book.subtitle.charAt(0).toUpperCase() + book.subtitle.slice(1)}.
          </p>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate">By {book.author}</p>
          <div className="flex flex-wrap gap-3 pt-1">
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
