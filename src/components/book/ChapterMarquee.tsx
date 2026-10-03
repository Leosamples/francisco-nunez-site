import { chapters } from "@/content/book";

/**
 * A continuous side-scrolling band of the eight chapter titles. CSS-only:
 * two identical tracks translate -50% on a loop. Pauses on hover. Screen
 * readers get one copy; reduced motion keeps it scrolling, ~3x slower.
 */
export function ChapterMarquee() {
  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {chapters.map((ch) => (
        <li key={ch.number} className="flex items-center">
          <span className="flex items-baseline gap-4 px-8 whitespace-nowrap sm:px-10">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-muted tabular-nums">
              {String(ch.number).padStart(2, "0")}
            </span>
            <span className="font-serif text-3xl font-light text-paper/90 italic sm:text-5xl">{ch.title}</span>
          </span>
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-red" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Chapters in the book" className="border-y border-ink-line py-8 sm:py-10">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused] motion-reduce:[animation-duration:150s]">
          {track(false)}
          {track(true)}
        </div>
      </div>
    </section>
  );
}
