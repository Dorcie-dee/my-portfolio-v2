import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { nunitoSans, play } from "@/lib/fonts";
import { shareImageFor } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/site-url";
import { getSite } from "@/sanity/lib/data";
import "./globals.css";

/** Site-wide defaults from Sanity (Site settings and Profile). Pages can override them. */
export async function generateMetadata(): Promise<Metadata> {
  // stegaClean removes invisible preview markers (draft mode only) from metadata text.
  const site = stegaClean(await getSite());
  const siteTitle = site.settings.siteTitle ?? site.profile.name ?? "";
  const title = [siteTitle, site.profile.title].filter(Boolean).join(" | ");
  const description = site.settings.seoDescription ?? undefined;
  const github = site.socialLinks.find((link) => link.platform === "github")?.url ?? undefined;
  // Use the uploaded share image when there is one; otherwise the generated opengraph-image applies.
  const customImage = site.settings.shareImage?.asset?.url ? [shareImageFor(site)] : undefined;

  return {
    metadataBase: getSiteUrl(),
    title: { default: title, template: `%s | ${siteTitle}` },
    description,
    authors: [{ name: site.profile.name ?? siteTitle, url: github }],
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: siteTitle,
      title,
      description,
      ...(customImage ? { images: customImage } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(customImage ? { images: customImage } : {}),
    },
  };
}

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
