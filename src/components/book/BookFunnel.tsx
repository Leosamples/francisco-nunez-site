import { funnelNav } from "@/content/book";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { AboutAuthor } from "./AboutAuthor";
import { AuthorNote } from "./AuthorNote";
import { ChapterList } from "./ChapterList";
import { ChapterMarquee } from "./ChapterMarquee";
import { EmailCapture } from "./EmailCapture";
import { Excerpt } from "./Excerpt";
import { FocusFramework } from "./FocusFramework";
import { FormatCards } from "./FormatCards";
import { Hero } from "./Hero";
import { Introduction } from "./Introduction";
import { LaserShow } from "./LaserShow";
import { PullQuote } from "./PullQuote";

/**
 * The complete book funnel, laid out as an editorial feature. Route-agnostic:
 * mount it from any page file (currently app/page.tsx; later app/book/page.tsx).
 */
export function BookFunnel() {
  return (
    <>
      <SiteNav links={funnelNav} cta={{ label: "Get The Book", href: "#formats" }} />
      {/* z-10: above the fixed laser layer (z-0) */}
      <main className="relative z-10">
        <Hero />
        <ChapterMarquee />
        <Introduction />
        <AuthorNote />
        <PullQuote />
        <Excerpt />
        <ChapterList />
        <FocusFramework />
        <AboutAuthor />
        <FormatCards />
        <EmailCapture />
      </main>
      <SiteFooter links={funnelNav} />
      <LaserShow heroId="hero" />
    </>
  );
}
