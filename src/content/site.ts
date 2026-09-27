// Site-wide config shared by every page (nav, footer, metadata).

export const site = {
  name: "Francisco Nunez",
  // Absolute URLs (e.g. the social share image) resolve against this. Set
  // NEXT_PUBLIC_SITE_URL once the custom domain is live; until then Vercel's
  // production URL is used, and localhost only in local dev.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Francisco Nunez — high-performance coach, keynote speaker, and author of The Source Code to Focus.",
  tagline: "Motivation with structure.",
};

export type NavItem = { label: string; href: string };
