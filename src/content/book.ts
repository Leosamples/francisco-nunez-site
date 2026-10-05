// All copy and config for the book funnel. Copy is excerpted from the
// manuscript ("The Source Code to Focus - Formatted Copy.docx"); the
// Focus Framework copy comes from the six-disciplines companion sheet.

import type { NavItem } from "./site";

export const book = {
  title: "The Source Code to Focus",
  // The hero sets the title in two parts; the second part glows.
  titleLead: "The Source",
  titleGlow: "Code to Focus",
  subtitle: "How to become a laser in a room full of flashlights",
  author: "Francisco Nunez",
};

/** The front cover as a flat image: the social share image. */
export const BOOK_COVER = { src: "/images/book-cover.jpg", width: 909, height: 1600 };

/**
 * The dust jacket, face by face, for the 3D book in the hero. Proportions
 * come from the art: width 0.568x and thickness 0.107x the height.
 */
export const JACKET = {
  front: { src: "/images/cover-front.png", width: 1534, height: 2700 },
  spine: { src: "/images/cover-spine.png", width: 288, height: 2700 },
  back: { src: "/images/cover-back.png", width: 1560, height: 2700 },
};

// In-page anchors; the funnel is currently the whole site.
export const funnelNav: NavItem[] = [
  { label: "Excerpt", href: "#excerpt" },
  { label: "Chapters", href: "#chapters" },
  { label: "Bonus", href: "#bonus" },
  { label: "Author", href: "#author" },
];

// The book's Introduction, verbatim (typography only: "Sourcecode" → "Source
// Code", closing quote added). The two "why" sentences are lifted out into the
// author's note below rather than repeated here.
export const introduction = {
  heading: "This book is not for everybody.",
  paragraphs: [
    "Who is this book for? I’d love to give you a cliché response and say, “Oh yes, this book is for everyone. Anyone who can read should pick it up. If you have a pulse, have at it!”",
    "But the truth is, this book is NOT for everybody. Let me repeat. Everybody can read this book, but it isn’t necessarily for everybody.",
    "The Source Code to Focus is systematically engineered for those who hear the voice.",
    "What voice?",
    "Well, it comes in many tones—high, low, angry, sad, positive, and motivating.",
    "The voice that tells you that you are made for more and that you are ready to take action on that “more.” The voice that pulls you toward your craft while the rest of the world pulls you toward distraction. It is the same voice that often makes you feel strangely out of place in mundane, shallow conversations because part of you knows you were made for more. It is the voice that beckons you to continue to work on your personal growth, progress, and self-actualization.",
    "This book is for entrepreneurs, creators, and ambitious people trying to build the discipline and consistency necessary to expand their businesses and ultimately create something meaningful beyond mere survival.",
    "Lastly, this is for the person who values potential and freedom.",
    "If you cannot focus on your goals or purpose for extended periods, you will never fully reach your potential. Focus and discipline create freedom by freeing you from procrastination, distraction, and the habits that keep you stuck. This creates freedom from an ordinary life and gives you the freedom to pursue the dreams you once thought were unattainable.",
  ],
};

// Author's note: the Introduction's own "why", verbatim.
export const authorNote = {
  heading: "Why I Wrote This Book",
  lines: [
    "This book is for me.",
    "The principles in this book are the very tenets I had to apply to see it through to completion successfully.",
  ],
  signature: "Francisco Nunez",
  // Transparent cutout (real alpha), cropped mid-thigh with a flat bottom edge.
  photo: {
    src: "/images/francisco-book.png",
    width: 1284,
    height: 2101,
    alt: "Francisco Nunez holding The Source Code to Focus",
  },
};

// Verbatim passages from Chapter 2. Each inner array is a run of consecutive
// paragraphs; a break between runs marks skipped text.
export const excerpt = {
  source: "From Chapter 2",
  heading: "The Laser in a Room Full of Flashlights",
  runs: [
    [
      "So what does it actually mean to be a laser in a room full of flashlights?",
      "Let’s take a second to break this down.",
      "What is a flashlight?",
      "A flashlight is a portable electric lamp, usually battery-powered, designed to illuminate dark spaces. It’s useful for things like camping, navigating dark places, or temporarily seeing what’s in front of you. A flashlight can light up a reasonably large area, but it lacks focus. Its light scatters, limiting both its precision and range.",
      "If your goal requires accuracy, power, or sustained direction, a flashlight is not enough. You cannot cut through steel with it. You cannot drill through material. You cannot use it for precise alignment.",
      "Now compare that to a laser.",
    ],
    [
      "A laser works by exciting atoms to emit light in a narrow, coherent, and highly directional beam. The result is concentrated power capable of remarkable precision over long distances.",
    ],
    [
      "Most people today, whether intentionally or through unconscious habits, operate more like flashlights than lasers.",
      "Their attention is scattered. Their energy is diluted. Their focus changes direction every few minutes.",
      "Harsh? No. That’s reality.",
    ],
    [
      "To gain control of your day, and ultimately your life, you must learn to operate like a laser. Begin taking small, intentional actions. Begin thinking long term.",
      "A laser is focused. It illuminates a path over long distances. It guides, removes obstacles, and amplifies effectiveness.",
    ],
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
  // The book's About the Author page, verbatim except the employer, which is
  // not named on the site.
  bio: [
    "Francisco Nunez is a high-performance coach, keynote speaker, and thought partner for individuals ready to unlock discipline, alignment, and purpose. With more than 15 years of experience in technology, leadership, and personal development, he combines practical strategy with a deep understanding of human growth to help people move with clarity and intention.",
    "Professionally, Francisco serves as a Senior Solutions Engineer at a major technology company, where he works with complex technologies and enterprise solutions. Outside the tech world, he has spent over a decade and a half studying personal development and coaching, with experience spanning sales leadership, direct sales, nonprofit mentoring, and small-business development.",
    "Francisco attended Morehouse College, where he earned a bachelor’s degree in computer science and mathematics. Born in the Dominican Republic and raised in Prince George’s County, Maryland, his journey has been shaped by diverse experiences, meaningful relationships, and a commitment to lifelong growth.",
    "With a dual mastery in technology and human performance, Francisco bridges the worlds of innovation and intention, helping individuals, teams, and entrepreneurs unlock their next level. His coaching spans from habit architecture design to identity work to long-term goal execution, effectively guiding high performers to design lives that actually match their vision.",
    "Whether he’s building intelligent solutions in the tech space or guiding clients through personal transformation, Francisco’s work is grounded in discipline, purpose, and service. His mission is simple: to help people become more intentional, lead with clarity, and live up to their highest potential.",
  ],

};

export type Format = {
  name: string;
  price: string;
  note: string;
  /** Distributor link. `null` until the URL is final — the card shows an inert "Coming soon" label. */
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
