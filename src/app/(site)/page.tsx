import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { ContactCta } from "@/components/sections/contact-cta";
import { ExperienceHighlight } from "@/components/sections/experience-highlight";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { TechnicalFocus } from "@/components/sections/technical-focus";
import { shareImageFor } from "@/lib/page-metadata";
import { getProfile, getProjects, getSite, getSkills } from "@/sanity/lib/data";

// Defaults come from the root layout; Site settings → Page SEO → Homepage can override them.
// A child openGraph object replaces the root one entirely, so its fields are repeated here.
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const siteTitle = site.settings.siteTitle ?? site.profile.name ?? "";
  const override = site.settings.pageSeo?.home;
  const title = override?.title || [siteTitle, site.profile.title].filter(Boolean).join(" | ");
  const description = override?.description || site.settings.seoDescription || undefined;
  const customImage = site.settings.shareImage?.asset?.url ? [shareImageFor(site)] : undefined;

  // stegaClean removes invisible preview markers (draft mode only) from metadata text.
  return stegaClean({
    ...(override?.title ? { title: { absolute: override.title } } : {}),
    ...(override?.description ? { description } : {}),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: siteTitle,
      url: "/",
      title,
      description,
      ...(customImage ? { images: customImage } : {}),
    },
  });
}

export default async function HomePage() {
  const [site, profile, projects, skills] = await Promise.all([getSite(), getProfile(), getProjects(), getSkills()]);
  const linkedin = site.socialLinks.find((link) => link.platform === "linkedin")?.url ?? null;

  return (
    <>
      <Hero profile={profile} socialLinks={site.socialLinks} />
      <Intro profile={profile} />
      <TechnicalFocus categories={skills} />
      <SelectedProjects projects={projects} />
      <ExperienceHighlight role={profile.currentRole} />
      <ContactCta email={site.settings.contactEmail} linkedinUrl={linkedin} />
    </>
  );
}
