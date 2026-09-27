"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/content/site";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-ink-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-7">
          {links.length > 0 && (
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex gap-7 text-sm font-semibold text-slate">
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
