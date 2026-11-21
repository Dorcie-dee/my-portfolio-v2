import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

// Rendered for unknown URLs and notFound() calls; it sits outside (site), so it adds the site chrome itself.
export default function NotFound() {
  return (
    <SiteShell>
    <section aria-labelledby="not-found-heading" className="surface-base flex-1">
      <Container className="py-section">
        <p className="eyebrow text-accent">Error 404</p>
        <h1 id="not-found-heading" className="mt-4 text-display text-plum">
          Page not found
        </h1>
        <p className="mt-4 max-w-prose-narrow text-lg text-fg-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">
            Back to home
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
        </div>
      </Container>
    </section>
    </SiteShell>
  );
}
