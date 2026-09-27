import { site, type NavItem } from "@/content/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function SiteFooter({ links = [] }: { links?: NavItem[] }) {
  return (
    <footer className="border-t border-ink-line bg-ink">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-slate">{site.tagline}</p>
        </div>
        {links.length > 0 && (
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-cyan">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
      <Container className="border-t border-ink-line py-6">
        <p className="text-xs text-slate">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
