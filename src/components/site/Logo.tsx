import Image from "next/image";
import Link from "next/link";

// The master logo file, shown as-is. It has wide transparent margins, so the
// wrapper clips to the artwork's bounds (372,164 → 1172,780 of 1536×1024).
const LOGO = { src: "/images/logo.png", width: 1536, height: 1024 };
const ART = { x: 372, y: 164, w: 800, h: 616 };

const heights = {
  nav: "h-14",
  footer: "h-20",
};

export function Logo({ size = "nav" }: { size?: keyof typeof heights }) {
  return (
    <Link href="/" aria-label="Francisco Nunez — home" className="inline-block">
      <span
        className={`relative block overflow-hidden ${heights[size]}`}
        style={{ aspectRatio: `${ART.w} / ${ART.h}` }}
      >
        <Image
          src={LOGO.src}
          width={LOGO.width}
          height={LOGO.height}
          alt="Francisco Nunez"
          priority={size === "nav"}
          sizes="200px"
          className="absolute max-w-none"
          style={{
            width: `${(LOGO.width / ART.w) * 100}%`,
            left: `${(-ART.x / ART.w) * 100}%`,
            top: `${(-ART.y / ART.h) * 100}%`,
          }}
        />
      </span>
    </Link>
  );
}
