import type { ReactNode } from "react";
import { AnnouncementBanner } from "@/components/ui/announcement-banner";
import { BackToTop } from "@/components/ui/back-to-top";
import { getSite } from "@/sanity/lib/data";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Public site chrome: skip link, announcement, header, main landmark, footer and back-to-top.
 * Fetches the shared site content once (cached per request and revalidated).
 */
export async function SiteShell({ children }: { children: ReactNode }) {
  const { settings, profile, socialLinks, cv } = await getSite();
  const name = profile.name ?? settings.siteTitle ?? "";

  return (
    <>
      <a
        href="#main"
        className="surface-plum sr-only z-50 rounded-lg px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AnnouncementBanner announcement={settings.announcement} />
      <SiteHeader name={name} monogram={profile.monogram} cv={cv} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter
        name={name}
        monogram={profile.monogram}
        statement={profile.statement}
        footerText={settings.footerText}
        socialLinks={socialLinks}
        cv={cv}
      />
      <BackToTop />
    </>
  );
}
