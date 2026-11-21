import { Briefcase, GraduationCap } from "lucide-react";
import type { Role } from "@/types/content";
import { Tag } from "@/components/ui/tag";

type RoleCardProps = {
  role: Role;
  /** Heading level for the role title, so it fits the page outline. */
  as?: "h2" | "h3";
};

export function RoleCard({ role, as: Heading = "h3" }: RoleCardProps) {
  const headingId = `role-${role.organisation.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const Icon = role.kind === "Training" ? GraduationCap : Briefcase;
  const hasDetail = Boolean(role.contributions?.length);

  return (
    <article
      aria-labelledby={headingId}
      className={`grid gap-8 rounded-lg border border-line bg-surface-raised p-6 sm:p-8 ${
        hasDetail ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12" : ""
      }`}
    >
      <div>
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-md border border-line text-accent" aria-hidden="true">
            <Icon className="size-5" />
          </span>
          <span className="font-mono text-xs text-fg-muted">{role.kind}</span>
        </div>
        <Heading id={headingId} className="mt-5 text-2xl font-semibold">
          {role.title}
        </Heading>
        <p className="mt-1 text-lg">{role.organisation}</p>
        <p className="mt-2 font-mono text-sm text-fg-muted">
          <time dateTime={role.startDate}>{role.start}</time>
          {role.end ? ` – ${role.end}` : null}
        </p>
        {role.summary ? <p className="mt-6 leading-relaxed text-fg-muted">{role.summary}</p> : null}
      </div>

      {hasDetail ? (
        <div>
          <p className="font-mono text-xs text-fg-muted">What I contribute</p>
          <ul className="mt-4 space-y-3">
            {role.contributions?.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {role.technologies?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Tools used at ${role.organisation}`}>
              {role.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
