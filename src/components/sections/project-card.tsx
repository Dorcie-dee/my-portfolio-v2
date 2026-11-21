import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import type { Project, ProjectStatusTone } from "@/types/content";
import { Tag } from "@/components/ui/tag";

const statusDot: Record<ProjectStatusTone, string> = {
  live: "bg-accent",
  progress: "bg-amber-500",
  neutral: "bg-fg-muted",
};

type ProjectCardProps = {
  project: Project;
};

/** Abstract visual, not a screenshot. Hidden from assistive technology. */
function ProjectVisual({ project }: ProjectCardProps) {
  return (
    <div
      aria-hidden="true"
      className={`surface-dark relative flex overflow-hidden rounded-md border border-line ${
        project.featured ? "min-h-48 lg:min-h-full" : "h-36"
      }`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--surface-line) 1px, transparent 1px), linear-gradient(90deg, var(--surface-line) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-5">
        <span
          className={`font-mono font-semibold tracking-tight text-accent ${
            project.featured ? "text-5xl lg:text-6xl" : "text-4xl"
          }`}
        >
          {project.monogram}
        </span>
        {project.featured ? (
          <span className="text-right font-mono text-xs text-fg-muted">{project.type}</span>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className={`flex flex-col gap-6 rounded-lg border border-line bg-surface-raised p-4 sm:p-5 ${
        project.featured ? "lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8" : ""
      }`}
    >
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col px-1 pb-1 lg:py-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-fg-muted">
          <span className="font-mono">{project.type}</span>
          {project.status ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-fg">
              <span className={`size-1.5 rounded-full ${statusDot[project.status.tone]}`} aria-hidden="true" />
              {project.status.label}
            </span>
          ) : null}
        </div>

        <h3 id={headingId} className={`mt-3 font-semibold ${project.featured ? "text-2xl" : "text-xl"}`}>
          {project.name}
        </h3>
        <p className="mt-2 leading-relaxed text-fg-muted">{project.summary}</p>

        <ul className="mt-4 space-y-1.5 text-sm">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <p className="font-mono text-xs text-fg-muted">{project.stack.label}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${project.name}: ${project.stack.label.toLowerCase()}`}>
            {project.stack.technologies.map((tech) => (
              <li key={tech}>
                <Tag tone={project.stack.label === "Planned stack" ? "subtle" : "default"}>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-medium text-fg underline-offset-4 hover:underline"
          >
            Case study
            <ArrowRight className="size-4" aria-hidden="true" />
            <span className="sr-only">: {project.name}</span>
          </Link>
          {project.links.length > 0 ? (
            project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline"
              >
                {link.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> for {project.name} (opens in a new tab)</span>
              </a>
            ))
          ) : (
            <span className="inline-flex items-center gap-1.5 text-fg-muted">
              <Lock className="size-3.5" aria-hidden="true" />
              Private repository
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
