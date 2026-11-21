import { ArrowRight } from "lucide-react";
import { rightNow } from "@/data/about";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

const socialClass =
  "inline-flex size-11 items-center justify-center rounded-xl text-fg transition-colors hover:bg-lilac hover:text-accent";

/** Renders the headline with its highlight phrase wrapped in a marigold mark. */
function Headline() {
  const [before, after] = site.headline.split(site.headlineHighlight);
  if (after === undefined) return <>{site.headline}</>;

  return (
    <>
      {before}
      <span className="highlight">{site.headlineHighlight}</span>
      {after}
    </>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="surface-base">
      <Container className="grid items-center gap-14 py-section lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div>
          <p className="eyebrow text-accent">
            {site.greeting} · {site.role}
          </p>
          <h1 id="hero-heading" className="mt-5 text-display text-balance text-plum">
            <Headline />
          </h1>
          <p className="mt-6 max-w-prose-narrow text-lg leading-relaxed text-fg-muted">
            I design and build the server side of web applications: APIs, data models,
            authentication and the automated tests that keep them dependable. When a product
            needs it, I work across the frontend with Next.js and React too.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">
              View projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
            <span className="flex items-center gap-1 sm:ml-2">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={socialClass}>
                <GitHubIcon />
                <span className="sr-only">GitHub profile (opens in a new tab)</span>
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={socialClass}>
                <LinkedInIcon />
                <span className="sr-only">LinkedIn profile (opens in a new tab)</span>
              </a>
            </span>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-lilac px-4 py-1.5 text-sm font-semibold text-ink">
            <span className="size-2 rounded-full bg-violet" aria-hidden="true" />
            {site.availability}
          </p>
        </div>

        <aside
          aria-labelledby="right-now-heading"
          className="overflow-hidden rounded-3xl border-2 border-outline bg-surface-raised shadow-[10px_10px_0_var(--color-lilac)]"
        >
          <div className="stripe h-2" aria-hidden="true" />
          <div className="px-6 py-6 sm:px-7">
            <h2 id="right-now-heading" className="eyebrow text-fg-muted">
              Right now
            </h2>
            <dl className="mt-3">
              {rightNow.map(({ label, detail }) => (
                <div
                  key={label}
                  className="grid gap-1 border-t border-dashed border-line py-3.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="eyebrow text-accent">{label}</dt>
                  <dd className="text-[0.95rem] leading-snug">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </Container>
    </section>
  );
}
