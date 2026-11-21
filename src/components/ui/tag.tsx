import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  /** "subtle" for secondary items, e.g. less-used technologies. */
  tone?: "default" | "subtle";
};

export function Tag({ children, tone = "default" }: TagProps) {
  const toneClasses =
    tone === "subtle"
      ? "border-dashed text-fg-muted"
      : "bg-surface-raised text-fg";

  return (
    <span
      className={`inline-flex items-center rounded border border-line px-2 py-0.5 font-mono text-xs ${toneClasses}`}
    >
      {children}
    </span>
  );
}
