import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/data/site";
import { nunitoSans, play } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${nunitoSans.variable} ${play.variable} h-full antialiased`}
    >
      <body className="surface-base flex min-h-full flex-col font-sans">
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
      </body>
    </html>
  );
}
