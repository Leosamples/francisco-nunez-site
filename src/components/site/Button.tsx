import Link from "next/link";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-flame text-paper shadow-[0_0_32px_-8px_var(--color-cyan)] hover:shadow-[0_0_44px_-6px_var(--color-cyan)] hover:brightness-110",
  ghost: "border border-ink-line text-paper hover:border-cyan hover:text-cyan",
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
  if (/^https?:/.test(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
