import Image from "next/image";
import {
  author,
  authorNote,
  BOOK_COVER,
  book,
  emailCapture,
  excerpt,
  focusFramework,
  formats,
  introduction,
  pullQuote,
} from "@/content/book";
import { site } from "@/content/site";
import { ButtonLink, buttonClass } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow } from "@/components/site/SectionHeading";
import { ChapterItems } from "./ChapterItems";
import { CoverLine } from "./CoverLine";
import { FlashlightField } from "./FlashlightField";
import { withLaser } from "./LaserWord";

/*
 * The contents of each page. Page frames (paper, spine shadow, folio) and the
 * order of pages live in BookFunnel; long texts are split across pages by
 * paragraph ranges, tuned so each page fits a typical laptop screen.
 */

const dropCap =
  "first-letter:float-left first-letter:mt-1 first-letter:mr-2.5 first-letter:font-serif first-letter:text-[3.6em] first-letter:leading-[0.8] first-letter:font-semibold first-letter:text-red";
const beat = "font-medium text-paper italic";

function Label({ numeral, children }: { numeral?: string; children: React.ReactNode }) {
  return (
    <Eyebrow className="mb-[2.4vh] flex items-center gap-3">
      {numeral && <span className="text-amber">{numeral}</span>}
      {children}
    </Eyebrow>
  );
}

/* i — the cover, full bleed */
export function CoverArtPage() {
  return (
    <Image
      src={BOOK_COVER.src}
      alt={`${book.title} by ${book.author} — book cover`}
      fill
      priority
      sizes="(min-width: 768px) 50vw, 100vw"
      className="object-contain"
    />
  );
}

/* ii — the opening */
export function OpeningPage() {
  const dek = book.subtitle.charAt(0).toUpperCase() + book.subtitle.slice(1) + ".";
  return (
    <div className="relative flex h-full flex-col justify-center">
      <FlashlightField />
      <div className="relative">
        <Eyebrow className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-red" />A book preview
        </Eyebrow>
        <h1 className="mt-[3vh] font-serif text-[clamp(40px,8.2vh,92px)] leading-[0.95] font-medium tracking-[-0.025em]">
          <span className="block text-paper">{book.titleLead}</span>
          <span className="text-glow block">{book.titleGlow}</span>
        </h1>
        <p className="mt-[3vh] max-w-md font-serif text-[clamp(19px,2.9vh,28px)] leading-snug font-light text-paper/80 italic">
          {withLaser(dek)}
        </p>
        <p className="mt-[2.6vh] font-sans text-sm text-muted">
          By <span className="text-paper">{book.author}</span>
        </p>
        <div className="mt-[4.5vh] flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href="#formats" size="lg">
            Get The Book
          </ButtonLink>
          <a
            href="#excerpt"
            className="font-sans text-sm font-semibold text-paper underline decoration-red underline-offset-8 transition hover:decoration-amber"
          >
            Read an excerpt
          </a>
        </div>
      </div>
    </div>
  );
}

/* iii–iv — the Introduction, split across the spread */
export function IntroPage({ from, to, first = false }: { from: number; to: number; first?: boolean }) {
  return (
    <>
      {first && (
        <Reveal>
          <Label numeral="I">Introduction</Label>
          <h2 className="pg-h mb-[3vh]">{introduction.heading}</h2>
        </Reveal>
      )}
      <div className="pg-text">
        {introduction.paragraphs.slice(from, to).map((p, k) => {
          const i = from + k;
          return (
            <Reveal key={i}>
              <p className={i === 0 ? dropCap : p.length < 70 ? beat : undefined}>{p}</p>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

/* v — Francisco holding the book, staged on the cover's glow and laser line */
export function NotePhotoPage() {
  const { photo } = authorNote;
  return (
    <div className="absolute inset-0 isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_42%_at_50%_62%,rgba(245,166,35,0.3),rgba(245,166,35,0.1)_45%,transparent_72%)]"
      />
      <CoverLine className="left-[44%] -z-10" />
      <Reveal y={24} className="absolute inset-x-0 bottom-0 flex h-[90%] justify-center">
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          sizes="(min-width: 768px) 30vw, 80vw"
          className="h-full w-auto max-w-none object-contain object-bottom"
        />
      </Reveal>
      {/* the mid-thigh crop melts into the paper */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-[linear-gradient(to_top,var(--color-ink-raised)_18%,transparent)]" />
    </div>
  );
}

/* vi — Why I Wrote This Book */
export function NoteTextPage() {
  const { heading, lines, signature } = authorNote;
  return (
    <div className="flex h-full flex-col justify-center">
      <Reveal>
        <Label numeral="II">Author’s note</Label>
        <h2 className="pg-h">{heading}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <blockquote className="mt-[4vh] space-y-[2vh] font-serif text-[clamp(22px,3.4vh,34px)] leading-[1.22] font-light text-paper italic">
          {lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </blockquote>
        <p className="mt-[4vh] font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-muted uppercase">— {signature}</p>
      </Reveal>
    </div>
  );
}

/* vii — the pull quote, alone on its page */
export function QuotePage() {
  return (
    <div className="flex h-full flex-col justify-center">
      <Reveal>
        <figure>
          <span aria-hidden className="block font-serif text-[clamp(56px,9vh,96px)] leading-[0.6] text-red">
            “
          </span>
          <blockquote className="mt-[2vh] font-serif text-[clamp(26px,4.4vh,48px)] leading-[1.16] font-light tracking-[-0.01em] text-balance text-paper italic">
            {pullQuote}
          </blockquote>
          <figcaption className="mt-[4vh] font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-muted uppercase">
            {book.author} · {book.title}
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}

/* viii–x — the Chapter 2 excerpt; runs flattened, a break marks skipped text */
type ExcerptItem = { kind: "p"; text: string; first: boolean } | { kind: "break" };
const excerptItems: ExcerptItem[] = excerpt.runs.flatMap((run, r) => [
  ...(r > 0 ? [{ kind: "break" as const }] : []),
  ...run.map((text, i) => ({ kind: "p" as const, text, first: r === 0 && i === 0 })),
]);
export const EXCERPT_ITEM_COUNT = excerptItems.length;

export function ExcerptPage({ from, to, first = false, last = false }: { from: number; to: number; first?: boolean; last?: boolean }) {
  return (
    <>
      {first && (
        <Reveal>
          <Label numeral="III">Excerpt</Label>
          <p className="font-serif text-[clamp(15px,2vh,18px)] text-muted italic">{excerpt.source}</p>
          <h2 className="pg-h mt-[1.2vh] mb-[3vh]">{withLaser(excerpt.heading)}</h2>
        </Reveal>
      )}
      <div className="pg-text">
        {excerptItems.slice(from, to).map((it, k) =>
          it.kind === "break" ? (
            <p key={k} aria-label="Text omitted" className="py-[0.6vh] text-center font-sans text-muted tracking-[0.6em]">
              · · ·
            </p>
          ) : (
            <Reveal key={k}>
              <p className={it.first ? dropCap : it.text.length < 50 ? beat : undefined}>{it.text}</p>
            </Reveal>
          ),
        )}
      </div>
      {last && (
        <Reveal className="mt-[4vh]">
          <a
            href="#formats"
            className="font-sans text-sm font-semibold text-paper underline decoration-red underline-offset-8 transition hover:decoration-amber"
          >
            Keep reading — get the book
          </a>
        </Reveal>
      )}
    </>
  );
}

/* 1–2 — contents; one chapter open at a time across both pages */
export function ContentsPage({ from, to, first = false }: { from: number; to: number; first?: boolean }) {
  return (
    <div className="pb-[11vh]">
      {first ? (
        <Reveal>
          <Label numeral="IV">Contents</Label>
          <h2 className="pg-h mb-[3vh]">Eight chapters. One target.</h2>
        </Reveal>
      ) : (
        <div aria-hidden className="h-[clamp(64px,11vh,120px)]" />
      )}
      <ChapterItems from={from} to={to} />
    </div>
  );
}

/* 3–4 — the bonus */
export function BonusPage({ from, to, first = false }: { from: number; to: number; first?: boolean }) {
  const { eyebrow, heading, intro, disciplines } = focusFramework;
  return (
    <>
      {first && (
        <Reveal>
          <Label numeral="V">{eyebrow}</Label>
          <h2 className="pg-h">{heading}</h2>
          <p className="pg-text mt-[2.4vh] mb-[3vh]">{intro}</p>
        </Reveal>
      )}
      <ol className="pg-text space-y-[2.2vh]" start={from + 1}>
        {disciplines.slice(from, to).map((d, k) => (
          <Reveal key={d.title}>
            <li className="grid grid-cols-[2.2rem_1fr]">
              <span className="pt-[0.35em] font-sans text-xs font-semibold text-amber tabular-nums">
                {String(from + k + 1).padStart(2, "0")}
              </span>
              <p>
                <span className="font-semibold text-paper">{d.title}.</span> {d.body}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </>
  );
}

/* 5 — the author portrait, with the start of the bio */
export function AuthorPhotoPage({ to }: { to: number }) {
  return (
    <>
      <Reveal>
        <Label numeral="VI">The author</Label>
        <h2 className="pg-h">{author.name}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <Image
          src={author.photo.src}
          width={author.photo.width}
          height={author.photo.height}
          alt={`Portrait of ${author.name}`}
          sizes="(min-width: 768px) 22vw, 60vw"
          className="mt-[2.6vh] mb-[2.6vh] aspect-[16/10] h-auto max-h-[28vh] w-full rounded-sm object-cover object-[50%_22%]"
        />
      </Reveal>
      <div className="pg-text pg-text-sm">
        {author.bio.slice(0, to).map((p, i) => (
          <Reveal key={i}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}

/* 6 — the rest of the bio */
export function AuthorBioPage({ from }: { from: number }) {
  return (
    <div className="pg-text pg-text-sm">
      {author.bio.slice(from).map((p, i) => (
        <Reveal key={i}>
          <p className={from + i === author.bio.length - 1 ? "text-paper" : undefined}>{p}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* 7 — editions, as a price list */
export function EditionsPage() {
  return (
    <>
      <Reveal>
        <Label numeral="VII">Editions</Label>
        <h2 className="pg-h mb-[4vh]">Pick your format.</h2>
      </Reveal>
      <ul className="border-t border-ink-line">
        {formats.map((f, i) => (
          <li key={f.name} className="border-b border-ink-line">
            <Reveal delay={i * 0.06} className="py-[2.6vh]">
              <div className="flex items-baseline gap-4">
                <h3 className="font-serif text-[clamp(22px,3.2vh,30px)] text-paper">{f.name}</h3>
                <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-muted/40" />
                <p className="font-serif text-[clamp(22px,3.2vh,30px)] text-paper tabular-nums">{f.price}</p>
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-4">
                <p className="font-serif text-[clamp(15px,2vh,18px)] text-muted italic">{f.note}</p>
                {f.href ? (
                  <ButtonLink href={f.href} size="md">
                    Buy
                  </ButtonLink>
                ) : (
                  // Visual placeholder until distributor links are final.
                  <span aria-disabled="true" className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] whitespace-nowrap text-muted uppercase">
                    Coming soon
                  </span>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}

/* 8 — launch updates, and the colophon */
export function UpdatesPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-center">
        <Reveal>
          <Label>Launch updates</Label>
          <h2 className="pg-h">{emailCapture.heading}</h2>
          <p className="pg-text mt-[2.4vh] max-w-md">{emailCapture.body}</p>
          {/* Visual placeholder only — not connected to an email platform yet. */}
          <div className="mt-[4vh] flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="updates-email" className="sr-only">
              Email address
            </label>
            <input
              id="updates-email"
              type="email"
              disabled
              placeholder="you@example.com"
              className="min-w-0 flex-1 cursor-default rounded-[3px] border border-ink-line bg-transparent px-4 py-3 font-sans text-paper placeholder:text-muted/70"
            />
            <span aria-disabled="true" className={`${buttonClass("primary", "md")} cursor-default`}>
              Notify me
            </span>
          </div>
        </Reveal>
      </div>
      <p className="font-sans text-[11px] leading-relaxed tracking-[0.06em] text-muted">
        {book.title} · {book.author}
        <br />© {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </div>
  );
}
