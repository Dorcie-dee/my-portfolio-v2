"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Distance scrolled (px) before the button appears. */
const SHOW_AFTER = 600;

/**
 * Floating "Back to top" button. Only rendered once the page has been scrolled,
 * so it is out of the tab order at the top of the page. Respects reduced motion.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

    // The button unmounts at the top, so move focus to the start of the page.
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed right-4 bottom-4 z-40 inline-flex size-12 items-center justify-center rounded-xl border-2 border-plum bg-violet text-white shadow-stamp transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-plum)] active:translate-x-1 active:translate-y-1 active:shadow-none sm:right-6 sm:bottom-6"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
