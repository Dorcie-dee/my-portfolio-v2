import { Briefcase } from "lucide-react";
import { currentRole } from "@/data/experience";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";

export function ExperienceHighlight() {
  const role = currentRole;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="surface-dark py-section">
      <Container>
        <SectionHeading id="experience-heading" eyebrow="Experience" title="Building healthcare software as part of a professional engineering team." />

        <article
          aria-labelledby="role-heading"
          className="mt-12 grid gap-8 rounded-lg border border-line bg-surface-raised p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12"
        >
          <div>
            <span className="inline-flex size-10 items-center justify-center rounded-md border border-line text-accent" aria-hidden="true">
              <Briefcase className="size-5" />
            </span>
            <h3 id="role-heading" className="mt-5 text-2xl font-semibold">
              {role.title}
            </h3>
            <p className="mt-1 text-lg">{role.organisation}</p>
            <p className="mt-2 font-mono text-sm text-fg-muted">
              <time dateTime={role.startDate}>{role.start}</time> – {role.end}
            </p>
            <p className="mt-6 leading-relaxed text-fg-muted">{role.summary}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs text-fg-muted">What I contribute</h4>
            <ul className="mt-4 space-y-3">
              {role.contributions.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools used in this role">
              {role.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Container>
    </section>
  );
}
