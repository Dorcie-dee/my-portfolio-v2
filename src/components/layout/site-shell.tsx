import type { ReactNode } from "react";
import { BackToTop } from "@/components/ui/back-to-top";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/** Public site chrome: skip link, header, main landmark, footer and back-to-top. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="surface-plum sr-only z-50 rounded-lg px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
