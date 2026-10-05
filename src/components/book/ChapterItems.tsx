"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { chapters } from "@/content/book";
import { Reveal } from "@/components/site/Reveal";
import { useChapters } from "./spread/ChaptersContext";

/** A slice of the table of contents. Tap a chapter for its line from the book. */
export function ChapterItems({ from, to }: { from: number; to: number }) {
  const { open, setOpen } = useChapters();
  const baseId = useId();
  return (
    <ol className="border-t border-ink-line" start={from + 1}>
      {chapters.slice(from, to).map((ch, k) => {
        const i = from + k;
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={ch.number} className="border-b border-ink-line">
            <Reveal delay={k * 0.04}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-baseline gap-5 py-[2.1vh] text-left"
                >
                  <span className={`w-6 shrink-0 font-sans text-xs font-semibold tabular-nums transition-colors ${isOpen ? "text-amber" : "text-muted"}`}>
                    {String(ch.number).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-serif text-[clamp(19px,2.9vh,28px)] leading-snug transition-colors ${
                      isOpen ? "text-paper" : "text-paper/80 group-hover:text-paper"
                    }`}
                  >
                    {ch.title}
                  </span>
                  <span aria-hidden className={`font-sans text-xl font-light transition-transform duration-300 ${isOpen ? "rotate-45 text-amber" : "text-muted"}`}>
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
                    <p className="pr-8 pb-[2.2vh] pl-11 font-serif text-[clamp(15px,2.1vh,19px)] leading-relaxed text-paper/75 italic">{ch.teaser}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
