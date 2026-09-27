import { book } from "@/content/book";
import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Eyebrow } from "@/components/site/SectionHeading";
import { BookStage } from "./BookStage";
import { FlashlightField } from "./FlashlightField";
import { withLaser } from "./LaserWord";

export function Hero() {
  const dek = book.subtitle.charAt(0).toUpperCase() + book.subtitle.slice(1) + ".";
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-[radial-gradient(ellipse_at_70%_40%,var(--color-ink-raised),var(--color-ink)_65%)] pt-28 pb-20"
    >
      <FlashlightField />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div className="max-w-2xl">
          <Eyebrow className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-cyan" />A book preview
          </Eyebrow>
          <h1 className="mt-8 font-serif text-6xl leading-[0.95] font-medium tracking-[-0.025em] sm:text-7xl lg:text-[6.25rem]">
            <span className="block text-paper">{book.titleLead}</span>
            <span className="text-glow block">{book.titleGlow}</span>
          </h1>
          <p className="mt-8 max-w-lg font-serif text-2xl leading-snug font-light text-paper/80 italic sm:text-[1.75rem]">
            {withLaser(dek)}
          </p>
          <p className="mt-8 font-sans text-sm text-slate">
            By <span className="text-paper">{book.author}</span>
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="#formats" size="lg">
              Get The Book
            </ButtonLink>
            <a
              href="#excerpt"
              className="font-sans text-sm font-semibold text-paper underline decoration-paper/30 underline-offset-8 transition hover:decoration-cyan"
            >
              Read an excerpt
            </a>
          </div>
        </div>
        <BookStage />
      </Container>
    </section>
  );
}
