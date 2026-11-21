import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { ExperienceHighlight } from "@/components/sections/experience-highlight";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { TechnicalFocus } from "@/components/sections/technical-focus";
import { site } from "@/data/site";

// Title and description come from the root layout; a child openGraph object replaces
// the root one entirely, so its fields are repeated here with the page URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    url: "/",
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <TechnicalFocus />
      <SelectedProjects />
      <ExperienceHighlight />
      <ContactCta />
    </>
  );
}
