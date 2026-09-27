import { funnelNav } from "@/content/book";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { AboutAuthor } from "./AboutAuthor";
import { ChapterList } from "./ChapterList";
import { EmailCapture } from "./EmailCapture";
import { FocusFramework } from "./FocusFramework";
import { FormatCards } from "./FormatCards";
import { Hero } from "./Hero";
import { Hook } from "./Hook";
import { PullQuote } from "./PullQuote";

/**
 * The complete book funnel. Route-agnostic: mount it from any page file
 * (currently app/page.tsx; later app/book/page.tsx).
 */
export function BookFunnel() {
  return (
    <>
      <SiteNav links={funnelNav} cta={{ label: "Get The Book", href: "#formats" }} />
      <main>
        <Hero />
        <Hook />
        <PullQuote />
        <ChapterList />
        <FocusFramework />
        <AboutAuthor />
        <FormatCards />
        <EmailCapture />
      </main>
      <SiteFooter links={funnelNav} />
    </>
  );
}
