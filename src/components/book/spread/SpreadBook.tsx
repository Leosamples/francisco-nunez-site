"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Flip = { dir: "next" | "prev"; from: number; to: number };

/**
 * Turns the pages. Desktop: one two-page spread per screen; the leaf flips
 * over the spine on each turn (a visual copy of the turning page, front and
 * back, rotated with the Web Animations API — transform only). Phones: one
 * page per screen, crossfading. Turn with ← → / PageUp PageDown / Home End,
 * swipe, the page edges, or the controls. Every section has a #hash, so nav
 * links, in-page links and the back button land on the right spread.
 *
 * Without JS the spreads just stack and scroll (see .book in globals.css);
 * an inline script adds html.paged before paint and backs out if the app
 * never hydrates.
 */
export function SpreadBook({
  pages,
  labels,
  anchors,
  overlays = [],
}: {
  /** <Page> elements, alternating left/right; even count */
  pages: React.ReactNode[];
  /** folio for every page (incl. unprinted ones), for the controls */
  labels: string[];
  /** the section #hash each page belongs to */
  anchors: (string | undefined)[];
  /** content that spans a whole spread (e.g. the chapter banner) */
  overlays?: { spread: number; node: React.ReactNode }[];
}) {
  const total = pages.length;
  const [page, setPage] = useState(0); // phone: current page; desktop: left page of the spread
  const [narrow, setNarrow] = useState(false);
  const [flip, setFlip] = useState<Flip | null>(null);
  const [arrive, setArrive] = useState<number[]>([]);
  const leafRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const spread = Math.floor(page / 2);
  const spreads = Math.ceil(total / 2);

  // paged mode is now owned by the app (the inline script only bridges until hydration)
  useEffect(() => {
    document.documentElement.classList.add("paged");
    return () => document.documentElement.classList.remove("paged");
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (target: number) => {
      target = Math.max(0, Math.min(total - 1, target));
      if (busy.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (narrow) {
        if (target === page) return;
        setPage(target);
        setArrive([target]);
        return;
      }
      const from = Math.floor(page / 2);
      const to = Math.floor(target / 2);
      if (from === to) return;
      if (reduced) {
        setPage(to * 2);
        setArrive([to * 2, to * 2 + 1]);
        return;
      }
      busy.current = true;
      setFlip({ dir: to > from ? "next" : "prev", from, to });
    },
    [narrow, page, total],
  );

  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  }, [go]);

  const next = useCallback(() => go(narrow ? page + 1 : spread * 2 + 2), [go, narrow, page, spread]);
  const prev = useCallback(() => go(narrow ? page - 1 : spread * 2 - 2), [go, narrow, page, spread]);

  // the flip itself
  useEffect(() => {
    const leaf = leafRef.current;
    if (!flip || !leaf) return;
    const angle = flip.dir === "next" ? -180 : 180;
    const anim = leaf.animate([{ transform: "rotateY(0deg)" }, { transform: `rotateY(${angle}deg)` }], {
      duration: 780,
      easing: "cubic-bezier(0.45, 0.05, 0.25, 1)",
      fill: "forwards",
    });
    // the page darkens as it lifts away from the light, the far side brightens as it lands
    const [front, back] = leaf.querySelectorAll<HTMLElement>(".leaf-shade");
    front?.animate([{ opacity: 0 }, { opacity: 0.55 }], { duration: 390, easing: "ease-in", fill: "forwards" });
    back?.animate([{ opacity: 0.55 }, { opacity: 0.55, offset: 0.5 }, { opacity: 0 }], { duration: 780, easing: "ease-out", fill: "forwards" });
    anim.onfinish = () => {
      setPage(flip.to * 2);
      setFlip(null);
      busy.current = false;
    };
    return () => anim.cancel();
  }, [flip]);

  // clear the fade-in marker once it has played
  useEffect(() => {
    if (!arrive.length) return;
    const t = setTimeout(() => setArrive([]), 400);
    return () => clearTimeout(t);
  }, [arrive]);

  // #hash -> page (initial load, nav links, back/forward)
  useEffect(() => {
    const indexFor = (hash: string) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      if (!id) return 0; // no hash = the cover
      const el = document.getElementById(id);
      const host = el?.closest<HTMLElement>("[data-index]");
      return host ? Number(host.dataset.index) : -1;
    };
    // open straight at a deep link (no flip) on first load
    const i = location.hash ? indexFor(location.hash) : -1;
    const raf = i >= 0 ? requestAnimationFrame(() => setPage(window.matchMedia("(max-width: 767px)").matches ? i : i - (i % 2))) : 0;
    const onHash = () => {
      const j = indexFor(location.hash);
      if (j >= 0) goRef.current(j);
    };
    // popstate too: pushState-style URL changes don't fire hashchange
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
    // mount only; hashchange reaches the latest go() through goRef
  }, []);

  // page -> #hash (replace, so turning pages doesn't flood history)
  useEffect(() => {
    const a = anchors[page];
    const want = a ? `#${a}` : "";
    if (location.hash !== want) history.replaceState(null, "", want || location.pathname + location.search);
  }, [page, anchors]);

  // keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const action =
        e.key === "ArrowRight" || e.key === "PageDown"
          ? next
          : e.key === "ArrowLeft" || e.key === "PageUp"
            ? prev
            : e.key === "Home"
              ? () => go(0)
              : e.key === "End"
                ? () => go(total - 1)
                : null;
      if (!action) return;
      e.preventDefault();
      action();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, total]);

  // swipe (horizontal only, so vertical scrolling inside a page still works)
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touch.current;
    const t = e.changedTouches[0];
    touch.current = null;
    if (!s || !t) return;
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next();
      else prev();
    }
  };

  // which pages are on screen
  const shown = new Set<number>();
  if (flip) {
    // under the turning leaf
    if (flip.dir === "next") shown.add(flip.from * 2).add(flip.to * 2 + 1);
    else shown.add(flip.to * 2).add(flip.from * 2 + 1);
  } else shown.add(spread * 2).add(spread * 2 + 1);

  const label = narrow ? labels[page] : `${labels[spread * 2]}–${labels[spread * 2 + 1]}`;
  const atStart = narrow ? page === 0 : spread === 0;
  const atEnd = narrow ? page === total - 1 : spread === spreads - 1;

  return (
    <>
      <div className="book" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-roledescription="book">
        {pages.map((node, i) => (
          <div
            key={i}
            data-index={i}
            data-show={shown.has(i) ? "1" : undefined}
            data-show-m={i === page ? "1" : undefined}
            data-arrive={arrive.includes(i) ? "1" : undefined}
            style={{ display: "contents" }}
          >
            {node}
            {/* spread-wide content sits after its spread's right page */}
            {i % 2 === 1 &&
              overlays
                .filter((o) => o.spread === Math.floor(i / 2))
                .map((o) => (
                  <div
                    key={`o${i}`}
                    className="spread-overlay"
                    data-show={!flip && Math.floor(i / 2) === spread ? "1" : undefined}
                  >
                    {o.node}
                  </div>
                ))}
          </div>
        ))}

        {/* page edges: click to turn */}
        <button type="button" className="page-edge" data-edge="prev" aria-label="Previous page" onClick={prev} disabled={atStart} />
        <button type="button" className="page-edge" data-edge="next" aria-label="Next page" onClick={next} disabled={atEnd} />

        {flip && (
          <div className="leaf-wrap" aria-hidden>
            <div ref={leafRef} className="leaf" data-dir={flip.dir}>
              <div className="leaf-face" inert>
                {pages[flip.dir === "next" ? flip.from * 2 + 1 : flip.from * 2]}
                <div
                  className="leaf-shade"
                  style={{ background: `linear-gradient(${flip.dir === "next" ? "to right" : "to left"}, rgb(0 0 0 / 0.65), rgb(0 0 0 / 0.2))` }}
                />
              </div>
              <div className="leaf-face" data-back inert>
                {pages[flip.dir === "next" ? flip.to * 2 : flip.to * 2 + 1]}
                <div
                  className="leaf-shade"
                  style={{ background: `linear-gradient(${flip.dir === "next" ? "to left" : "to right"}, rgb(0 0 0 / 0.65), rgb(0 0 0 / 0.2))` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <nav className="book-controls" aria-label="Pages">
        <button type="button" onClick={prev} disabled={atStart} aria-label="Previous page">
          ←
        </button>
        <span aria-live="polite">{label}</span>
        <span aria-hidden className="book-progress">
          <span style={{ transform: `scaleX(${(narrow ? (page + 1) / total : (spread + 1) / spreads).toFixed(3)})` }} />
        </span>
        <button type="button" onClick={next} disabled={atEnd} aria-label="Next page">
          →
        </button>
      </nav>
    </>
  );
}
