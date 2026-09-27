"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The "laser": discrete shots, like a laser show. Each shot appears at a new
 * position and angle, streaks edge to edge in ~250ms, vanishes in ~120ms, and
 * the next one fires after a 1–2s pause. Presets cycle in order — varied
 * enough to read as random, cheap enough to run all visit.
 *
 * One reused element, animated with the Web Animations API on transform and
 * opacity only (GPU-composited, no layout). Pauses while the tab is hidden.
 * Full intensity while the hero is on screen, a faint accent elsewhere. Screen
 * blending keeps shots from obscuring text.
 *
 * Color: deep red core, amber glow (the cover's light source).
 *
 * Reduced motion: no shots — a single static, faint beam instead.
 */

type Shot = {
  /** crossing point, % of viewport */
  x: number;
  y: number;
  /** degrees; direction of travel */
  angle: number;
  /** pause after this shot, ms */
  gap: number;
};

const SHOTS: Shot[] = [
  { x: 50, y: 52, angle: -22, gap: 1400 },
  { x: 32, y: 30, angle: 194, gap: 1100 },
  { x: 66, y: 64, angle: -38, gap: 1700 },
  { x: 40, y: 72, angle: 211, gap: 1250 },
  { x: 60, y: 24, angle: -6, gap: 1900 },
  { x: 26, y: 56, angle: 228, gap: 1300 },
  { x: 74, y: 40, angle: -55, gap: 1600 },
];

const STREAK_MS = 250;
const FADE_MS = 120;
const BEAM_LENGTH = "170vmax";

export function LaserShow({ heroId }: { heroId: string }) {
  const rig = useRef<HTMLDivElement>(null);
  const beam = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = rig.current;
    const b = beam.current;
    const h = head.current;
    if (!r || !b || !h) return;

    let i = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const total = STREAK_MS + FADE_MS;
    const streakEnd = STREAK_MS / total;

    const fire = () => {
      const s = SHOTS[i % SHOTS.length];
      i++;
      r.style.left = `${s.x}%`;
      r.style.top = `${s.y}%`;
      r.style.transform = `translate(-50%, -50%) rotate(${s.angle}deg)`;
      b.animate(
        [
          { transform: "scaleX(0)", opacity: 1 },
          { transform: "scaleX(1)", opacity: 1, offset: streakEnd },
          { transform: "scaleX(1)", opacity: 0 },
        ],
        { duration: total, easing: "linear" },
      );
      h.animate(
        [
          { transform: "translateX(-10vmax)", opacity: 1 },
          { transform: `translateX(${BEAM_LENGTH})`, opacity: 1, offset: streakEnd },
          { transform: `translateX(${BEAM_LENGTH})`, opacity: 0 },
        ],
        { duration: total, easing: "linear" },
      );
      timer = setTimeout(fire, total + s.gap);
    };

    const start = () => {
      clearTimeout(timer);
      timer = setTimeout(fire, 600);
    };
    const onVisibility = () => (document.hidden ? clearTimeout(timer) : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-screen motion-safe:transition-opacity motion-safe:duration-700"
      style={{ opacity: heroVisible ? 1 : 0.15 }}
    >
      {/* Reduced motion: one static, faint beam where the first shot would be. */}
      <div className="absolute left-1/2 top-[52%] hidden w-[170vmax] -translate-x-1/2 -translate-y-1/2 -rotate-[22deg] opacity-40 motion-reduce:block">
        <span className="block h-px bg-[linear-gradient(90deg,transparent,var(--color-red)_30%,var(--color-red)_70%,transparent)]" />
      </div>

      <div ref={rig} className="absolute left-1/2 top-1/2 w-[170vmax] motion-reduce:hidden">
        {/* the beam: grows from its start edge, then vanishes */}
        <div ref={beam} className="relative h-px origin-left opacity-0">
          <span className="absolute inset-x-0 -top-[5px] h-[11px] bg-[linear-gradient(90deg,rgba(245,166,35,0.12),rgba(245,166,35,0.7))] blur-[5px]" />
          <span className="absolute inset-x-0 -top-px h-[2px] bg-[linear-gradient(90deg,rgba(196,30,30,0.45),var(--color-red)_60%,#e0332b)]" />
        </div>
        {/* the bright head leading the shot */}
        <div
          ref={head}
          className="absolute -top-[8px] left-0 h-[17px] w-[10vmax] opacity-0 bg-[linear-gradient(90deg,transparent,rgba(196,30,30,0.9)_55%,var(--color-amber)_85%,#ffdf9e)] blur-[3px]"
        />
      </div>
    </div>
  );
}
