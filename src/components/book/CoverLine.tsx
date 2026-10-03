"use client";

import { motion } from "motion/react";

/**
 * The thin vertical red line from the cover, standing behind the figure.
 * Fades in toward the top; draws in top-to-bottom the first time it scrolls
 * into view. Reduced motion (via MotionProvider): no draw, it fades in.
 */
export function CoverLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute top-0 bottom-0 w-[2px] origin-top bg-[linear-gradient(to_bottom,transparent,rgba(196,30,30,0.55)_18%,var(--color-red)_45%,var(--color-red))] shadow-[0_0_10px_rgba(196,30,30,0.55)] ${className}`}
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}
