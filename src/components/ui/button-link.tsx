import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Opens in a new tab and announces it to screen readers. */
  external?: boolean;
  className?: string;
};

// Primary buttons sit on a solid offset shadow and press into it when clicked.
const base =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-outline px-5 py-3 text-sm font-bold transition-[transform,box-shadow,background-color] duration-150";

const variants = {
  primary:
    "bg-accent text-accent-contrast shadow-stamp hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-plum)] active:translate-x-1 active:translate-y-1 active:shadow-none",
  secondary: "bg-transparent text-fg hover:bg-surface-raised",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  // mailto: and other non-route links are plain anchors.
  if (!href.startsWith("/")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
