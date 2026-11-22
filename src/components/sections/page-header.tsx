import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  /** Optional decorative element shown beside the title on large screens. */
  aside?: ReactNode;
};

/** Light introductory band at the top of inner pages. Contains the page's only <h1>. */
export function PageHeader({ eyebrow, title, children, aside }: PageHeaderProps) {
  return (
    <section aria-labelledby="page-heading" className="surface-base border-b border-line">
      <Container
        className={`grid items-center gap-10 py-16 sm:py-20 ${aside ? "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]" : ""}`}
      >
        <div>
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="stripe h-1.5 w-15 shrink-0 rounded-full" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 id="page-heading" className="mt-4 max-w-3xl text-display text-balance text-plum">
            {title}
          </h1>
          {children ? (
            <div className="mt-5 max-w-prose-narrow text-lg leading-relaxed text-fg-muted">{children}</div>
          ) : null}
        </div>
        {aside ? <div className="hidden lg:block">{aside}</div> : null}
      </Container>
    </section>
  );
}
