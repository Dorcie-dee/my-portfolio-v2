"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, type NavItem } from "@/lib/nav";

type NavLinksProps = {
  items: NavItem[];
};

/** Desktop links. The current page shows as a filled pill. */
export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "bg-accent text-accent-contrast" : "text-fg hover:bg-lilac"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
