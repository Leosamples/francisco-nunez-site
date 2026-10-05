import type { Metadata } from "next";
import { BookFunnel } from "@/components/book/BookFunnel";
import { BOOK_COVER, book } from "@/content/book";

// The book funnel is the whole site for now. When the full site launches,
// move this file to app/book/page.tsx.
export const metadata: Metadata = {
  title: { absolute: `${book.title} — ${book.author}` },
  description: `${book.subtitle.charAt(0).toUpperCase() + book.subtitle.slice(1)}. The new book by ${book.author}.`,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: book.title,
    description: `${book.subtitle.charAt(0).toUpperCase() + book.subtitle.slice(1)}.`,
    images: [{ url: BOOK_COVER.src, width: BOOK_COVER.width, height: BOOK_COVER.height }],
  },
};

export default function Home() {
  return <BookFunnel />;
}
