import { ArrowUpRight } from "lucide-react";
import { minorProjects } from "@/data/projects";

export function MinorProjects() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {minorProjects.map((project) => (
        <li
          key={project.name}
          className="flex flex-col rounded-2xl border-2 border-outline bg-surface-raised p-6"
        >
          <h3 className="text-lg text-plum">{project.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
          <p className="mt-3 text-xs font-bold text-fg-muted">{project.technologies.join(" · ")}</p>
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-4 text-sm">
            {project.links.map((link) => (
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
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
