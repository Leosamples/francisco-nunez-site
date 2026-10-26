import Image from "next/image";
import { preorder } from "@/content/book";
import { ArticleSection } from "@/components/site/Article";
import { ButtonLink } from "@/components/site/Button";
import { Eyebrow } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

/** Cash App pre-order: a tap-through button on phones, a QR code to scan on desktop. */
export function Preorder() {
  return (
    <ArticleSection id="preorder" numeral="VIII" label="Pre-order" heading={preorder.heading}>
      <Reveal className="flex flex-col gap-10 sm:flex-row sm:items-center">
        <div className="flex-1">
          <ButtonLink href={preorder.href} size="lg">
            {preorder.cta}
          </ButtonLink>
          <p className="mt-6 max-w-md font-serif text-xl text-paper/85">{preorder.includes}</p>
          <p className="mt-3 max-w-md font-serif text-lg text-muted italic">{preorder.instruction}</p>
        </div>
        <figure className="shrink-0">
          <Image
            src={preorder.qr}
            alt="QR code linking to Francisco Nunez's Cash App"
            width={160}
            height={160}
            unoptimized
            className="rounded-[3px]"
          />
          <figcaption className="mt-3">
            <Eyebrow>Scan with your phone</Eyebrow>
          </figcaption>
        </figure>
      </Reveal>
    </ArticleSection>
  );
}
