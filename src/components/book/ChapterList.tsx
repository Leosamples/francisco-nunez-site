"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { chapters } from "@/content/book";
import { ArticleSection } from "@/components/site/Article";
import { Reveal } from "@/components/site/Reveal";

/** Table of contents: tap a chapter to read its line from the book. One open at a time. */
export function ChapterList() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ArticleSection id="chapters" numeral="III" label="Contents" heading="Eight chapters. One target.">
      <ol className="border-t border-ink-line">
        {chapters.map((ch, i) => {
          const isOpen = open === i;
          const panelId = `${baseId}-panel-${i}`;
          const buttonId = `${baseId}-button-${i}`;
          return (
            <li key={ch.number} className="border-b border-ink-line">
              <Reveal delay={i * 0.04}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-baseline gap-6 py-6 text-left"
                  >
                    <span
                      className={`w-6 shrink-0 font-sans text-xs font-semibold tabular-nums transition-colors ${
                        isOpen ? "text-cyan" : "text-slate"
                      }`}
                    >
                      {String(ch.number).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-serif text-2xl leading-snug transition-colors sm:text-[1.75rem] ${
                        isOpen ? "text-paper" : "text-paper/80 group-hover:text-paper"
                      }`}
                    >
                      {ch.title}
                    </span>
                    <span
                      aria-hidden
                      className={`font-sans text-xl font-light transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-cyan" : "text-slate"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pr-10 pb-7 pl-12 font-serif text-lg leading-relaxed text-paper/75 italic sm:text-xl">
                        {ch.teaser}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </ArticleSection>
  );
}
