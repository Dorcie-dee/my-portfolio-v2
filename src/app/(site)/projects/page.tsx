import { ContactCta } from "@/components/sections/contact-cta";
import { MinorProjects } from "@/components/sections/minor-projects";
import { PageHeader } from "@/components/sections/page-header";
import { BentoGrid } from "@/components/sections/project-layouts";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/page-metadata";
import { getProjects, getSite } from "@/sanity/lib/data";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata({
    title: "Projects",
    description: `Projects by ${site.profile.name}.`,
    path: "/projects",
    page: "projects",
  });
}

export default async function ProjectsPage() {
  const [site, projects] = await Promise.all([getSite(), getProjects()]);
  const linkedin = site.socialLinks.find((link) => link.platform === "linkedin")?.url ?? null;
  const earlier = projects.filter((project) => project.listing === "earlier");
  const hasMain = projects.some((project) => project.listing !== "earlier");

  return (
    <>
      <PageHeader eyebrow="Projects" title="Software I have built, and what I'm building now.">
        <p>
          Each project has a short case study covering its purpose, what has been built and the
          technologies involved. Where a repository is private, only verified public links are shown.
        </p>
      </PageHeader>

      {hasMain ? (
        <section aria-label="Main projects" className="surface-paper py-section">
          <Container>
            <BentoGrid projects={projects} idPrefix="project" />
          </Container>
        </section>
      ) : null}

      {earlier.length ? (
        <section aria-labelledby="more-heading" className="surface-lilac py-section">
          <Container>
            <SectionHeading id="more-heading" eyebrow="More on GitHub" title="Earlier projects">
              <p>Smaller projects from earlier in my development work, with public source code.</p>
            </SectionHeading>
            <div className="mt-10">
              <MinorProjects projects={earlier} />
            </div>
          </Container>
        </section>
      ) : null}

      <ContactCta email={site.settings.contactEmail} linkedinUrl={linkedin} />
    </>
  );
}
