"use client";

import { useEffect, useRef, useState } from "react";
import { wordAtPoint } from "@/lib/wordAtPoint";

/**
 * Flashlight cursor + ambient light.
 *
 * Layers (all fixed, pointer-events: none, transform/opacity only):
 * - light: a soft cream/amber pool that trails the pointer. It sits BEHIND the
 *   page content (z-0, like the laser), so it can only lift the background —
 *   it never covers or tints text.
 * - cursor (z-[100], above the nav): the flashlight icon, placed so its lens
 *   tip is exactly the pointer position (the click hotspot). No smoothing, so
 *   clicks land where they look like they will.
 * - laser dot (z-[100]): over primary buttons ([data-cursor="laser"]) the wide
 *   light narrows away and a tight red dot appears at the hotspot — scattered
 *   light focusing into a laser.
 *
 * - lit word: the word under the lens tip brightens with a warm glow (CSS
 *   Custom Highlight API), and a soft oval of light lands on it — the beam's
 *   spot on the page (z-[60], low strength, sized to the word). Mouse/trackpad
 *   only; not on primary buttons.
 *
 * One requestAnimationFrame loop positions everything and stops when nothing
 * is moving. The system cursor is hidden (html.flashlight-cursor) only after
 * that loop has drawn the custom cursor; otherwise the native cursor stays.
 * The cursor elements aren't rendered on devices without a fine pointer. On
 * touch, the light follows the finger while it's down and fades on lift.
 * Reduced motion: the light tracks the pointer directly — no trailing, no
 * easing, no pulse.
 */

export const LIGHT_SIZE = 720; // px diameter of the light pool
/** The light's look; the nav reuses it so the pool reads as one light across the nav edge. */
export const LIGHT_GRADIENT =
  "bg-[radial-gradient(circle,rgba(245,241,234,0.11)_0%,rgba(245,166,35,0.09)_28%,rgba(245,166,35,0.03)_50%,transparent_70%)]";
/** Narrows away into the laser dot over primary buttons. */
export const LIGHT_STATES =
  "transition-[scale,opacity] duration-300 ease-out data-[state=laser]:scale-[0.12] data-[state=laser]:opacity-0 motion-reduce:transition-none";
const HOTSPOT = 2; // px: lens tip inside the 28px cursor icon
// The beam's spot on the lit word: a base ellipse scaled to fit each word.
const SPOT_W = 200;
const SPOT_H = 100;
const INTERACTIVE = 'a[href], button, [role="button"], summary, label[for], select, input:not([disabled])';

type Mode = "none" | "mouse" | "touch";

export function Flashlight() {
  const [finePointer, setFinePointer] = useState(false);
  const light = useRef<HTMLDivElement>(null);
  const lightInner = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorInner = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);

  // Only build the custom cursor where a precise pointer exists.
  useEffect(() => {
    const mq = window.matchMedia("(any-pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const L = light.current;
    const LI = lightInner.current;
    if (!L || !LI) return;
    const C = cursor.current; // null on touch-only devices
    const CI = cursorInner.current;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // The nav draws its own copy of the light above its background (the main
    // light sits behind content, so the nav would otherwise hide it). Mouse only.
    let navLight: HTMLElement | null = null;
    const nav = () => {
      if (!navLight || !navLight.isConnected) navLight = document.querySelector<HTMLElement>("[data-flashlight-nav-light]");
      return navLight;
    };

    // The word under the lens is lit via the CSS Custom Highlight API
    // (::highlight(flashlight) in globals.css): restyles text without touching
    // the DOM. Browsers without it simply don't light words.
    const highlight = typeof Highlight !== "undefined" && typeof CSS !== "undefined" && "highlights" in CSS ? new Highlight() : null;
    if (highlight) CSS.highlights.set("flashlight", highlight);
    let litWord: Range | null = null;
    let wordDirty = false;
    const setWord = (r: Range | null) => {
      if (!highlight) return;
      const same =
        r && litWord && r.startContainer === litWord.startContainer && r.startOffset === litWord.startOffset && r.endOffset === litWord.endOffset;
      if (same || (!r && !litWord)) return;
      highlight.clear();
      if (r) highlight.add(r);
      litWord = r;
    };

    // The beam landing on the lit word: a soft warm oval sized to the word,
    // drawn over the text at low strength (light on a page, not a highlighter).
    // Glides word to word; fades in fresh rather than sliding in from afar.
    const placeSpot = (r: Range | null) => {
      const SP = spot.current;
      if (!SP) return;
      if (!r) {
        SP.dataset.on = "0";
        return;
      }
      const b = r.getBoundingClientRect();
      const w = Math.max(b.width + 56, 72);
      const h = Math.max(b.height * 2.6, 52);
      const appearing = SP.dataset.on !== "1";
      SP.style.transition = appearing || reduced.matches ? "opacity 200ms ease-out" : "";
      SP.style.transform = `translate3d(${b.left + b.width / 2 - SPOT_W / 2}px, ${b.top + b.height / 2 - SPOT_H / 2}px, 0) scale(${w / SPOT_W}, ${h / SPOT_H})`;
      SP.dataset.on = "1";
    };

    let mode: Mode = "none";
    const target = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };
    let raf = 0;
    let last = 0;

    const setVisible = (on: boolean) => {
      L.dataset.on = on ? "1" : "0";
      if (C) C.dataset.on = on && mode === "mouse" ? "1" : "0";
      const n = nav();
      if (n) n.dataset.on = on && mode === "mouse" ? "1" : "0";
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
      last = now;
      // light trails with frame-rate-independent easing; reduced motion: direct
      const k = reduced.matches ? 1 : 1 - Math.exp(-dt * 12);
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      const lightTf = `translate3d(${pos.x - LIGHT_SIZE / 2}px, ${pos.y - LIGHT_SIZE / 2}px, 0)`;
      L.style.transform = lightTf;
      // the nav is fixed at the viewport's top-left, so the same transform lines up
      const n = mode === "mouse" ? nav() : null;
      if (n) n.style.transform = lightTf;
      if (wordDirty && mode === "mouse") {
        wordDirty = false;
        const word = CI?.dataset.state === "laser" ? null : wordAtPoint(target.x, target.y);
        setWord(word);
        placeSpot(word);
      }
      if (C && mode === "mouse") {
        C.style.transform = `translate3d(${target.x - HOTSPOT}px, ${target.y - HOTSPOT}px, 0)`;
        // confirmed running: now it's safe to hide the system cursor
        if (!root.classList.contains("flashlight-cursor")) root.classList.add("flashlight-cursor");
      }
      if (Math.abs(target.x - pos.x) > 0.3 || Math.abs(target.y - pos.y) > 0.3) raf = requestAnimationFrame(frame);
      else last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const jump = (x: number, y: number) => {
      target.x = pos.x = x;
      target.y = pos.y = y;
    };

    // ---- mouse / pen
    const setState = (el: Element | null) => {
      if (!CI) return;
      const hit = el?.closest(INTERACTIVE) ?? null;
      const laser = el?.closest('[data-cursor="laser"]') ?? null;
      const state = laser ? "laser" : hit ? "hover" : "idle";
      if (CI.dataset.state !== state) {
        CI.dataset.state = state;
        LI.dataset.state = state;
        const ni = nav()?.firstElementChild as HTMLElement | null | undefined;
        if (ni) ni.dataset.state = state;
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (mode !== "mouse") {
        mode = "mouse";
        jump(e.clientX, e.clientY);
      }
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      setState(e.target as Element);
      wordDirty = true;
      kick();
    };
    const onPointerLeave = () => {
      if (mode === "mouse") setVisible(false);
      setWord(null);
      placeSpot(null);
    };
    // text scrolls under a still cursor: re-check which word is lit
    const onScroll = () => {
      if (mode !== "mouse" || !highlight) return;
      wordDirty = true;
      kick();
    };

    // ---- touch: light follows the finger while it's down (touch events keep
    // firing during a scroll-drag, unlike pointer events)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      if (mode !== "touch") {
        mode = "touch";
        setWord(null);
        placeSpot(null);
        root.classList.remove("flashlight-cursor");
        if (C) C.dataset.on = "0";
      }
      if (e.type === "touchstart") jump(t.clientX, t.clientY);
      target.x = t.clientX;
      target.y = t.clientY;
      LI.dataset.state = "idle";
      setVisible(true);
      kick();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) setVisible(false);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("flashlight-cursor");
      if (highlight) CSS.highlights.delete("flashlight");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [finePointer]);

  return (
    <>
      {/* the light — behind content */}
      <div
        ref={light}
        aria-hidden
        data-on="0"
        className="pointer-events-none fixed top-0 left-0 z-0 opacity-0 transition-opacity duration-300 will-change-transform data-[on=1]:opacity-100 motion-reduce:transition-none"
        style={{ width: LIGHT_SIZE, height: LIGHT_SIZE }}
      >
        <div
          ref={lightInner}
          data-state="idle"
          className={`size-full rounded-full ${LIGHT_GRADIENT} ${LIGHT_STATES}`}
        />
      </div>

      {/* the beam's spot on the lit word — above the nav (z-60), below the cursor */}
      {finePointer && (
        <div
          ref={spot}
          aria-hidden
          data-on="0"
          className="pointer-events-none fixed top-0 left-0 z-[60] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,244,228,0.16)_0%,rgba(245,166,35,0.11)_36%,rgba(245,166,35,0.035)_58%,transparent_72%)] opacity-0 transition-[transform,opacity] duration-150 ease-out will-change-transform data-[on=1]:opacity-100"
          style={{ width: SPOT_W, height: SPOT_H }}
        />
      )}

      {/* the cursor + laser dot — only where there's a fine pointer */}
      {finePointer && (
        <div
          ref={cursor}
          aria-hidden
          data-on="0"
          className="pointer-events-none fixed top-0 left-0 z-[100] opacity-0 will-change-transform data-[on=1]:opacity-100"
        >
          <div
            ref={cursorInner}
            data-state="idle"
            className="group relative origin-[2px_2px] transition-transform duration-150 ease-out data-[state=hover]:scale-[1.22] data-[state=laser]:scale-[1.1] motion-reduce:transition-none"
          >
            {/* focus moment: the tight red laser dot at the hotspot */}
            <span className="absolute top-[2px] left-[2px] size-3 -translate-x-1/2 -translate-y-1/2 scale-[3] rounded-full bg-[radial-gradient(circle,#ffdf9e_0%,var(--color-red)_38%,rgba(196,30,30,0.35)_62%,transparent_72%)] opacity-0 transition-[scale,opacity] duration-300 ease-out group-data-[state=laser]:scale-100 group-data-[state=laser]:opacity-100 motion-reduce:transition-none" />
            <FlashlightIcon />
          </div>
        </div>
      )}
    </>
  );
}

/** 28px flashlight, lens tip at (2,2), beam pointing up-left. */
function FlashlightIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="block overflow-visible transition-opacity duration-300 group-data-[state=laser]:opacity-85">
      <defs>
        <radialGradient id="fl-lens-glow">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#f5a623" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* amber glow at the lens */}
      <circle cx="4.5" cy="4.5" r="6.5" fill="url(#fl-lens-glow)" />
      {/* drawn pointing left, rotated 45° so it points up-left; lens front at the origin */}
      <g transform="translate(2 2) rotate(45)" stroke="#000" strokeWidth="0.9" strokeLinejoin="round">
        <ellipse cx="1.4" cy="0" rx="1.4" ry="4.6" fill="#f5a623" />
        <path d="M1.4 -4.6 L8 -4.6 L11.5 -2.6 L11.5 2.6 L8 4.6 L1.4 4.6 Z" fill="#f5f1ea" />
        <rect x="11.5" y="-2.6" width="12.5" height="5.2" rx="1.2" fill="#f5f1ea" />
        <rect x="15" y="-3.4" width="3.6" height="1.2" rx="0.4" fill="#c41e1e" strokeWidth="0.5" />
        <rect x="23.5" y="-3" width="2.4" height="6" rx="0.9" fill="#d9d2c6" />
      </g>
    </svg>
  );
}
