import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "./project-grid";

export function SelectedProjects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="surface-base py-section">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected projects"
          title="Practical software, from live event ticketing to everyday business tools."
        />

        <div className="mt-14">
          <ProjectGrid />
        </div>

        <ButtonLink href="/projects" variant="secondary" className="mt-10">
          All projects
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </Container>
    </section>
  );
}
