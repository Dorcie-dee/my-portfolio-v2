import { Briefcase, GraduationCap } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import { employmentLabel, type ExperienceEntry, rolePeriod } from "@/lib/content";

type RoleCardProps = {
  role: ExperienceEntry;
  /** Heading level for the role title, so it fits the page outline. */
  as?: "h2" | "h3";
};

export function RoleCard({ role, as: Heading = "h3" }: RoleCardProps) {
  const organisation = role.organisation ?? "";
  const headingId = `role-${organisation.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const isTraining = role.employmentType === "training";
  const Icon = isTraining ? GraduationCap : Briefcase;
  // Shown as before: "Employment" for jobs, "Training" for training.
  const kind = isTraining ? "Training" : "Employment";
  const type = isTraining ? null : employmentLabel(role.employmentType);
  const period = rolePeriod(role);
  const hasDetail = Boolean(role.contributions?.length);

  return (
    <article
      aria-labelledby={headingId}
      className={`grid gap-8 rounded-3xl border-2 border-outline bg-surface-raised p-6 sm:p-8 ${
        hasDetail
          ? "shadow-[10px_10px_0_var(--color-marigold)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12"
          : "shadow-stamp-lg"
      }`}
    >
      <div>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex size-11 items-center justify-center rounded-xl bg-lilac text-violet"
            aria-hidden="true"
          >
            <Icon className="size-5" />
          </span>
          <span className="eyebrow text-fg-muted">{type ? `${kind} · ${type}` : kind}</span>
        </div>
        <Heading id={headingId} className="mt-5 text-2xl text-plum">
          {role.title}
        </Heading>
        <p className="mt-1 text-lg font-semibold">{organisation}</p>
        {role.location ? <p className="mt-1 text-sm text-fg-muted">{role.location}</p> : null}
        {period.start ? (
          <p className="mt-3 inline-flex rounded-full bg-butter px-3 py-1 text-sm font-bold text-ink">
            <time dateTime={role.startDate ?? undefined}>{period.start}</time>
            {period.end ? <>&nbsp;– {period.end}</> : null}
          </p>
        ) : null}
        {role.summary ? <p className="mt-6 leading-relaxed text-fg-muted">{role.summary}</p> : null}
      </div>

      {hasDetail ? (
        <div>
          <p className="eyebrow text-accent">What I contribute</p>
          <ul className="mt-4 space-y-3">
            {role.contributions?.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-violet" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {role.technologies?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Tools used at ${organisation}`}>
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
