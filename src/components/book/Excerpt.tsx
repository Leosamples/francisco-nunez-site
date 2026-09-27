import { excerpt } from "@/content/book";
import { ArticleSection, Prose, dropCap } from "@/components/site/Article";
import { Reveal } from "@/components/site/Reveal";
import { withLaser } from "./LaserWord";

// Short standalone lines read as beats; set them apart.
const isBeat = (p: string) => p.length < 50;

export function Excerpt() {
  return (
    <ArticleSection id="excerpt" numeral="II" label="Excerpt" kicker={excerpt.source} heading={withLaser(excerpt.heading)}>
      <Prose>
        {excerpt.runs.map((run, r) => (
          <div key={r} className="space-y-6">
            {r > 0 && (
              // marks skipped text between passages
              <p aria-label="Text omitted" className="py-2 text-center font-sans text-slate tracking-[0.6em]">
                · · ·
              </p>
            )}
            {run.map((p, i) => {
              const cls = r === 0 && i === 0 ? dropCap : isBeat(p) ? "font-medium text-paper italic" : undefined;
              return (
                <Reveal key={i}>
                  <p className={cls}>{p}</p>
                </Reveal>
              );
            })}
          </div>
        ))}
      </Prose>
    </ArticleSection>
  );
}
