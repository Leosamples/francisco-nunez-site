"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * The "laser": one cyan beam fixed across the viewport for the whole visit.
 * A bright pulse fires along it on a loop. Full intensity while the hero is on
 * screen, dimmed to an ambient glow everywhere else. Screen blending keeps it
 * from obscuring text (light over light text is near-invisible).
 *
 * Reduced motion: no draw-in, no pulse, no opacity transition — a static beam.
 * Handled with CSS media variants (not JS) so server and client markup match.
 */
export function LaserBeam({ heroId }: { heroId: string }) {
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.intersectionRatio > 0.35), {
      threshold: [0, 0.35, 1],
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [heroId]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-screen motion-safe:transition-opacity motion-safe:duration-700"
      style={{ opacity: heroVisible ? 1 : 0.22 }}
    >
      <div className="absolute left-1/2 top-1/2 w-[220vmax] -translate-x-1/2 -translate-y-1/2 -rotate-[22deg]">
        <motion.div
          className="animate-beam-pulse relative h-px origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* wide haze */}
          <span className="absolute inset-x-0 -top-16 h-32 bg-[linear-gradient(90deg,transparent,rgba(79,200,240,0.10)_30%,rgba(79,200,240,0.16)_55%,transparent)] blur-2xl" />
          {/* glow */}
          <span className="absolute inset-x-0 -top-[5px] h-[11px] bg-[linear-gradient(90deg,transparent,rgba(79,200,240,0.55)_25%,rgba(79,200,240,0.8)_55%,transparent)] blur-[5px]" />
          {/* core */}
          <span className="absolute inset-x-0 -top-px h-[2px] bg-[linear-gradient(90deg,transparent,#bdefff_25%,#ffffff_55%,transparent)]" />
          {/* the pulse that fires along the beam, on a loop */}
          <span className="animate-beam-fire absolute -top-[6px] left-0 h-[13px] w-[14vmax] bg-[linear-gradient(90deg,transparent,rgba(189,239,255,0.9)_70%,#ffffff)] blur-[3px] motion-reduce:hidden" />
        </motion.div>
      </div>
    </div>
  );
}
