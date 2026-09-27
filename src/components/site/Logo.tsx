import Link from "next/link";

// Temporary wordmark. Swap the mark for the FN flame logo SVG once it's supplied.
export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Francisco Nunez — home">
      <span
        aria-hidden
        className="bg-flame grid size-8 place-items-center rounded-md text-xs font-extrabold tracking-tight text-paper"
      >
        FN
      </span>
      <span className="whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.12em] text-paper transition group-hover:text-cyan sm:text-sm sm:tracking-[0.18em]">
        Francisco Nunez
      </span>
    </Link>
  );
}
