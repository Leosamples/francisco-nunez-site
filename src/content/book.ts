// All copy and config for the book funnel. Copy is excerpted from the
// manuscript ("The Source Code to Focus - Formatted Copy.docx"); the
// Focus Framework copy comes from the six-disciplines companion sheet.

import type { NavItem } from "./site";

export const book = {
  title: "The Source Code to Focus",
  subtitle: "How to become a laser in a room full of flashlights",
  author: "Francisco Nunez",
};

/**
 * The 3D book's front-cover texture and the static fallback image.
 * To use the real cover, drop a flat, straight-on cover image
 * (≈1600×2400, 2:3) in /public/images and change `src` below.
 */
export const BOOK_COVER = { src: "/images/cover-placeholder.jpg", width: 800, height: 1200 };

// In-page anchors; the funnel is currently the whole site.
export const funnelNav: NavItem[] = [
  { label: "Chapters", href: "#chapters" },
  { label: "Bonus", href: "#bonus" },
  { label: "Author", href: "#author" },
];

export const hook = {
  eyebrow: "Introduction",
  heading: "This book is not for everybody.",
  // Excerpt from the Introduction.
  paragraphs: [
    "Everybody can read this book, but it isn’t necessarily for everybody.",
    "The Source Code to Focus is systematically engineered for those who hear the voice.",
    "The voice that tells you that you are made for more and that you are ready to take action on that “more.” The voice that pulls you toward your craft while the rest of the world pulls you toward distraction.",
    "This book is for entrepreneurs, creators, and ambitious people trying to build the discipline and consistency necessary to expand their businesses and ultimately create something meaningful beyond mere survival.",
  ],
};

// Verbatim from the Introduction.
export const pullQuote =
  "Focus and discipline create freedom by freeing you from procrastination, distraction, and the habits that keep you stuck.";

export type Chapter = { number: number; title: string; teaser: string };

// Teasers are lines from each chapter.
export const chapters: Chapter[] = [
  {
    number: 1,
    title: "The Focus Problem",
    teaser:
      "There is a mass epidemic plaguing our society: a focus famine. We have to reclaim authority over our attention.",
  },
  {
    number: 2,
    title: "The Laser in a Room Full of Flashlights",
    teaser:
      "A flashlight lights up a large area, but it lacks focus. A laser is focused, powerful, and guided — capable of reaching far distances with precision.",
  },
  {
    number: 3,
    title: "Choose Your Target",
    teaser:
      "Once you identify the target and the reason behind it, you adjust your scope. Clarity sharpens execution.",
  },
  {
    number: 4,
    title: "Choosing the Path",
    teaser:
      "Developing a plan to achieve your goal within a defined timeline is the difference between intention and actual results.",
  },
  {
    number: 5,
    title: "Creating a Pocket",
    teaser:
      "A Focus Pocket is a dedicated block of time reserved for the work that matters most — where real progress happens.",
  },
  {
    number: 6,
    title: "Listen to Mother",
    teaser:
      "Repetition is the mother of skill. You’re not just building a habit here. You’re training an identity.",
  },
  {
    number: 7,
    title: "Review the Game Tape: Reflection",
    teaser:
      "Reflection isn’t simply an intermission from work. Reflection is how work multiplies.",
  },
  {
    number: 8,
    title: "Finishing the Meal: The Secret Sauce",
    teaser:
      "The ingredient that ties everything together — borrowing experience instead of paying for every lesson yourself.",
  },
];

export type Discipline = { title: string; body: string };

export const focusFramework = {
  eyebrow: "Included bonus",
  heading: "The Focus Framework",
  intro:
    "A companion breakdown that comes with the book: six disciplines that turn scattered flashlight energy into the concentrated, compounding power of a laser.",
  disciplines: [
    {
      title: "Name the Problem",
      body: "Double D Syndrome — digital distraction — quietly steals focused hours every day. Self-awareness is the first and most powerful interruption to that cycle.",
    },
    {
      title: "Choose Your Target",
      body: "A goal without a clear target, a compelling why, and a defined timeline stays abstract. Stretch goals — uncomfortable but reachable — expand your potential.",
    },
    {
      title: "Build the Plan",
      body: "Milestones, accountability partners, and daily actions convert intention into measurable progress. Reactive sailors drift; proactive ones map the currents.",
    },
    {
      title: "Protect a Pocket",
      body: "A Focus Pocket — a calendar-blocked window inside your peak energy hours — shields priority work from task-switching.",
    },
    {
      title: "Cement the Habit",
      body: "Repetition is the mother of skill. Triggers, habit tracking, and deliberate rewards shift your identity from trying to becoming.",
    },
    {
      title: "Reflect and Mentor",
      body: "Reflection sharpens the axe so the same effort yields better results. Mentorship compresses the learning curve.",
    },
  ] satisfies Discipline[],
};

export const author = {
  name: "Francisco Nunez",
  photo: { src: "/images/francisco-portrait.jpg", width: 696, height: 1400 },
  // Condensed from the book's About the Author page.
  bio: [
    "Francisco Nunez is a high-performance coach, keynote speaker, and thought partner for individuals ready to unlock discipline, alignment, and purpose. With more than 15 years of experience in technology, leadership, and personal development, he combines practical strategy with a deep understanding of human growth.",
    "He serves as a Senior Solutions Engineer at Microsoft, and has spent over a decade and a half studying personal development and coaching — across sales leadership, direct sales, nonprofit mentoring, and small-business development. Born in the Dominican Republic and raised in Prince George’s County, Maryland, he earned his degree in computer science and mathematics at Morehouse College.",
    "His mission is simple: to help people become more intentional, lead with clarity, and live up to their highest potential.",
  ],
};

export type Format = {
  name: string;
  price: string;
  note: string;
  /** Distributor link. `null` until the URL is final — the card then points to launch updates. */
  href: string | null;
};

export const formats: Format[] = [
  { name: "Paperback", price: "$14.99", note: "The classic. Mark it up.", href: null },
  { name: "Ebook", price: "$12.99", note: "Read it anywhere, tonight.", href: null },
  { name: "Hardcover", price: "$18.99", note: "Built for the shelf.", href: null },
];

export const emailCapture = {
  heading: "Not ready yet? Get launch updates.",
  body: "Release dates, early excerpts, and first word when the book goes live. No noise.",
};
