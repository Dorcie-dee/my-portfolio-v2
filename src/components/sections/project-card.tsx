import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { projectLinks, projectStatus, type ProjectSummary } from "@/lib/content";
import { projectTone } from "@/lib/project-tone";
import { urlFor } from "@/sanity/lib/image";
import { StatusBadge } from "./status-badge";

type VisualProject = Pick<ProjectSummary, "category" | "panelInitials" | "thumbnail"> & {
  featured?: boolean | null;
};

type ProjectVisualProps = {
  project: VisualProject;
  index: number;
  className?: string;
};

/**
 * The project's thumbnail when one is uploaded in Sanity. Otherwise a colour-blocked
 * decorative panel (numbered label, dot pattern, initials), hidden from assistive technology.
 */
export function ProjectVisual({ project, index, className = "" }: ProjectVisualProps) {
  const thumbnail = project.thumbnail?.asset?.url ? project.thumbnail : null;

  if (thumbnail) {
    const width = 1200;
    const height = 900;
    return (
      <div className={`relative overflow-hidden bg-lilac ${className}`}>
        <Image
          src={urlFor(thumbnail).width(width).height(height).fit("crop").url()}
          alt={thumbnail.alt ?? ""}
          fill
          sizes={project.featured ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover"
          {...(thumbnail.asset?.metadata?.lqip
            ? { placeholder: "blur" as const, blurDataURL: thumbnail.asset.metadata.lqip }
            : {})}
        />
      </div>
    );
  }

  const tone = projectTone(index);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      aria-hidden="true"
      className={`relative flex flex-col justify-between overflow-hidden p-6 ${tone.panel} ${tone.text} ${className}`}
    >
      <span className="eyebrow relative z-10 max-w-[65%]">
        {number} / {project.category}
      </span>
      <span className="dot-pattern absolute top-5 right-5 size-28 opacity-30" />
      <span
        className={`relative z-10 font-display leading-[0.85] font-bold ${
          project.featured ? "text-7xl sm:text-8xl" : "text-6xl"
        }`}
      >
        {project.panelInitials}
      </span>
    </div>
  );
}

type ProjectCardProps = {
  project: ProjectSummary;
  /** Position in the projects list; drives the panel colour and number. */
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;
  const status = projectStatus(project);
  const links = projectLinks(project);
  const stackLabel = project.stackIsPlanned ? "Planned stack" : "Stack";

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
        {status ? <StatusBadge status={status} /> : null}

        <h3
          id={headingId}
          className={`${status ? "mt-4" : ""} text-plum ${project.featured ? "text-3xl" : "text-2xl"}`}
        >
          {project.name}
        </h3>
        <p className="mt-2 leading-relaxed text-fg-muted">{project.summary}</p>

        {project.features?.length ? (
          <ul className="mt-4 space-y-1.5 text-[0.95rem]">
            {project.features.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-violet" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {project.technologies?.length ? (
          <div className="mt-5">
            <p className="eyebrow text-fg-muted">{stackLabel}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${project.name}: ${stackLabel.toLowerCase()}`}>
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Tag tone={project.stackIsPlanned ? "subtle" : "default"}>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-bold text-accent-contrast transition-colors hover:bg-violet-deep"
          >
            Case study
            <ArrowRight className="size-4" aria-hidden="true" />
            <span className="sr-only">: {project.name}</span>
          </Link>
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline"
            >
              {link.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </a>
          ))}
          {links.length === 0 && project.isRepoPrivate ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-fg-muted">
              <Lock className="size-3.5" aria-hidden="true" />
              Private repository
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
