import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  /** "subtle" for secondary items, e.g. less-used or planned technologies. */
  tone?: "default" | "subtle";
};

export function Tag({ children, tone = "default" }: TagProps) {
  const toneClasses =
    tone === "subtle"
      ? "border border-dashed border-line text-fg-muted"
      : "bg-lilac text-ink";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${toneClasses}`}>
      {children}
    </span>
  );
}
