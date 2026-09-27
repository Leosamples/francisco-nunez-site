"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { BOOK_COVER, book } from "@/content/book";

const BookCanvas = dynamic(() => import("./BookCanvas"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Renders a static, pre-tilted cover immediately (fast first paint), then
 * swaps in the live 3D book once the browser is idle. Reduced-motion users
 * and devices without WebGL keep the static cover.
 */
export function BookStage() {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [load3D, setLoad3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (reduced || !hasWebGL()) return;
    const start = () => setLoad3D(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 400);
    return () => clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:max-w-[30rem]">
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-700 [perspective:1400px] ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={BOOK_COVER.src}
          width={BOOK_COVER.width}
          height={BOOK_COVER.height}
          alt={`${book.title} by ${book.author}`}
          priority
          sizes="(min-width: 1024px) 22rem, 60vw"
          className="w-[62%] rounded-[3px] shadow-[18px_24px_60px_-12px_rgba(0,0,0,0.8),0_0_60px_-20px_var(--color-cyan)] [transform:rotateY(-22deg)_rotateX(3deg)]"
        />
      </div>
      {load3D && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <BookCanvas coverSrc={BOOK_COVER.src} active={visible} onReady={onReady} />
        </div>
      )}
    </div>
  );
}
