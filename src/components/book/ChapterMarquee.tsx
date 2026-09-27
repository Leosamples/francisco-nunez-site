import { chapters } from "@/content/book";

/**
 * A continuous side-scrolling band of the eight chapter titles. CSS-only:
 * two identical tracks translate -50% on a loop. Pauses on hover. Screen
 * readers get one copy; reduced motion stops the scroll and lets the row be
 * swiped instead.
 */
export function ChapterMarquee() {
  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {chapters.map((ch) => (
        <li key={ch.number} className="flex items-center">
          <span className="flex items-baseline gap-4 whitespace-nowrap px-8 sm:px-12">
            <span className="text-sm font-semibold tabular-nums text-cyan">{String(ch.number).padStart(2, "0")}</span>
            <span className="text-4xl font-bold tracking-tight text-paper/90 sm:text-6xl">{ch.title}</span>
          </span>
          <span aria-hidden className="h-px w-10 shrink-0 bg-cyan/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Chapters in the book" className="border-y border-ink-line py-10 sm:py-14">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto">
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track(false)}
          {track(true)}
        </div>
      </div>
    </section>
  );
}
