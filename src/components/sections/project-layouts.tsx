import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { projectLinks, projectStatus, type ProjectSummary } from "@/lib/content";
import { projectTone } from "@/lib/project-tone";
import { ProjectsBackdrop } from "./project-art";
import { InitialsFill, ShotFill } from "./project-shot";
import { ProjectVisual } from "./project-visual";
import { StatusBadge } from "./status-badge";

/*
 * Layouts for the main projects section: compact cards on the homepage, a bento grid on the
 * projects page. Both take every visible project in Studio order and show only the "main"
 * section, so panel colours and numbers match the case-study pages.
 */

export type LayoutProps = {
  projects: ProjectSummary[];
  /** Prefix for heading ids, so they stay unique on the page. */
  idPrefix: string;
};

type Indexed = { project: ProjectSummary; index: number };

export function mainProjects(projects: ProjectSummary[]): Indexed[] {
  return projects.map((project, index) => ({ project, index })).filter(({ project }) => project.listing !== "earlier");
}

export const number = (index: number) => String(index + 1).padStart(2, "0");

/** The first few technologies, then "+N" for the rest (the full list is on the case study). */
export function StackPreview({ project, max = 4 }: { project: ProjectSummary; max?: number }) {
  const technologies = project.technologies ?? [];
  if (!technologies.length) return null;
  const shown = technologies.slice(0, max);
  const hidden = technologies.length - shown.length;
  const label = project.stackIsPlanned ? "Planned stack" : "Stack";
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={`${project.name}: ${label.toLowerCase()}`}>
      {shown.map((tech) => (
        <li key={tech}>
          <Tag tone={project.stackIsPlanned ? "subtle" : "default"}>{tech}</Tag>
        </li>
      ))}
      {hidden > 0 ? (
        <li>
          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-bold text-fg-muted">
            +{hidden} more
          </span>
        </li>
      ) : null}
    </ul>
  );
}

/**
 * Case study link plus public links, or the private-repository note. The "text" variant
 * (used in narrow cards) splits them: case study on the left, secondary links grouped on the right.
 */
export function ProjectActions({
  project,
  variant = "button",
}: {
  project: ProjectSummary;
  variant?: "button" | "text";
}) {
  const links = projectLinks(project);
  const isText = variant === "text";

  const secondary = (
    <>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold whitespace-nowrap text-fg-muted underline-offset-4 hover:text-accent hover:underline"
        >
          {link.label}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          <span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      ))}
      {links.length === 0 && project.isRepoPrivate ? (
        <span className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap text-fg-muted">
          <Lock className="size-3.5" aria-hidden="true" />
          Private repository
        </span>
      ) : null}
    </>
  );

  return (
    <div className={`flex flex-wrap items-center gap-y-2 text-sm ${isText ? "justify-between gap-x-4" : "gap-x-5"}`}>
      <Link
        href={`/projects/${project.slug}`}
        className={
          isText
            ? "inline-flex items-center gap-1.5 font-bold whitespace-nowrap text-accent underline-offset-4 hover:underline"
            : "inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-bold text-accent-contrast transition-colors hover:bg-violet-deep"
        }
      >
        Case study
        <ArrowRight className="size-4" aria-hidden="true" />
        <span className="sr-only">: {project.name}</span>
      </Link>
      {isText ? (
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem]">{secondary}</span>
      ) : (
        secondary
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Bento grid (projects page): a large featured tile, compact tiles around it.               */
/* ------------------------------------------------------------------------------------------ */

function Monogram({ project, index, size = "md" }: { project: ProjectSummary; index: number; size?: "md" | "lg" }) {
  const tone = projectTone(index);
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl border-2 border-outline font-display font-bold ${tone.panel} ${tone.text} ${
        size === "lg" ? "size-24 text-3xl" : "size-14 text-lg"
      }`}
    >
      {project.panelInitials}
    </span>
  );
}

export function BentoGrid({ projects, idPrefix }: LayoutProps) {
  const items = mainProjects(projects);
  if (!items.length) return null;
  const featured = items.find(({ project }) => project.featured) ?? null;
  const others = items.filter((item) => item !== featured);
  // The featured banner spans the full width; the rest fill rows of three. A lone tile left
  // in the last row stretches full width (laid out horizontally on large screens).
  const lastIsWide = others.length % 3 === 1;
  const lastSpansTablet = others.length % 2 === 1;

  return (
    <div className="relative">
      <ProjectsBackdrop />
      <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured ? (
          <article
            aria-labelledby={`${idPrefix}-${featured.project.slug}`}
            className="group surface-plum grid overflow-hidden rounded-3xl border-2 border-plum md:col-span-2 lg:col-span-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            {/* Screenshot: an inset on top on small screens, the right side of the banner on large ones. */}
            <div className="p-3 lg:order-last lg:pl-0">
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-80">
                {featured.project.thumbnail?.asset?.url ? (
                  <ShotFill
                    project={featured.project}
                    sizes="(min-width: 1024px) 40rem, 100vw"
                    className="transition-[scale] duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <InitialsFill project={featured.project} index={featured.index} size="text-8xl" />
                )}
              </div>
            </div>
            <div className="relative flex flex-col justify-center px-6 pt-3 pb-7 sm:px-9 sm:pb-9 lg:py-10">
              <span aria-hidden="true" className="dot-pattern absolute right-5 bottom-5 size-20 text-plum-raised" />
              {projectStatus(featured.project) ? <StatusBadge status={projectStatus(featured.project)!} /> : null}
              <p className="eyebrow mt-5 text-marigold">
                {number(featured.index)} / {featured.project.category}
              </p>
              <h3
                id={`${idPrefix}-${featured.project.slug}`}
                className="mt-2 text-[1.75rem] leading-tight text-fg sm:text-4xl"
              >
                {featured.project.name}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-muted sm:text-lg">
                {featured.project.projectsPageSummary || featured.project.summary}
              </p>
              <div className="mt-5">
                <StackPreview project={featured.project} max={4} />
              </div>
              <div className="mt-6">
                <ProjectActions project={featured.project} />
              </div>
            </div>
          </article>
        ) : null}

        {others.map(({ project, index }, position) => {
          const status = projectStatus(project);
          const headingId = `${idPrefix}-${project.slug}`;
          const isLast = position === others.length - 1;
          const wide = lastIsWide && isLast;
          const hasShot = Boolean(project.thumbnail?.asset?.url);
          const badgeInBody = Boolean(status) && (wide || hasShot);
          return (
            <article
              key={project._id}
              aria-labelledby={headingId}
              className={`group flex flex-col overflow-hidden rounded-3xl border-2 border-outline bg-surface-raised p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-stamp sm:p-6 ${
                wide
                  ? "md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:gap-10"
                  : lastSpansTablet && isLast
                    ? "md:col-span-2 lg:col-span-1"
                    : ""
              }`}
            >
              {hasShot ? (
                // A rounded inset with a slim margin, like a mounted photo.
                <div
                  className={`relative overflow-hidden rounded-2xl ${
                    wide ? "aspect-16/10 lg:aspect-auto lg:h-52 lg:w-96 lg:shrink-0" : "-mx-2 -mt-2 aspect-16/10"
                  }`}
                >
                  <ShotFill
                    project={project}
                    sizes={
                      wide
                        ? "(min-width: 1024px) 24rem, 100vw"
                        : "(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
                    }
                    className="transition-[scale] duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Number sticker in the project's colour. */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-3 left-3 inline-flex size-11 rotate-[-8deg] items-center justify-center rounded-full border-2 border-plum font-display text-sm font-bold shadow-[2px_2px_0_var(--color-plum)] transition-transform duration-300 group-hover:rotate-0 ${projectTone(index).panel} ${projectTone(index).text}`}
                  >
                    {number(index)}
                  </span>
                </div>
              ) : (
                <div
                  className={`flex items-start justify-between gap-4 ${wide ? "lg:flex-col lg:justify-center" : ""}`}
                >
                  <Monogram project={project} index={index} size={wide ? "lg" : "md"} />
                  {status && !wide ? <StatusBadge status={status} /> : null}
                </div>
              )}
              <div className={`flex flex-1 flex-col ${wide ? "mt-5 lg:mt-0" : "mt-5"}`}>
                {badgeInBody && status ? <StatusBadge status={status} /> : null}
                <p className={`eyebrow text-fg-muted ${badgeInBody ? "mt-4" : ""}`}>
                  {hasShot ? project.category : `${number(index)} / ${project.category}`}
                </p>
                <h3 id={headingId} className="mt-1.5 text-xl text-plum sm:text-2xl">
                  {project.name}
                </h3>
                <p className={`mt-2 leading-relaxed text-fg-muted ${wide ? "max-w-2xl" : ""}`}>
                  {project.projectsPageSummary || project.summary}
                </p>
                <div className="mt-5">
                  <StackPreview project={project} max={wide ? 6 : 3} />
                </div>
                <div className={`pt-6 ${wide ? "" : "mt-auto"}`}>
                  <ProjectActions project={project} variant="text" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Compact cards (homepage): slim colour strip, short text, actions pinned to the bottom.     */
/* ------------------------------------------------------------------------------------------ */

export function CompactCards({ projects, idPrefix }: LayoutProps) {
  const items = mainProjects(projects);
  if (!items.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map(({ project, index }) => {
        const status = projectStatus(project);
        const tone = projectTone(index);
        const headingId = `${idPrefix}-${project.slug}`;
        // Homepage rule: only the featured project shows its screenshot; the others always
        // keep the colour strip, even when a thumbnail is attached.
        const featured = Boolean(project.featured);
        return (
          <article
            key={project._id}
            aria-labelledby={headingId}
            className={`flex flex-col overflow-hidden rounded-2xl border-2 border-outline bg-surface-raised shadow-stamp transition-transform duration-200 hover:-translate-y-1 ${
              featured ? "md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" : ""
            }`}
          >
            {featured ? (
              <ProjectVisual
                project={{ ...project, featured: false }}
                index={index}
                fit="centre"
                showLabel={false}
                className="h-56 border-b-2 border-outline sm:h-72 lg:h-full lg:min-h-72 lg:border-r-2 lg:border-b-0"
              />
            ) : (
              <div
                aria-hidden="true"
                className={`flex h-20 items-center justify-between gap-4 border-b-2 border-outline px-6 ${tone.panel} ${tone.text}`}
              >
                <span className="eyebrow truncate">
                  {number(index)} / {project.category}
                </span>
                <span className="font-display text-3xl leading-none font-bold">{project.panelInitials}</span>
              </div>
            )}

            <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:p-8" : ""}`}>
              {status ? <StatusBadge status={status} /> : null}
              <h3 id={headingId} className={`${status ? "mt-4" : ""} text-plum ${featured ? "text-3xl" : "text-xl"}`}>
                {project.name}
              </h3>
              <p className={`mt-2 leading-relaxed text-fg-muted ${featured ? "text-lg" : "line-clamp-3"}`}>
                {project.summary}
              </p>
              <div className="mt-5">
                <StackPreview project={project} max={featured ? 6 : 4} />
              </div>
              <div className="mt-auto pt-6">
                <div className="border-t border-line pt-4">
                  <ProjectActions project={project} variant={featured ? "button" : "text"} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
