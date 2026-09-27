import Image from "next/image";
import Link from "next/link";

// FN flame mark + wordmark. The mark (/brand/fn-mark.png) and the favicon
// (app/icon.png) are cropped from the master logo at /images/logo.png. The
// logo's own navy lettering doesn't read on the dark ground, so the name is
// set in type beside the mark.
export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Francisco Nunez — home">
      <Image
        src="/brand/fn-mark.png"
        alt=""
        width={294}
        height={240}
        priority
        className="h-9 w-auto drop-shadow-[0_0_10px_rgba(79,200,240,0.35)] transition group-hover:drop-shadow-[0_0_14px_rgba(79,200,240,0.6)]"
      />
      <span className="whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.12em] text-paper transition group-hover:text-cyan sm:text-sm sm:tracking-[0.18em]">
        Francisco Nunez
      </span>
    </Link>
  );
}
