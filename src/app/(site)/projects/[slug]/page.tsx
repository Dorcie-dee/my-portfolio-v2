import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectVisual } from "@/components/sections/project-card";
import { StatusBadge } from "@/components/sections/status-badge";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/page-metadata";

// Only the case studies defined in src/data/projects.ts exist; other slugs return 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const inProgress = project.status?.tone === "progress";

  return (
    <>
      <PageHeader
        eyebrow={project.type}
        title={project.name}
        aside={
          <ProjectVisual
            project={project}
            index={index}
            className="aspect-[4/3] rounded-3xl border-2 border-outline shadow-stamp-lg"
          />
        }
      >
        <p>{project.summary}</p>
        {project.status ? (
          <div className="mt-5">
            <StatusBadge status={project.status} />
          </div>
        ) : null}
      </PageHeader>

      <section aria-label={`${project.name} case study`} className="surface-paper py-section">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-prose-narrow">
            <h2 className="text-2xl text-plum">Overview</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-fg-muted">
              {project.context.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl text-plum">{inProgress ? "Current state" : "What was built"}</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-violet" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-label="Project details"
            className="self-start overflow-hidden rounded-3xl border-2 border-outline bg-surface-raised shadow-[8px_8px_0_var(--color-lilac)]"
          >
            <div className="stripe h-2" aria-hidden="true" />
            <div className="p-6">
              <h2 className="eyebrow text-accent">{project.stack.label}</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.technologies.map((tech) => (
                  <li key={tech}>
                    <Tag tone={project.stack.label === "Planned stack" ? "subtle" : "default"}>{tech}</Tag>
                  </li>
                ))}
              </ul>
              {project.stack.label === "Planned stack" ? (
                <p className="mt-3 text-xs text-fg-muted">Planned technologies, not yet confirmed as implemented.</p>
              ) : null}

              <h2 className="eyebrow mt-8 text-accent">Links</h2>
              {project.links.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline"
                      >
                        {link.label}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted">
                  <Lock className="size-3.5" aria-hidden="true" />
                  Private repository. No public link available.
                </p>
              )}
            </div>
          </aside>
        </Container>

        <Container className="mt-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-bold text-accent underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </Link>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
