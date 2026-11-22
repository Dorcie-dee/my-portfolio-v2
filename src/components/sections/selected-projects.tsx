import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProjectSummary } from "@/lib/content";
import { CompactCards } from "./project-layouts";

export function SelectedProjects({ projects }: { projects: ProjectSummary[] }) {
  if (!projects.some((project) => project.listing !== "earlier")) return null;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="surface-base py-section">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected projects"
          title="Practical software, from live event ticketing to everyday business tools."
        />

        <div className="mt-14">
          <CompactCards projects={projects} idPrefix="home-project" />
        </div>

        <ButtonLink href="/projects" variant="secondary" className="mt-10">
          All projects
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </Container>
    </section>
  );
}
