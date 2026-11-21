import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="surface-dark flex-1">
      <Container className="py-section">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 id="not-found-heading" className="mt-3 text-headline font-semibold">
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
  );
}
