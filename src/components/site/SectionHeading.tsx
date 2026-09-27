export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan">
      <span aria-hidden className="h-px w-8 bg-cyan" />
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
    <div className="space-y-4">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {children}
      </h2>
    </div>
  );
}
