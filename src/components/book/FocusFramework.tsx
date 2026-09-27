import { focusFramework } from "@/content/book";
import { ArticleSection, Prose } from "@/components/site/Article";
import { Reveal } from "@/components/site/Reveal";

export function FocusFramework() {
  const { heading, intro, disciplines } = focusFramework;
  return (
    <ArticleSection id="bonus" numeral="V" label="Included bonus" heading={heading}>
      <Prose>
        <Reveal>
          <p>{intro}</p>
        </Reveal>
        <ol className="space-y-6 pt-4">
          {disciplines.map((d, i) => (
            <Reveal key={d.title}>
              <li className="grid grid-cols-[2.25rem_1fr]">
                <span className="pt-1.5 font-sans text-xs font-semibold text-cyan tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>
                  <span className="font-semibold text-paper">{d.title}.</span> {d.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Prose>
    </ArticleSection>
  );
}
