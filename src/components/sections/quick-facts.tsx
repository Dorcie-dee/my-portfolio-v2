import type { ProfileContent } from "@/lib/content";

type QuickFactsProps = {
  facts: ProfileContent["quickFacts"];
};

export function QuickFacts({ facts }: QuickFactsProps) {
  if (!facts?.length) return null;

  return (
    <dl className="self-start overflow-hidden rounded-2xl border-2 border-outline bg-surface-raised shadow-[8px_8px_0_var(--color-lilac)]">
      {facts.map((fact, index) => (
        <div key={fact._key} className={`px-6 py-4 ${index > 0 ? "border-t border-dashed border-line" : ""}`}>
          <dt className="eyebrow text-accent">{fact.label}</dt>
          <dd className="mt-1 font-semibold">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
