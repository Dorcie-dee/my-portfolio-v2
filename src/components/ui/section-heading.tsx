import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeading({ id, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow flex items-center gap-3 text-accent">
        <span className="stripe h-1.5 w-15 shrink-0 rounded-full" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-headline text-balance">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 max-w-prose-narrow text-lg leading-relaxed text-fg-muted">{children}</div>
      ) : null}
    </div>
  );
}
