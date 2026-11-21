import { FileText } from "lucide-react";
import Link from "next/link";
import { navItems, site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="surface-base sticky top-0 z-40 border-b border-line">
      <div className="stripe h-1.5" aria-hidden="true" />
      <Container className="relative flex h-[4.25rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 rounded-lg">
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-[10px] bg-violet font-display text-[13px] font-bold tracking-wider text-white"
          >
            {site.monogram}
          </span>
          <span className="font-display text-sm font-bold tracking-[0.08em] text-plum uppercase">
            <span className="sm:hidden">Dorcas N. Quaye</span>
            <span className="hidden sm:inline">{site.name}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            <NavLinks items={navItems} />
            <li className="ml-2">
              <a
                href={site.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-outline px-4 py-1.5 text-sm font-bold text-fg transition-colors hover:bg-plum hover:text-ivory"
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
