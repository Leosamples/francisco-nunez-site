# Francisco Nunez — site

Next.js (App Router) + Tailwind v4 + Motion + React Three Fiber.

Right now the site is only the book funnel for *The Source Code to Focus*, served at `/`.

## Structure

- `src/app/page.tsx` — mounts `<BookFunnel />`. When the full site launches, move this file to `src/app/book/page.tsx`.
- `src/components/site/` — shared across pages: nav, footer, logo, buttons, container, section headings, scroll reveal.
- `src/components/book/` — funnel sections, and the 3D book (`BookStage` → `BookCanvas`).
- `src/content/` — all copy and config. `book.ts` holds the chapters, bonus, bio, prices, distributor links, and the cover image (`BOOK_COVER`).
- Brand tokens live in `src/app/globals.css` (`@theme`).

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The launch-updates form and the format buttons are visual placeholders for now; neither is wired to an email platform or a distributor.
