import { funnelNav } from "@/content/book";
import { roman } from "@/lib/folio";
import { SiteNav } from "@/components/site/SiteNav";
import { ChapterMarquee } from "./ChapterMarquee";
import { LaserShow } from "./LaserShow";
import {
  AuthorBioPage,
  AuthorPhotoPage,
  BonusPage,
  ContentsPage,
  CoverArtPage,
  EditionsPage,
  EXCERPT_ITEM_COUNT,
  ExcerptPage,
  IntroPage,
  NotePhotoPage,
  NoteTextPage,
  OpeningPage,
  QuotePage,
  UpdatesPage,
} from "./pages";
import { ChaptersProvider } from "./spread/ChaptersContext";
import { Page } from "./spread/Page";
import { SpreadBook } from "./spread/SpreadBook";

/**
 * The funnel as an open book: every section is a two-page spread. Pages are
 * listed in reading order; folios are lowercase roman through the front
 * matter, then 1, 2, 3 from the Contents on. Route-agnostic: mount from any
 * page file (currently app/page.tsx; later app/book/page.tsx).
 */
type PageSpec = {
  /** section id this page starts (#links, the nav) */
  id?: string;
  /** the #hash shown while this page is open */
  hash?: string;
  /** front matter (roman folios) */
  front?: boolean;
  /** printed folio? (not on the full-bleed cover) */
  printed?: boolean;
  bleed?: boolean;
  node: React.ReactNode;
};

const PAGES: PageSpec[] = [
  // i–ii
  { front: true, printed: false, bleed: true, node: <CoverArtPage /> },
  { front: true, id: "hero", node: <OpeningPage /> },
  // iii–iv
  { front: true, id: "introduction", hash: "introduction", node: <IntroPage first from={0} to={5} /> },
  { front: true, hash: "introduction", node: <IntroPage from={5} to={9} /> },
  // v–vi
  { front: true, id: "why", hash: "why", node: <NotePhotoPage /> },
  { front: true, hash: "why", node: <NoteTextPage /> },
  // vii–x
  { front: true, hash: "excerpt", node: <QuotePage /> },
  { front: true, id: "excerpt", hash: "excerpt", node: <ExcerptPage first from={0} to={4} /> },
  { front: true, hash: "excerpt", node: <ExcerptPage from={4} to={9} /> },
  { front: true, hash: "excerpt", node: <ExcerptPage last from={9} to={EXCERPT_ITEM_COUNT} /> },
  // 1–2
  { id: "chapters", hash: "chapters", node: <ContentsPage first from={0} to={4} /> },
  { hash: "chapters", node: <ContentsPage from={4} to={8} /> },
  // 3–4
  { id: "bonus", hash: "bonus", node: <BonusPage first from={0} to={3} /> },
  { hash: "bonus", node: <BonusPage from={3} to={6} /> },
  // 5–6
  { id: "author", hash: "author", node: <AuthorPhotoPage to={1} /> },
  { hash: "author", node: <AuthorBioPage from={1} /> },
  // 7–8
  { id: "formats", hash: "formats", node: <EditionsPage /> },
  { id: "updates", hash: "formats", node: <UpdatesPage /> },
];

// Set paged mode before first paint (no flash of stacked spreads). If the app
// never hydrates (e.g. scripts fail to load), fall back to stacked, scrollable spreads.
const pagedScript = `(function(){var d=document.documentElement;d.classList.add('paged');setTimeout(function(){if(!window.__fnHydrated)d.classList.remove('paged')},6000)})();`;

export function BookFunnel() {
  let front = 0;
  let body = 0;
  const labels = PAGES.map((p) => (p.front ? roman(++front) : String(++body)));
  const pages = PAGES.map((p, i) => (
    <Page key={i} side={i % 2 === 0 ? "left" : "right"} folio={p.printed === false ? null : labels[i]} anchor={p.id} bleed={p.bleed}>
      {p.node}
    </Page>
  ));
  const contentsSpread = Math.floor(PAGES.findIndex((p) => p.id === "chapters") / 2);

  return (
    <>
      <SiteNav links={funnelNav} cta={{ label: "Get The Book", href: "#formats" }} />
      <script dangerouslySetInnerHTML={{ __html: pagedScript }} />
      {/* no z-index here: the paper must stay in the root stacking context (see .book) */}
      <main>
        <ChaptersProvider>
          <SpreadBook
            pages={pages}
            labels={labels}
            anchors={PAGES.map((p) => p.hash)}
            overlays={[{ spread: contentsSpread, node: <ChapterMarquee /> }]}
          />
        </ChaptersProvider>
      </main>
      <LaserShow heroId="hero" />
    </>
  );
}
