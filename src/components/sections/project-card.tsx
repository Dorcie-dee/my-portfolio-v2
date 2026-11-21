import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/content";
import { Tag } from "@/components/ui/tag";
import { projectTone } from "@/lib/project-tone";
import { StatusBadge } from "./status-badge";

type ProjectVisualProps = {
  project: Project;
  index: number;
  className?: string;
};

/**
 * Colour-blocked decorative panel: a numbered label, a dot pattern and the project
 * monogram. Not a screenshot, and hidden from assistive technology.
 */
export function ProjectVisual({ project, index, className = "" }: ProjectVisualProps) {
  const tone = projectTone(index);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      aria-hidden="true"
      className={`relative flex flex-col justify-between overflow-hidden p-6 ${tone.panel} ${tone.text} ${className}`}
    >
      <span className="eyebrow relative z-10 max-w-[65%]">
        {number} / {project.type}
      </span>
      <span className="dot-pattern absolute top-5 right-5 size-28 opacity-30" />
      <span
        className={`relative z-10 font-display leading-[0.85] font-bold ${
          project.featured ? "text-7xl sm:text-8xl" : "text-6xl"
        }`}
      >
        {project.monogram}
      </span>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  /** Position in the projects list; drives the panel colour and number. */
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className={`group flex flex-col overflow-hidden rounded-3xl border-2 border-outline bg-surface-raised transition-[transform,box-shadow] duration-200 hover:-translate-y-1 ${
        project.featured
          ? "shadow-[10px_10px_0_var(--color-violet)] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          : "shadow-stamp-lg"
      }`}
    >
      <ProjectVisual
        project={project}
        index={index}
        className={`border-b-2 border-outline ${
          project.featured ? "min-h-56 lg:min-h-full lg:border-r-2 lg:border-b-0" : "h-44"
        }`}
      />

      <div className={`flex flex-1 flex-col ${project.featured ? "p-6 sm:p-8 lg:p-10" : "p-6"}`}>
        {project.status ? <StatusBadge status={project.status} /> : null}

        <h3
          id={headingId}
          className={`${project.status ? "mt-4" : ""} text-plum ${project.featured ? "text-3xl" : "text-2xl"}`}
        >
          {project.name}
        </h3>
        <p className="mt-2 leading-relaxed text-fg-muted">{project.summary}</p>

        <ul className="mt-4 space-y-1.5 text-[0.95rem]">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-violet" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <p className="eyebrow text-fg-muted">{project.stack.label}</p>
          <ul
            className="mt-2 flex flex-wrap gap-1.5"
            aria-label={`${project.name}: ${project.stack.label.toLowerCase()}`}
          >
            {project.stack.technologies.map((tech) => (
              <li key={tech}>
                <Tag tone={project.stack.label === "Planned stack" ? "subtle" : "default"}>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-bold text-accent-contrast transition-colors hover:bg-violet-deep"
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
                className="inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline"
              >
                {link.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> for {project.name} (opens in a new tab)</span>
              </a>
            ))
          ) : (
            <span className="inline-flex items-center gap-1.5 font-semibold text-fg-muted">
              <Lock className="size-3.5" aria-hidden="true" />
              Private repository
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
