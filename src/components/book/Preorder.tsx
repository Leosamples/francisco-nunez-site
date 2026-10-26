import Image from "next/image";
import { preorder, releaseParty } from "@/content/book";
import { ArticleSection } from "@/components/site/Article";
import { ButtonLink } from "@/components/site/Button";
import { Eyebrow } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

/** The Cash App QR code with its caption; `size` is the rendered width in px. */
export function CashAppQr({ size = 160 }: { size?: number }) {
  return (
    <figure className="shrink-0">
      <Image
        src={preorder.qr}
        alt="QR code linking to Francisco Nunez's Cash App"
        width={size}
        height={size}
        unoptimized
        className="mx-auto rounded-[3px]"
      />
      <figcaption className="mt-3 text-center">
        <Eyebrow>Scan with your phone</Eyebrow>
      </figcaption>
    </figure>
  );
}

/**
 * Release party + Cash App pre-order: a tap-through button on phones, a QR
 * code to scan on desktop. Mounted twice — under the hero (event details only;
 * the hero pairs the order button with the book) and near the end — so each
 * copy takes its own id.
 */
export function Preorder({ id, numeral, order = true }: { id: string; numeral?: string; order?: boolean }) {
  const party = releaseParty;
  return (
    <ArticleSection id={id} numeral={numeral} label="Release party" heading={party.heading}>
      <Reveal>
        <p className="max-w-xl font-serif text-xl leading-relaxed text-paper/80">{party.body}</p>
      </Reveal>

      <Reveal className="mt-12">
        <p className="font-serif text-[2rem] font-medium text-paper tabular-nums sm:text-5xl">
          <span className="whitespace-nowrap">{party.date}</span>{" "}
          <span aria-hidden className="mx-2.5 text-red">
            |
          </span>{" "}
          <span className="whitespace-nowrap">{party.time}</span>
        </p>
        <p className="mt-5 font-sans text-sm font-semibold tracking-[0.2em] text-amber uppercase">{party.venue}</p>
        <a
          href={party.mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block font-serif text-lg text-paper/80 underline decoration-red underline-offset-4 transition hover:decoration-amber"
        >
          {party.address}
        </a>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {party.extras.map((x) => (
            <li key={x}>
              <Eyebrow>{x}</Eyebrow>
            </li>
          ))}
        </ul>
      </Reveal>

      {order && (
        <Reveal className="mt-12 flex flex-col gap-10 border-t border-ink-line pt-12 sm:flex-row sm:items-center">
          <div className="flex-1">
            <ButtonLink href={preorder.href} size="lg">
              {preorder.cta}
            </ButtonLink>
            <p className="mt-6 max-w-md font-serif text-xl text-paper/85">{preorder.includes}</p>
            <p className="mt-3 max-w-md font-serif text-lg text-muted italic">{preorder.instruction}</p>
          </div>
          <CashAppQr />
        </Reveal>
      )}
    </ArticleSection>
  );
}
