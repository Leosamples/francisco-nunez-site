"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/**
 * Short fade + slight rise (600ms, 20px) the first time an element scrolls
 * into view. Reduced motion: fades in place, no rise (MotionProvider drops the
 * transform).
 *
 * Content is server-rendered visible; only elements still below the fold after
 * hydration are hidden and then revealed. Inert inside the book (.book), where
 * turning the page is the entrance. So no-JS visitors, crawlers,
 * and deep links (e.g. /#author) never see blank sections.
 */
export function Reveal({
  delay = 0,
  y = 20,
  className,
  children,
}: {
  delay?: number;
  /** rise distance in px */
  y?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  // Armed = was below the fold at hydration, so it's allowed to animate in.
  const [armed, setArmed] = useState(false);
  const hidden = armed && !inView;

  useEffect(() => {
    const el = ref.current;
    // In the book, the page turn is the entrance: arming here would make a page
    // fade out and back in right after the leaf lands on it.
    if (!el || el.closest(".book")) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={
        hidden ? { duration: 0 } : { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
