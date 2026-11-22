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
 * The project's colour panel (numbered label, initials). When a thumbnail is uploaded in
 * Sanity, the screenshot is framed inside the panel at its true proportions, never cropped
 * to fit: a phone frame for portrait (mobile) screenshots, a browser window for landscape
 * ones. Without a thumbnail, the panel is purely decorative and hidden from assistive technology.
 */
export function ProjectVisual({ project, index, className = "" }: ProjectVisualProps) {
  const thumbnail = project.thumbnail?.asset?.url ? project.thumbnail : null;
  const tone = projectTone(index);
  const number = String(index + 1).padStart(2, "0");

  if (thumbnail) {
    const dimensions = thumbnail.asset?.metadata?.dimensions;
    const ratio = dimensions?.width && dimensions.height ? dimensions.height / dimensions.width : 0.75;
    const isPortrait = ratio > 1;
    const width = isPortrait ? 640 : 1400;
    const blur = thumbnail.asset?.metadata?.lqip
      ? { placeholder: "blur" as const, blurDataURL: thumbnail.asset.metadata.lqip }
      : {};

    return (
      <div className={`relative overflow-hidden ${tone.panel} ${tone.text} ${className}`}>
        <span aria-hidden="true" className={`eyebrow absolute top-6 left-6 z-10 ${isPortrait ? "max-w-[44%]" : "max-w-[70%]"}`}>
          {number} / {project.category}
        </span>

        {isPortrait ? (
          <>
            <span
              aria-hidden="true"
              className={`absolute bottom-6 left-6 z-10 font-display leading-[0.85] font-bold ${
                project.featured ? "text-7xl sm:text-8xl" : "text-5xl"
              }`}
            >
              {project.panelInitials}
            </span>
            {/* Phone frame rising from the bottom edge (the panel clips the lower part). On the
                tall featured panel at desktop width the whole phone fits, so it is shown complete. */}
            <div
              className={`absolute top-6 right-6 w-[38%] max-w-56 overflow-hidden rounded-t-[1.75rem] border-[5px] border-b-0 border-plum bg-plum shadow-[0_10px_30px_rgb(46_26_71/0.35)] ${
                project.featured ? "lg:top-1/2 lg:-translate-y-1/2 lg:rounded-b-[1.75rem] lg:border-b-[5px]" : ""
              }`}
            >
              <Image
                src={urlFor(thumbnail).width(width).url()}
                alt={thumbnail.alt ?? ""}
                width={width}
                height={Math.round(width * ratio)}
                sizes="(min-width: 1024px) 224px, 40vw"
                className={`h-auto w-full rounded-t-[1.4rem] ${project.featured ? "lg:rounded-b-[1.4rem]" : ""}`}
                {...blur}
              />
            </div>
          </>
        ) : (
          /* Browser window rising from the bottom edge; the panel clips the lower part. */
          <div className="absolute inset-x-6 top-16 overflow-hidden rounded-t-xl border-2 border-b-0 border-plum bg-white shadow-[0_10px_30px_rgb(46_26_71/0.35)]">
            <div aria-hidden="true" className="flex gap-1.5 border-b-2 border-plum bg-ivory px-3 py-2">
              <span className="size-2 rounded-full bg-plum/30" />
              <span className="size-2 rounded-full bg-plum/30" />
              <span className="size-2 rounded-full bg-plum/30" />
            </div>
            <Image
              src={urlFor(thumbnail).width(width).url()}
              alt={thumbnail.alt ?? ""}
              width={width}
              height={Math.round(width * ratio)}
              sizes={project.featured ? "(min-width: 1024px) 40vw, 90vw" : "(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"}
              className="h-auto w-full"
              {...blur}
            />
          </div>
        )}
      </div>
    );
  }

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
