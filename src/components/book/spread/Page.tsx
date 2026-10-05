/**
 * One page of a spread: the paper, the spine shadow on its inner edge, the
 * content, and the folio in the outer bottom corner.
 */
export function Page({
  side,
  folio,
  anchor,
  bleed = false,
  children,
}: {
  side: "left" | "right";
  /** printed page number; null for unnumbered pages (e.g. the full-bleed cover) */
  folio: string | null;
  /** section id this page starts, for #links and the nav */
  anchor?: string;
  /** full-bleed art: no padding, no spine shadow */
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article id={anchor} data-page data-side={side} data-bleed={bleed || undefined} className="page">
      <div aria-hidden className="page-surface" />
      {!bleed && <div aria-hidden className="page-gutter" />}
      <div className="page-body">{children}</div>
      {folio && (
        <span className="folio" aria-label={`Page ${folio}`}>
          {folio}
        </span>
      )}
    </article>
  );
}
