/** Small sans-serif label: section markers, kickers, metadata. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-slate ${className}`}>
      {children}
    </p>
  );
}

/** Serif section heading. */
export function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-serif text-4xl leading-[1.05] font-medium tracking-[-0.015em] text-balance text-paper sm:text-5xl lg:text-[3.5rem]"
    >
      {children}
    </h2>
  );
}
