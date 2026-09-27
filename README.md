# Francisco Nunez — site

Next.js (App Router) + Tailwind v4 + Motion + React Three Fiber.

Right now the site is only the book funnel for *The Source Code to Focus*, served at `/`.

## Structure

- `src/app/page.tsx` — mounts `<BookFunnel />`. When the full site launches, move this file to `src/app/book/page.tsx`.
- `src/components/site/` — shared across pages: nav, footer, logo, buttons, container, section headings, scroll reveal.
- `src/components/book/` — funnel sections, and the 3D book (`BookStage` → `BookCanvas`).
- `src/content/` — all copy and config. `book.ts` holds the chapters, bonus, bio, prices, distributor links, and the cover image (`BOOK_COVER`).
- `src/lib/email/` — email-list adapter (Kit today). `src/app/api/subscribe` calls it.
- Brand tokens live in `src/app/globals.css` (`@theme`).

## Setup

```bash
npm install
cp .env.example .env.local   # add Kit keys
npm run dev
```

Without Kit keys, signups are logged to the console in development and return a 503 in production, so they're never silently dropped.
