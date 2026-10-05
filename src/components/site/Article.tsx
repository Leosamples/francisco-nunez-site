import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow, SectionHeading } from "./SectionHeading";

/**
 * Editorial section: a small numbered label in the left margin, then a
 * heading and a single reading column (~65 characters). Stacks on mobile.
 */
export function ArticleSection({
  id,
  numeral,
  label,
  kicker,
  heading,
  rule = true,
  children,
}: {
  id?: string;
  numeral?: string;
  label: string;
  /** optional line above the heading, e.g. "From Chapter 2" */
  kicker?: string;
  heading?: React.ReactNode;
  rule?: boolean;
  children: React.ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={heading ? headingId : undefined}
      aria-label={heading ? undefined : label}
      className={`scroll-mt-20 py-24 sm:py-32 lg:py-40 ${rule ? "border-t border-ink-line" : ""}`}
    >
      <Container className="grid gap-y-8 lg:grid-cols-[12rem_minmax(0,42rem)] lg:gap-x-20">
        <Reveal className="lg:pt-3">
          <Eyebrow className="flex items-center gap-3">
            {numeral && <span className="text-amber">{numeral}</span>}
            {label}
          </Eyebrow>
        </Reveal>
        <div>
          {(kicker || heading) && (
            <Reveal className="mb-12 space-y-4">
              {kicker && <p className="font-serif text-lg text-muted italic">{kicker}</p>}
              {heading && <SectionHeading id={headingId}>{heading}</SectionHeading>}
            </Reveal>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Serif body copy for long-form reading. */
export function Prose({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-6 font-serif text-[1.1875rem] leading-[1.75] text-paper/85 sm:text-xl ${className}`}>
      {children}
    </div>
  );
}

/** Opening paragraph with a drop cap — the one place red appears in body text. */
export const dropCap =
  "first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-serif first-letter:text-[4.25rem] first-letter:leading-[0.8] first-letter:font-semibold first-letter:text-red";
