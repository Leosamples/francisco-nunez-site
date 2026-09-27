import { introduction } from "@/content/book";
import { ArticleSection, Prose, dropCap } from "@/components/site/Article";
import { Reveal } from "@/components/site/Reveal";

// Short standalone lines in the Introduction read as beats; set them apart.
const isBeat = (p: string) => p.length < 70;

export function Introduction() {
  return (
    <ArticleSection id="introduction" numeral="I" label="Introduction" heading={introduction.heading} rule={false}>
      <Prose>
        {introduction.paragraphs.map((p, i) => (
          <Reveal key={i}>
            <p className={i === 0 ? dropCap : isBeat(p) ? "font-medium text-paper italic" : undefined}>{p}</p>
          </Reveal>
        ))}
      </Prose>
    </ArticleSection>
  );
}
