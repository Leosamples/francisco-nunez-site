// The "flashlights": soft, scattered, low-opacity pools of light.
// Positions are generated from a fixed seed so server and client markup match.

type Dot = { x: number; y: number; size: number; opacity: number; dx: number; dy: number; delay: number };

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const rand = seeded(7);
const DOTS: Dot[] = Array.from({ length: 12 }, () => ({
  x: rand() * 100,
  y: rand() * 100,
  size: 90 + rand() * 170,
  opacity: 0.03 + rand() * 0.05,
  dx: (rand() - 0.5) * 40,
  dy: (rand() - 0.5) * 40,
  delay: rand() * -18,
}));

export function FlashlightField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="animate-drift absolute rounded-full motion-reduce:animate-none"
          style={
            {
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              marginLeft: -d.size / 2,
              marginTop: -d.size / 2,
              opacity: d.opacity,
              background:
                "radial-gradient(circle, rgba(245,241,234,0.9) 0%, rgba(245,166,35,0.22) 35%, transparent 70%)",
              animationDelay: `${d.delay}s`,
              "--dx": `${d.dx}px`,
              "--dy": `${d.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
