import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "./project-card";

export function SelectedProjects() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="surface-light py-section">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected projects"
          title="Practical software, from live event ticketing to everyday business tools."
        />

        <div className="mt-12 space-y-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-fg-muted">
          Project visuals are illustrative and are not application screenshots.
        </p>
      </Container>
    </section>
  );
}
