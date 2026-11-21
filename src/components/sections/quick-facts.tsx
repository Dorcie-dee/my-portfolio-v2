import { quickFacts } from "@/data/about";

export function QuickFacts() {
  return (
    <dl className="self-start overflow-hidden rounded-2xl border-2 border-outline bg-surface-raised shadow-[8px_8px_0_var(--color-lilac)]">
      {quickFacts.map(({ term, detail }, index) => (
        <div key={term} className={`px-6 py-4 ${index > 0 ? "border-t border-dashed border-line" : ""}`}>
          <dt className="eyebrow text-accent">{term}</dt>
          <dd className="mt-1 font-semibold">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
