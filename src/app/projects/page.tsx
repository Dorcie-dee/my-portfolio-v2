import { ContactCta } from "@/components/sections/contact-cta";
import { MinorProjects } from "@/components/sections/minor-projects";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectGrid } from "@/components/sections/project-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Projects",
  description: `Projects by ${site.name}: an event ticketing platform, a Progressive Web App for a plumbing business, an agricultural opportunity platform and an e-commerce API.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Software I have built, and what I'm building now.">
        <p>
          Each project has a short case study covering its purpose, what has been built and the
          technologies involved. Where a repository is private, only verified public links are shown.
        </p>
      </PageHeader>

      <section aria-label="Main projects" className="surface-paper py-section">
        <Container>
          <ProjectGrid />
        </Container>
      </section>

      <section aria-labelledby="more-heading" className="surface-lilac py-section">
        <Container>
          <SectionHeading id="more-heading" eyebrow="More on GitHub" title="Earlier projects">
            <p>Smaller projects from earlier in my development work, with public source code.</p>
          </SectionHeading>
          <div className="mt-10">
            <MinorProjects />
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
