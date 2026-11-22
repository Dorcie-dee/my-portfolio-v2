import { FileText } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { type CvLink, shortName } from "@/lib/content";
import { navItems } from "@/lib/nav";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

type SiteHeaderProps = {
  name: string;
  monogram: string | null;
  /** Shown only when the CV is visible and has a file. */
  cv: CvLink | null;
};

export function SiteHeader({ name, monogram, cv }: SiteHeaderProps) {
  const cvLink = cv?.url ? { href: cv.url, label: cv.buttonLabel || "CV" } : null;

  return (
    <header className="surface-base sticky top-0 z-40 border-b border-line">
      <div className="stripe h-1.5" aria-hidden="true" />
      <Container className="relative flex h-17 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 rounded-lg">
          {monogram ? (
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-[10px] bg-violet font-display text-[13px] font-bold tracking-wider text-white"
            >
              {monogram}
            </span>
          ) : null}
          <span className="font-display text-sm font-bold tracking-[0.08em] text-plum uppercase">
            <span className="sm:hidden">{shortName(name)}</span>
            <span className="hidden sm:inline">{name}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            <NavLinks items={navItems} />
            {cvLink ? (
              <li className="ml-2">
                <a
                  href={cvLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-outline px-4 py-1.5 text-sm font-bold text-fg transition-colors hover:bg-plum hover:text-ivory"
                >
                  <FileText className="size-4" aria-hidden="true" />
                  {cvLink.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
          </ul>
        </nav>

        <MobileNav items={navItems} cv={cvLink} />
      </Container>
    </header>
  );
}
