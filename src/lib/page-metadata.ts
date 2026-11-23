import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { getSite } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";

type PageKey = "home" | "about" | "projects" | "experience" | "contact";

type PageMetadataInput = {
  /** Default page title; the root layout's template appends the site title. */
  title: string;
  /** Default description when Site settings → Page SEO has no override. */
  description: string;
  /** Route path, e.g. "/about". Used for canonical and Open Graph URLs. */
  path: string;
  /** Which Page SEO override in Site settings applies, if any. */
  page?: PageKey;
};

type Site = Awaited<ReturnType<typeof getSite>>;

/** The share image: Site settings → Default social sharing image, or the generated one. */
export function shareImageFor(site: Site) {
  const image = site.settings.shareImage;
  const alt = image?.alt || [site.profile.name, site.profile.title].filter(Boolean).join(", ");
  if (image?.asset?.url) {
    return { url: urlFor(image).width(1200).height(630).fit("crop").url(), width: 1200, height: 630, alt };
  }
  return { url: "/opengraph-image", width: 1200, height: 630, alt };
}

/**
 * Per-page metadata from Sanity. A child `openGraph` (or `twitter`) object replaces the
 * root one entirely, including the share image, so shared fields are repeated here.
 */
export async function pageMetadata({ title, description, path, page }: PageMetadataInput): Promise<Metadata> {
  const site = await getSite();
  const siteTitle = site.settings.siteTitle ?? site.profile.name ?? "";
  const override = page ? site.settings.pageSeo?.[page] : undefined;
  const pageTitle = override?.title || title;
  const pageDescription = override?.description || description;
  const fullTitle = `${pageTitle} | ${siteTitle}`;
  const image = shareImageFor(site);

  // stegaClean removes invisible preview markers (draft mode only) from metadata text.
  return stegaClean({
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: siteTitle,
      url: path,
      title: fullTitle,
      description: pageDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      images: [image],
    },
  });
}
