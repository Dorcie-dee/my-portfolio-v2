"use client";

import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { isActivePath } from "@/lib/nav";
import type { NavItem } from "@/types/content";

type MobileNavProps = {
  items: NavItem[];
  cvHref: string;
};

export function MobileNav({ items, cvHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-xl border-2 border-outline text-fg"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b-2 border-outline bg-surface"
      >
        <nav aria-label="Main">
          <ul className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                      active ? "bg-accent text-accent-contrast" : "text-fg hover:bg-lilac"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-line pt-3">
              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-bold text-accent hover:bg-lilac"
              >
                <FileText className="size-5" aria-hidden="true" />
                View CV
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
