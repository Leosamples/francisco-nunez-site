"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/content/site";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { LIGHT_GRADIENT, LIGHT_SIZE, LIGHT_STATES } from "./Flashlight";
import { Logo } from "./Logo";

export function SiteNav({ links = [], cta }: { links?: NavItem[]; cta?: NavItem }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "1" : "0"}
      className={`group/nav fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-ink-line bg-ink/95" : "border-b border-transparent"
      }`}
    >
      {/* The flashlight's light, continued over the nav's background (positioned by
          <Flashlight>). Only once the nav is opaque — at the top of the page the
          main light already shows through. Same gradient, so it reads as one light. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-data-[scrolled=1]/nav:opacity-100 motion-reduce:transition-none"
      >
        <div
          data-flashlight-nav-light
          data-on="0"
          className="absolute top-0 left-0 opacity-0 transition-opacity duration-300 will-change-transform data-[on=1]:opacity-100 motion-reduce:transition-none"
          style={{ width: LIGHT_SIZE, height: LIGHT_SIZE }}
        >
          <div data-state="idle" className={`size-full rounded-full ${LIGHT_GRADIENT} ${LIGHT_STATES}`} />
        </div>
      </div>
      {/* relative: keeps the logo and links above the light */}
      <Container className="relative flex h-20 items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-7">
          {links.length > 0 && (
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex gap-7 text-sm font-semibold text-muted">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition hover:text-paper">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {cta && (
            <ButtonLink href={cta.href} size="md">
              {cta.label}
            </ButtonLink>
          )}
        </div>
      </Container>
    </header>
  );
}
