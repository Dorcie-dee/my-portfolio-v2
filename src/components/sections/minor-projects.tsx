import { ArrowUpRight } from "lucide-react";
import { minorProjects } from "@/data/projects";

export function MinorProjects() {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {minorProjects.map((project) => (
        <li key={project.name} className="grid gap-3 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
          <div>
            <h3 className="font-semibold">{project.name}</h3>
            <p className="mt-1 text-sm text-fg-muted">{project.summary}</p>
            <p className="mt-2 font-mono text-xs text-fg-muted">{project.technologies.join(" · ")}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {project.links.map((link) => (
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
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
