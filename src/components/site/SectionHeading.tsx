export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate">
      <span aria-hidden className="size-1.5 rounded-full bg-cyan" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  id,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="space-y-6">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
      >
        {children}
      </h2>
    </div>
  );
}
