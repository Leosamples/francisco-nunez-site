"use client";

import { motion } from "motion/react";

// The "laser": one bright cyan beam cutting diagonally through the room.
// It draws in once on load, then holds with a slow glow pulse.
export function LaserBeam() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
        </motion.div>
      </div>
    </div>
  );
}
