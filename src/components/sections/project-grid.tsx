import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

/** Featured project full width, then the rest in a responsive grid. */
export function ProjectGrid() {
  const indexed = projects.map((project, index) => ({ project, index }));
  const featured = indexed.filter(({ project }) => project.featured);
  const others = indexed.filter(({ project }) => !project.featured);

  return (
    <div className="space-y-10">
      {featured.map(({ project, index }) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {others.map(({ project, index }) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <p className="text-xs text-fg-muted">
        Project panels are illustrative graphics, not application screenshots.
      </p>
    </div>
  );
}
