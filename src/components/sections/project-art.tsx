/*
 * Small decorative pieces for the projects page. All are aria-hidden and pointer-events-none.
 */

/** Four-point sparkle. */
function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0c.9 6.4 4.6 10.6 12 12-7.4 1.4-11.1 5.6-12 12-.9-6.4-4.6-10.6-12-12C7.4 10.6 11.1 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

/** Background shapes behind the projects grid (large screens only). */
export function ProjectsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <Sparkle className="absolute -top-3 right-[27%] size-4 text-violet" />
      <svg viewBox="0 0 160 40" className="absolute -right-10 -bottom-10 w-44 text-violet" fill="none">
        <path
          d="M2 20c10-16 20-16 30 0s20 16 30 0 20-16 30 0 20 16 30 0 20-16 30 0"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
