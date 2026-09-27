import { emailCapture } from "@/content/book";
import { ArticleSection } from "@/components/site/Article";
import { buttonClass } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";

// Visual placeholder only — not connected to an email platform yet.
// The field is disabled so visitors can't type an address that goes nowhere.
export function EmailCapture() {
  return (
    <ArticleSection id="updates" label="Launch updates">
      <Reveal>
        <h2 className="font-serif text-3xl leading-tight font-medium text-balance text-paper sm:text-4xl">
          {emailCapture.heading}
        </h2>
        <p className="mt-4 max-w-md font-serif text-xl text-paper/75">{emailCapture.body}</p>
        <div className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="updates-email" className="sr-only">
            Email address
          </label>
          <input
            id="updates-email"
            type="email"
            disabled
            placeholder="you@example.com"
            className="min-w-0 flex-1 cursor-default rounded-[3px] border border-ink-line bg-transparent px-4 py-3 font-sans text-paper placeholder:text-slate/70"
          />
          <span aria-disabled="true" className={`${buttonClass("primary", "md")} cursor-default`}>
            Notify me
          </span>
        </div>
      </Reveal>
    </ArticleSection>
  );
}
