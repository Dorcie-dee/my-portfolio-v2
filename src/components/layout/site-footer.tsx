import { FileText, Mail } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

const linkClass =
  "inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent";

export function SiteFooter() {
  // Evaluated when the page is rendered (at build time for static pages).
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark border-t border-line">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-semibold">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{site.statement}</p>
          </div>

          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6" aria-label="Contact and profiles">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                <Mail className="size-4" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GitHubIcon className="size-4" />
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <LinkedInIcon className="size-4" />
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.cv} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FileText className="size-4" aria-hidden="true" />
                CV<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-fg-muted">
          © {year} {site.name}
        </p>
      </Container>
    </footer>
  );
}
