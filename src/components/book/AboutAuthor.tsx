import Image from "next/image";
import { author } from "@/content/book";
import { ArticleSection, Prose } from "@/components/site/Article";
import { Reveal } from "@/components/site/Reveal";

export function AboutAuthor() {
  return (
    <ArticleSection id="author" numeral="VI" label="The author" heading={author.name}>
      <Prose>
        <Reveal>
          <Image
            src={author.photo.src}
            width={author.photo.width}
            height={author.photo.height}
            alt={`Portrait of ${author.name}`}
            sizes="(min-width: 640px) 16rem, 100vw"
            className="mb-8 aspect-[4/5] w-full rounded-sm object-cover object-top sm:float-right sm:mb-4 sm:ml-10 sm:w-64"
          />
        </Reveal>
        {author.bio.map((p, i) => (
          <Reveal key={i}>
            <p>{p}</p>
          </Reveal>
        ))}
      </Prose>
    </ArticleSection>
  );
}
