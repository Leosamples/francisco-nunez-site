// Site-wide config shared by every page (nav, footer, metadata).

/** The live site. */
export const PRODUCTION_URL = "https://francisco-nunez-site.vercel.app";

export const site = {
  name: "Francisco Nunez",
  // Absolute URLs (share image, canonical, og:url) resolve against this.
  // Production builds use the live address; NEXT_PUBLIC_SITE_URL overrides it
  // (e.g. when a custom domain goes live); local dev uses localhost.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000"),
  description:
    "Francisco Nunez — high-performance coach, keynote speaker, and author of The Source Code to Focus.",
  tagline: "Motivation with structure.",
};

export type NavItem = { label: string; href: string };
