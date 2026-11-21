import { ContactCta } from "@/components/sections/contact-cta";
import { ExperienceHighlight } from "@/components/sections/experience-highlight";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { TechnicalFocus } from "@/components/sections/technical-focus";

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
