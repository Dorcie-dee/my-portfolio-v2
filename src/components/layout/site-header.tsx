import { FileText } from "lucide-react";
import Link from "next/link";
import { navItems, site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="surface-dark sticky top-0 z-40 border-b border-line">
      <Container className="relative flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 rounded-md">
          <span
            aria-hidden="true"
            className="flex h-8 items-center rounded border border-accent px-1.5 font-mono text-xs font-semibold tracking-wider text-accent"
          >
            {site.monogram}
          </span>
          <span className="text-sm font-semibold tracking-wide uppercase">
            <span className="sm:hidden">Dorcas N. Quaye</span>
            <span className="hidden sm:inline">{site.name}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <a
                href={site.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <FileText className="size-4" aria-hidden="true" />
                CV
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <MobileNav items={navItems} cvHref={site.cv} />
      </Container>
    </header>
  );
}
