import { formats } from "@/content/book";
import { ArticleSection } from "@/components/site/Article";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";

/** Editions as a price list with dot leaders, not cards. */
export function FormatCards() {
  return (
    <ArticleSection id="formats" numeral="VII" label="Editions" heading="Pick your format.">
      <ul className="border-t border-ink-line">
        {formats.map((f, i) => (
          <li key={f.name} className="border-b border-ink-line">
            <Reveal delay={i * 0.06} className="py-7">
              <div className="flex items-baseline gap-4">
                <h3 className="font-serif text-2xl text-paper sm:text-3xl">{f.name}</h3>
                <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-slate/40" />
                <p className="font-serif text-2xl text-paper tabular-nums sm:text-3xl">{f.price}</p>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <p className="font-serif text-lg text-slate italic">{f.note}</p>
                {f.href ? (
                  <ButtonLink href={f.href} size="md">
                    Buy
                  </ButtonLink>
                ) : (
                  // Visual placeholder until distributor links are final.
                  <span aria-disabled="true" className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] whitespace-nowrap text-slate uppercase">
                    Coming soon
                  </span>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </ArticleSection>
  );
}
