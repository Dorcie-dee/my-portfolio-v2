import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeading({ id, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="max-w-prose-narrow">
      <p className="font-mono text-sm text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-headline font-semibold text-balance">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-lg leading-relaxed text-fg-muted">{children}</div>
      ) : null}
    </div>
  );
}
