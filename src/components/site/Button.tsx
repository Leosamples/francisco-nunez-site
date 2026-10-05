import Link from "next/link";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-sans font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-red text-paper hover:bg-amber hover:text-ink",
  ghost: "border border-paper/20 text-paper hover:border-amber",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClass(variant: Variant = "primary", size: keyof typeof sizes = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

export function ButtonLink({
  href,
  variant,
  size,
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cls = `${buttonClass(variant, size)} ${className}`;
  // primary buttons are where the flashlight cursor focuses into a laser dot
  const cursor = (variant ?? "primary") === "primary" ? { "data-cursor": "laser" } : {};
  // In-page #links stay plain anchors: Next's <Link> updates the URL with
  // pushState, which doesn't fire hashchange (the book turns to sections on it).
  if (href.startsWith("#")) {
    return (
      <a href={href} className={cls} {...cursor} {...rest}>
        {children}
      </a>
    );
  }
  if (/^https?:/.test(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...cursor} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...cursor} {...rest}>
      {children}
    </Link>
  );
}
