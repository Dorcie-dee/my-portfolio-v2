"use client";

import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/types/content";

type MobileNavProps = {
  items: NavItem[];
  cvHref: string;
};

export function MobileNav({ items, cvHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

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
        className="inline-flex size-11 items-center justify-center rounded-md text-fg hover:bg-surface-raised"
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-lg"
      >
        <nav aria-label="Main">
          <ul className="flex flex-col px-4 py-4 sm:px-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-md px-3 py-3 text-base font-medium text-fg hover:bg-surface-raised"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-4">
              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-accent hover:bg-surface-raised"
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
