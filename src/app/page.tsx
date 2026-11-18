// TEMPORARY: design-token check page for the foundation phase.
// Replace this file when the homepage is built. It contains no portfolio content.

const surfaces = [
  { className: "surface-light", label: "surface-light" },
  { className: "surface-dark", label: "surface-dark" },
  { className: "surface-muted", label: "surface-muted" },
] as const;

export default function TokenCheckPage() {
  return (
    <main className="flex-1">
      {surfaces.map(({ className, label }) => (
        <section
          key={label}
          aria-labelledby={`${label}-heading`}
          className={`${className} py-section`}
        >
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-sm text-accent">{label}</p>
            <h2 id={`${label}-heading`} className="mt-2 text-display font-semibold">
              Display heading
            </h2>
            <p className="mt-4 text-headline font-medium">Headline text</p>
            <p className="mt-4 max-w-prose-narrow text-lg text-fg-muted">
              Muted body text for checking contrast and line length on this surface.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="rounded-md bg-accent px-5 py-2.5 font-medium text-accent-contrast"
              >
                Accent button
              </button>
              <a href={`#${label}-heading`} className="font-medium text-accent underline underline-offset-4">
                Accent link
              </a>
              <code className="rounded border border-line bg-surface-raised px-2 py-1 font-mono text-sm">
                font-mono
              </code>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
