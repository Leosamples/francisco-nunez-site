# Francisco Nunez — site

Next.js (App Router) + Tailwind v4 + Motion + React Three Fiber.

Right now the site is only the book funnel for *The Source Code to Focus*, served at `/`.

## Structure

Right now the site is only the book funnel for *The Source Code to Focus*, served at `/`, laid out as an open book: every section is a two-page spread.

- `src/app/page.tsx` — mounts `<BookFunnel />`. When the full site launches, move this file to `src/app/book/page.tsx`.
- `src/components/book/BookFunnel.tsx` — the page list in reading order (front matter gets roman folios, then 1, 2, 3 from the Contents).
- `src/components/book/pages.tsx` — what's on each page; long texts are split across pages by paragraph ranges.
- `src/components/book/spread/` — `SpreadBook` (page turning: flip, keys, swipe, edges, #hash), `Page` (paper, spine shadow, folio).
- `src/components/site/` — shared across pages: nav, flashlight cursor/light, logo, buttons, reveal.
- `src/content/` — all copy and config (`book.ts`: chapters, bonus, bio, prices, distributor links, cover).
- Brand tokens and the book/spread CSS live in `src/app/globals.css`.
- Logo: `public/images/logo.png`, used as-is in the nav. The favicon (`src/app/icon.png`) is the emblem cropped from it.
- `/?diag` shows an on-device diagnostics overlay (iOS version, hydration, reduced motion, errors).

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The launch-updates form and the format buttons are visual placeholders for now; neither is wired to an email platform or a distributor.
