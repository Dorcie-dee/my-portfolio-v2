import { quickFacts } from "@/data/about";

export function QuickFacts() {
  return (
    <dl className="self-start divide-y divide-line rounded-lg border border-line bg-surface-raised">
      {quickFacts.map(({ term, detail }) => (
        <div key={term} className="px-5 py-4">
          <dt className="font-mono text-xs text-fg-muted">{term}</dt>
          <dd className="mt-1 font-medium">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
