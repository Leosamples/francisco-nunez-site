// Site-wide config shared by every page (nav, footer, metadata).

export const site = {
  name: "Francisco Nunez",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Francisco Nunez — high-performance coach, keynote speaker, and author of The Source Code to Focus.",
  tagline: "Motivation with structure.",
};

export type NavItem = { label: string; href: string };
