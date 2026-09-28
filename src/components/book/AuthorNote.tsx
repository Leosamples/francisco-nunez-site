import Image from "next/image";
import { authorNote } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, SectionHeading } from "@/components/site/SectionHeading";
import { CoverLine } from "./CoverLine";

/**
 * Author's note. The cutout of Francisco holding the book stands free on the
 * page — staged on the cover's amber glow and red laser line — and runs off
 * the bottom of its block so the mid-thigh crop is never seen as a flat edge.
 */
export function AuthorNote() {
  const { heading, lines, signature, photo } = authorNote;
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-ink-line pt-24 sm:pt-32"
    >
      <Container className="grid gap-y-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-x-20">
        {/* figure: bottom-anchored, bleeds off the bottom of the section */}
        {/* The block is unclipped so the glow can spread past the shoulders; only the
            image sits in an overflow-hidden wrapper, which trims the mid-thigh crop
            with a pixel-snapped edge (clip-path left an anti-aliased hairline). Top
            padding is headroom where the laser line shows above the head. */}
        <div className="relative isolate order-1 pt-16 lg:self-end lg:pt-24">
          {/* staging, behind the figure */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[35%] top-0 bottom-0 -z-10 bg-[radial-gradient(ellipse_48%_40%_at_50%_60%,rgba(245,166,35,0.34),rgba(245,166,35,0.12)_45%,transparent_72%)]"
          />
          <CoverLine className="left-[43%] -z-10" />
          <div className="relative overflow-hidden">
            <Reveal y={24} className="relative">
              {/* explicit aspect + height: the image has a real size before it loads,
                so lazy-loading can see it (auto/auto would be 0×0 until loaded) */}
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
                className="-mb-[6%] mx-auto block aspect-[1284/2101] h-[min(70vh,145vw)] w-auto lg:h-auto lg:w-full"
              />
            </Reveal>
          </div>
          {/* the base melts into the page: anchored to the block's visible bottom
              edge (not the image's, which is clipped), solid black at the edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[35%] bottom-0 h-[18%] bg-[linear-gradient(to_top,var(--color-ink)_22%,transparent)] lg:h-[15%]"
          />
        </div>

        {/* essay */}
        <div className="order-2 pb-24 sm:pb-32 lg:self-center lg:py-24">
          <Reveal className="space-y-6">
            <Eyebrow className="flex items-center gap-3">
              <span className="text-amber">II</span>Author’s note
            </Eyebrow>
            <SectionHeading id="why-heading">{heading}</SectionHeading>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <blockquote className="space-y-5 font-serif text-3xl leading-[1.2] font-light text-paper italic sm:text-[2.125rem]">
              {lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </blockquote>
            <p className="mt-8 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-muted uppercase">
              — {signature}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
