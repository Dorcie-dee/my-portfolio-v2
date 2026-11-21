import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

/** Dark introductory band at the top of inner pages. Contains the page's only <h1>. */
export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <section aria-labelledby="page-heading" className="surface-dark">
      <Container className="py-16 sm:py-20">
        <p className="font-mono text-sm text-accent">{eyebrow}</p>
        <h1 id="page-heading" className="mt-3 max-w-3xl text-headline font-semibold text-balance">
          {title}
        </h1>
        {children ? (
          <div className="mt-5 max-w-prose-narrow text-lg leading-relaxed text-fg-muted">{children}</div>
        ) : null}
      </Container>
    </section>
  );
}
