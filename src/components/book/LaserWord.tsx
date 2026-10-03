/**
 * A word with a laser running underneath it: a red baseline plus a
 * bright streak that fires across it on a loop. CSS-only. Reduced motion
 * drops the streak and gently pulses the line's brightness instead.
 */
export function LaserWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-1 h-2 overflow-hidden">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-red/70 motion-reduce:animate-laser-glow motion-reduce:bg-red" />
        <span className="animate-laser-sweep absolute top-1/2 left-0 h-[3px] w-[45%] -translate-y-1/2 bg-[linear-gradient(90deg,transparent,var(--color-red)_55%,var(--color-amber)_85%,#ffdf9e)] shadow-[0_0_8px_rgba(245,166,35,0.9)] motion-reduce:hidden" />
      </span>
    </span>
  );
}

/** Renders text with every standalone "laser" given the laser underline. */
export function withLaser(text: string) {
  return text.split(/\b(laser)\b/i).map((part, i) =>
    /^laser$/i.test(part) ? <LaserWord key={i}>{part}</LaserWord> : part,
  );
}
