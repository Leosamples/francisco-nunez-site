"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { chapters } from "@/content/book";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export function ChapterList() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section id="chapters" aria-labelledby="chapters-heading" className="scroll-mt-20 border-t border-ink-line py-28 sm:py-40 lg:py-48">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Inside the book" id="chapters-heading">
            Eight chapters. One target.
          </SectionHeading>
          <p className="mt-6 max-w-sm text-lg text-slate">Tap a chapter to see what it covers.</p>
        </Reveal>

        <div>
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
                        className="group flex w-full items-center gap-5 py-5 text-left sm:gap-7 sm:py-6"
                      >
                        <span
                          className={`w-8 shrink-0 text-sm font-bold tabular-nums transition-colors ${
                            isOpen ? "text-cyan" : "text-slate"
                          }`}
                        >
                          {String(ch.number).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 text-lg font-bold tracking-tight transition-colors sm:text-2xl ${
                            isOpen ? "text-paper" : "text-paper/85 group-hover:text-paper"
                          }`}
                        >
                          {ch.title}
                        </span>
                        <span
                          aria-hidden
                          className={`relative grid size-8 shrink-0 place-items-center rounded-full border transition-colors ${
                            isOpen ? "border-cyan text-cyan" : "border-ink-line text-slate group-hover:border-slate"
                          }`}
                        >
                          <span className="absolute h-px w-3 bg-current" />
                          <span
                            className={`absolute h-3 w-px bg-current transition-transform duration-300 ${
                              isOpen ? "scale-y-0" : ""
                            }`}
                          />
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
                          <p className="pb-6 pl-13 pr-12 text-base leading-relaxed text-slate sm:pl-15 sm:text-lg">
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
        </div>
      </Container>
    </section>
  );
}
