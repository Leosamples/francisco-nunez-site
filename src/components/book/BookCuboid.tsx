"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { book, JACKET } from "@/content/book";

/**
 * The book as a real CSS 3D cuboid: six faces in one preserve-3d box —
 * front, back and spine from the dust-jacket art, cream page block on the
 * fore-edge, top and bottom. Proportions come from the art (see .book-scene).
 *
 * Motion: slow continuous 360° turn (~28s) with a gentle float, plus drag to
 * spin (with momentum; the slow turn eases back in). Each face's shade follows
 * the rotation, so faces darken as they turn from the light. The turn and the
 * shading are Web Animations on transform/opacity, so the compositor runs them
 * off the main thread; dragging seeks them. Paused off-screen.
 * Reduced motion: still, front-facing three-quarter view; no float, no spin.
 */

const PERIOD_S = 28; // seconds per full turn
const AUTO = 360 / PERIOD_S; // deg/s
const TILT = -6; // deg: look slightly down onto the top edge
const REST = -22; // deg: the still view (and the first frame)
const LIGHT = { x: -0.42, z: 0.91 }; // from front-left
const DRAG = 0.45; // deg per px
const MAX_FLING = 540; // deg/s

export function BookCuboid() {
  const scene = useRef<HTMLDivElement>(null);
  const cube = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const S = scene.current;
    const C = cube.current;
    if (!S || !C) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const DURATION = PERIOD_S * 1000;

    // Lambert-ish shading: how much a face's normal points at the light, at a given angle.
    // World normals after rotateY: front (sin, cos), back (-sin, -cos), spine (-cos, sin), fore-edge (cos, -sin).
    const lit = (nx: number, nz: number) => Math.max(0, nx * LIGHT.x + nz * LIGHT.z);
    const shadeAt = (face: string, deg: number) => {
      const r = (deg * Math.PI) / 180;
      const sin = Math.sin(r);
      const cos = Math.cos(r);
      const l =
        face === "front" ? lit(sin, cos) : face === "back" ? lit(-sin, -cos) : face === "spine" ? lit(-cos, sin) : lit(cos, -sin);
      return +(0.62 * (1 - l)).toFixed(3);
    };

    let anims: Animation[] = [];
    const still = () => {
      anims.forEach((a) => a.cancel());
      anims = [];
      C.style.transform = `rotateX(${TILT}deg) rotateY(${REST}deg)`;
      C.querySelectorAll<HTMLElement>("[data-shade]").forEach((el) => (el.style.opacity = String(shadeAt(el.dataset.shade!, REST))));
    };

    // The turn and the shading run as compositor animations (transform / opacity):
    // they keep going smoothly even while the main thread is busy with the cursor.
    const build = () => {
      still();
      if (reduced.matches) return;
      const timing: KeyframeAnimationOptions = { duration: DURATION, iterations: Infinity, easing: "linear" };
      anims.push(
        C.animate(
          [{ transform: `rotateX(${TILT}deg) rotateY(${REST}deg)` }, { transform: `rotateX(${TILT}deg) rotateY(${REST + 360}deg)` }],
          timing,
        ),
      );
      const STEPS = 36; // every 10°
      C.querySelectorAll<HTMLElement>("[data-shade]").forEach((el) => {
        const face = el.dataset.shade!;
        const frames = Array.from({ length: STEPS + 1 }, (_, i) => ({ opacity: shadeAt(face, REST + (360 * i) / STEPS) }));
        anims.push(el.animate(frames, timing));
      });
    };

    // ---- drag to spin: seek while dragging; a fling briefly speeds playback, then eases back
    let dragging = false;
    let lastX = 0;
    let lastMove = 0;
    let vel = 0; // deg/s from the drag
    let settle = 0;
    const seekBy = (deg: number) => {
      const dt = (deg / 360) * DURATION;
      anims.forEach((a) => {
        const t = Number(a.currentTime ?? 0) + dt;
        a.currentTime = ((t % DURATION) + DURATION) % DURATION;
      });
    };
    const setRate = (r: number) => anims.forEach((a) => (a.playbackRate = r));
    const easeBack = () => {
      cancelAnimationFrame(settle);
      let rate = vel / AUTO;
      let last = performance.now();
      const step = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        rate += (1 - rate) * Math.min(1, dt * 1.6);
        setRate(rate);
        if (Math.abs(rate - 1) > 0.01) settle = requestAnimationFrame(step);
        else setRate(1);
      };
      settle = requestAnimationFrame(step);
    };

    const onDown = (e: PointerEvent) => {
      if (reduced.matches || !anims.length || (e.pointerType === "mouse" && e.button !== 0)) return;
      dragging = true;
      cancelAnimationFrame(settle);
      anims.forEach((a) => a.pause());
      lastX = e.clientX;
      lastMove = performance.now();
      vel = 0;
      S.setPointerCapture(e.pointerId);
      S.dataset.dragging = "1";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const d = (e.clientX - lastX) * DRAG;
      seekBy(d);
      // fling speed: measured over at least a frame and capped
      const v = (d / Math.max(16, now - lastMove)) * 1000;
      vel = Math.max(-MAX_FLING, Math.min(MAX_FLING, vel * 0.5 + v * 0.5));
      lastX = e.clientX;
      lastMove = now;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      delete S.dataset.dragging;
      if (performance.now() - lastMove > 90 || Math.abs(vel) < AUTO) vel = AUTO; // held still: just resume
      anims.forEach((a) => a.play());
      easeBack();
    };

    // pause off-screen and in background tabs
    const io = new IntersectionObserver(([en]) => anims.forEach((a) => (en.isIntersecting ? a.play() : a.pause())));
    const onReduced = () => build();

    build();
    io.observe(S);
    S.addEventListener("pointerdown", onDown);
    S.addEventListener("pointermove", onMove);
    S.addEventListener("pointerup", onUp);
    S.addEventListener("pointercancel", onUp);
    reduced.addEventListener("change", onReduced);
    return () => {
      cancelAnimationFrame(settle);
      anims.forEach((a) => a.cancel());
      io.disconnect();
      S.removeEventListener("pointerdown", onDown);
      S.removeEventListener("pointermove", onMove);
      S.removeEventListener("pointerup", onUp);
      S.removeEventListener("pointercancel", onUp);
      reduced.removeEventListener("change", onReduced);
    };
  }, []);

  return (
    <div className="book-stage">
      <div ref={scene} className="book-scene" role="img" aria-label={`${book.title} by ${book.author} — 3D book, drag to turn`}>
        {/* the float is its own CSS animation on a wrapper, layered over the turn */}
        <div className="book-float">
          <div ref={cube} className="cuboid" style={{ transform: `rotateX(${TILT}deg) rotateY(${REST}deg)` }}>
            <div className="face face-front">
              <Image src={JACKET.front.src} alt="" fill priority sizes="(min-width: 1024px) 280px, 220px" draggable={false} className="object-cover" />
              <span data-shade="front" className="face-shade" />
            </div>
            <div className="face face-back">
              <Image src={JACKET.back.src} alt="" fill sizes="(min-width: 1024px) 280px, 220px" draggable={false} className="object-cover" />
              <span data-shade="back" className="face-shade" />
            </div>
            <div className="face face-spine">
              <Image src={JACKET.spine.src} alt="" fill sizes="60px" draggable={false} className="object-cover" />
              <span data-shade="spine" className="face-shade" />
            </div>
            <div className="face face-edge">
              <span data-shade="edge" className="face-shade" />
            </div>
            <div className="face face-top" />
            <div className="face face-bottom" />
          </div>
        </div>
      </div>
      <div aria-hidden className="book-floor" />
    </div>
  );
}
