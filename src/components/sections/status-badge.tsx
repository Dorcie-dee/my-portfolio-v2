import type { Project } from "@/types/content";

type StatusBadgeProps = {
  status: NonNullable<Project["status"]>;
};

const styles = {
  live: { badge: "bg-lilac text-ink", dot: "bg-violet" },
  progress: { badge: "bg-butter text-ink", dot: "bg-marigold ring-2 ring-plum/20" },
  neutral: { badge: "bg-lilac text-ink", dot: "bg-muted" },
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = styles[status.tone];

  return (
    <p className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}>
      <span className={`size-2 rounded-full ${style.dot}`} aria-hidden="true" />
      {status.label}
    </p>
  );
}
