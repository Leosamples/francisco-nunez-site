import Image from "next/image";
import { authorNote } from "@/content/book";
import { ArticleSection } from "@/components/site/Article";
import { Reveal } from "@/components/site/Reveal";

/** Author's note: Francisco holding the finished book, beside why he wrote it. */
export function AuthorNote() {
  const { heading, lines, signature, photo } = authorNote;
  return (
    <ArticleSection id="why" numeral="II" label="Author’s note" heading={heading}>
      <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-12">
        <Reveal>
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            sizes="(min-width: 640px) 15rem, 100vw"
            className="aspect-[2/3] w-full rounded-sm object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="space-y-5 font-serif text-3xl leading-[1.2] font-light text-paper italic sm:text-[2.125rem]">
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </blockquote>
          <p className="mt-8 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-slate uppercase">
            — {signature}
          </p>
        </Reveal>
      </div>
    </ArticleSection>
  );
}
