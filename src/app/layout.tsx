import type { Metadata } from "next";
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
      {/* Site chrome lives in (site)/layout.tsx so the Studio at /manage stays separate. */}
      <body className="surface-base flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
