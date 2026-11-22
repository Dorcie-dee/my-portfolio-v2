import { ArrowUpRight } from "lucide-react";
import { projectLinks, type ProjectSummary } from "@/lib/content";

/** Compact list for projects in the "More on GitHub" section. */
export function MinorProjects({ projects }: { projects: ProjectSummary[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => {
        // Live site first, then source code, matching the original order.
        const links = projectLinks(project).map((link) =>
          link.key === "live" ? { ...link, label: "Live site" } : link,
        );
        return (
          <li key={project._id} className="flex flex-col rounded-2xl border-2 border-outline bg-surface-raised p-6">
            <h3 className="text-lg text-plum">{project.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
            {project.technologies?.length ? (
              <p className="mt-3 text-xs font-bold text-fg-muted">{project.technologies.join(" · ")}</p>
            ) : null}
            {links.length ? (
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-4 text-sm">
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
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
