import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

const socialClass =
  "inline-flex size-11 items-center justify-center rounded-md border border-line text-fg-muted transition-colors hover:border-accent hover:text-accent";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="surface-dark">
      <Container className="grid items-center gap-12 py-section lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-fg-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {site.availability}
          </p>

          <p className="mt-8 font-mono text-sm text-accent">
            {site.name} · {site.role}
          </p>
          <h1 id="hero-heading" className="mt-4 text-display font-semibold text-balance">
            {site.headline}
          </h1>
          <p className="mt-6 max-w-prose-narrow text-lg leading-relaxed text-fg-muted">
            I design and build the server side of web applications: APIs, data models,
            authentication and the automated tests that keep them dependable. When a product
            needs it, I work across the frontend with Next.js and React too.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#projects">
              View projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              <Mail className="size-4" aria-hidden="true" />
              Get in touch
            </ButtonLink>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={socialClass}>
              <GitHubIcon />
              <span className="sr-only">GitHub profile (opens in a new tab)</span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={socialClass}>
              <LinkedInIcon />
              <span className="sr-only">LinkedIn profile (opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Decorative summary in the shape of an API response; the same facts appear as text on the page. */}
        <div
          aria-hidden="true"
          className="hidden rounded-lg border border-line bg-surface-raised font-mono text-sm lg:block"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-3 text-xs text-fg-muted">
            <span>
              <span className="text-accent">GET</span> /api/engineer
            </span>
            <span>200 OK</span>
          </div>
          <pre className="overflow-x-auto px-5 py-5 leading-relaxed text-fg-muted">
{`{
  "role": `}<span className="text-fg">{`"Backend-focused engineer"`}</span>{`,
  "focus": [
    `}<span className="text-fg">{`"REST APIs"`}</span>{`,
    `}<span className="text-fg">{`"Data modelling"`}</span>{`,
    `}<span className="text-fg">{`"Automated testing"`}</span>{`
  ],
  "stack": [
    `}<span className="text-fg">{`"Node.js"`}</span>{`, `}<span className="text-fg">{`"TypeScript"`}</span>{`,
    `}<span className="text-fg">{`"NestJS"`}</span>{`, `}<span className="text-fg">{`"PostgreSQL"`}</span>{`
  ],
  "available": `}<span className="text-accent">true</span>{`
}`}
          </pre>
        </div>
      </Container>
    </section>
  );
}
