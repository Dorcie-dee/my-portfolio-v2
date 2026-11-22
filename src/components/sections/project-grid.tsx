import type { ProjectSummary } from "@/lib/content";
import { ProjectCard } from "./project-card";

type ProjectGridProps = {
  /** Every visible project in Studio order; only the "main" section is shown here. */
  projects: ProjectSummary[];
};

/** Featured project full width, then the rest in a responsive grid. */
export function ProjectGrid({ projects }: ProjectGridProps) {
  // Index across all visible projects keeps panel colours consistent with the case-study pages.
  const indexed = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => project.listing !== "earlier");
  const featured = indexed.filter(({ project }) => project.featured);
  const others = indexed.filter(({ project }) => !project.featured);
  const usesPanels = indexed.some(({ project }) => !project.thumbnail?.asset);

  if (!indexed.length) return null;

  return (
    <div className="space-y-10">
      {featured.map(({ project, index }) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}

      {others.length ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {others.map(({ project, index }) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      ) : null}

      {usesPanels ? (
        <p className="text-xs text-fg-muted">Projects without screenshots are shown with illustrative colour panels.</p>
      ) : null}
    </div>
  );
}
