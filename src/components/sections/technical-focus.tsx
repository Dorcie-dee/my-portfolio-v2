import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";

export function TechnicalFocus() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="surface-lilac py-section">
      <Container>
        <SectionHeading id="skills-heading" eyebrow="Technical focus" title="The tools I work with, grouped by where they fit.">
          <p>
            Filled tags are what I use most. Dashed tags are tools I have worked with in less
            depth.
          </p>
        </SectionHeading>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <li
              key={category.title}
              className={`flex flex-col rounded-2xl border-2 border-outline bg-surface-raised p-6 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <h3 className="text-lg">{category.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{category.summary}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category.title}: main tools`}>
                {category.core.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>

              {category.familiar?.length ? (
                <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${category.title}: also used`}>
                  {category.familiar.map((tech) => (
                    <li key={tech}>
                      <Tag tone="subtle">{tech}</Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
