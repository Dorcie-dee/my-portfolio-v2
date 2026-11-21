import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

/** Featured project full width, then the rest in a responsive grid. */
export function ProjectGrid() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <div className="space-y-6">
      {featured.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {others.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <p className="text-xs text-fg-muted">
        Project visuals are illustrative and are not application screenshots.
      </p>
    </div>
  );
}
