import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectVisual } from "@/components/sections/project-visual";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { StatusBadge } from "@/components/sections/status-badge";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { projectLinks, projectStatus } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";
import { getProject, getProjectSlugs, getSite } from "@/sanity/lib/data";

// Pages for case studies published after the last build are rendered on first visit,
// then cached and revalidated like every other page. Hidden or unpublished projects return 404.
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.name ?? "Project",
    description: project.summary ?? "",
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const [project, site] = await Promise.all([getProject(slug), getSite()]);
  if (!project) notFound();

  const status = projectStatus(project);
  const inProgress = status?.tone === "progress";
  const links = projectLinks(project);
  const stackLabel = project.stackIsPlanned ? "Planned stack" : "Stack";
  const linkedin = site.socialLinks.find((link) => link.platform === "linkedin")?.url ?? null;

  return (
    <>
      <PageHeader
        eyebrow={project.category ?? ""}
        title={project.name ?? ""}
        aside={
          <ProjectVisual
            project={project}
            index={project.index}
            className="aspect-4/3 rounded-3xl border-2 border-outline shadow-stamp-lg"
          />
        }
      >
        <p>{project.summary}</p>
        {status ? (
          <div className="mt-5">
            <StatusBadge status={status} />
          </div>
        ) : null}
      </PageHeader>

      <section aria-label={`${project.name} case study`} className="surface-paper py-section">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-prose-narrow">
            {project.overview?.length ? (
              <>
                <h2 className="text-2xl text-plum">Overview</h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-fg-muted">
                  {project.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </>
            ) : null}

            {project.purpose ? (
              <>
                <h2 className="mt-12 text-2xl text-plum">Problem or purpose</h2>
                <p className="mt-4 text-lg leading-relaxed text-fg-muted">{project.purpose}</p>
              </>
            ) : null}

            {project.role ? (
              <>
                <h2 className="mt-12 text-2xl text-plum">My role</h2>
                <p className="mt-4 text-lg leading-relaxed text-fg-muted">{project.role}</p>
              </>
            ) : null}

            {project.features?.length ? (
              <>
                <h2 className="mt-12 text-2xl text-plum">{inProgress ? "Current state" : "What was built"}</h2>
                <ul className="mt-4 space-y-3">
                  {project.features.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed">
                      <span className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-violet" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {project.sections?.map((section) =>
              section.heading ? (
                <section key={section._key} aria-labelledby={`section-${section._key}`}>
                  <h2 id={`section-${section._key}`} className="mt-12 text-2xl text-plum">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.length ? (
                    <div className="mt-4 space-y-4 text-lg leading-relaxed text-fg-muted">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {section.points?.length ? (
                    <ul className="mt-4 space-y-3">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-3 leading-relaxed">
                          <span className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-violet" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ) : null,
            )}
          </div>

          <aside
            aria-label="Project details"
            className="self-start overflow-hidden rounded-3xl border-2 border-outline bg-surface-raised shadow-[8px_8px_0_var(--color-lilac)]"
          >
            <div className="stripe h-2" aria-hidden="true" />
            <div className="p-6">
              {project.technologies?.length ? (
                <>
                  <h2 className="eyebrow text-accent">{stackLabel}</h2>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <li key={tech}>
                        <Tag tone={project.stackIsPlanned ? "subtle" : "default"}>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                  {project.stackIsPlanned ? (
                    <p className="mt-3 text-xs text-fg-muted">Planned technologies, not yet confirmed as implemented.</p>
                  ) : null}
                </>
              ) : null}

              <h2 className="eyebrow mt-8 text-accent">Links</h2>
              {links.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {links.map((link) => (
                    <li key={link.key}>
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
              ) : project.isRepoPrivate ? (
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted">
                  <Lock className="size-3.5" aria-hidden="true" />
                  Private repository. No public link available.
                </p>
              ) : (
                <p className="mt-3 text-sm text-fg-muted">No public links yet.</p>
              )}
            </div>
          </aside>
        </Container>

        <Container>
          <ProjectGallery projectName={project.name ?? "the project"} images={project.gallery} />
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

      <ContactCta email={site.settings.contactEmail} linkedinUrl={linkedin} />
    </>
  );
}
