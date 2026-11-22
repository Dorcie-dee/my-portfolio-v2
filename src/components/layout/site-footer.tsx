import { FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { type CvLink, isExternal, platformName, type SocialLink, socialHref } from "@/lib/content";

const linkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-fg transition-colors hover:text-accent";

type SiteFooterProps = {
  name: string;
  monogram: string | null;
  statement: string | null;
  footerText: string | null;
  socialLinks: SocialLink[];
  cv: CvLink | null;
};

export function SiteFooter({ name, monogram, statement, footerText, socialLinks, cv }: SiteFooterProps) {
  // Evaluated when the page is rendered (rebuilt at least every revalidation period).
  const year = new Date().getFullYear();

  return (
    <footer className="surface-plum">
      <div className="stripe h-1.5" aria-hidden="true" />
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-3">
              {monogram ? (
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-[10px] bg-marigold font-display text-[13px] font-bold tracking-wider text-plum"
                >
                  {monogram}
                </span>
              ) : null}
              <span className="font-display font-bold tracking-[0.08em] uppercase">{name}</span>
            </p>
            {statement ? <p className="mt-4 text-sm leading-relaxed text-fg-muted">{statement}</p> : null}
          </div>

          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6" aria-label="Contact and profiles">
            {socialLinks.map((link) => {
              const href = socialHref(link);
              if (!href) return null;
              const external = isExternal(href);
              // Email shows the address itself, as before. Other links show their short label
              // visually and announce the full platform name (e.g. "DEV Community").
              const isEmail = link.platform === "email";
              return (
                <li key={link._id}>
                  <a
                    href={href}
                    className={linkClass}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <SocialIcon platform={link.platform} className="size-4" />
                    {isEmail ? (
                      link.url
                    ) : (
                      <>
                        <span aria-hidden="true">{link.label}</span>
                        <span className="sr-only">{platformName(link)}</span>
                      </>
                    )}
                    {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                </li>
              );
            })}
            {cv?.url ? (
              <li>
                <a href={cv.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <FileText className="size-4" aria-hidden="true" />
                  {cv.buttonLabel || "CV"}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-fg-muted">
          © {year} {name}.{footerText ? ` ${footerText}` : null}
        </p>
      </Container>
    </footer>
  );
}
