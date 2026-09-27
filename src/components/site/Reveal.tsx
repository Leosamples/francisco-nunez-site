"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Fade-and-rise on first scroll into view.
 *
 * Content is server-rendered visible; only elements still below the fold
 * after hydration are hidden and then revealed. So no-JS visitors, crawlers,
 * and deep links (e.g. /#author) never see blank sections.
 */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  // Armed = was below the fold at hydration, so it's allowed to animate in.
  const [armed, setArmed] = useState(false);
  const hidden = armed && !inView;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduced]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
      transition={
        hidden ? { duration: 0 } : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
