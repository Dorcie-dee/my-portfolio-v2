import { bio, focusAreas, interests } from "@/data/about";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHeader } from "@/components/sections/page-header";
import { QuickFacts } from "@/components/sections/quick-facts";
import { TechnicalFocus } from "@/components/sections/technical-focus";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}, a backend-focused software engineer working with Node.js, TypeScript, NestJS, PostgreSQL and MongoDB.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="A backend-focused engineer who builds practical, dependable software.">
        <p>{site.availability}</p>
      </PageHeader>

      <section aria-labelledby="bio-heading" className="surface-paper py-section">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 id="bio-heading" className="text-2xl text-plum">
              Background
            </h2>
            <div className="mt-6 max-w-prose-narrow space-y-4 text-lg leading-relaxed text-fg-muted">
              {bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-14 text-2xl text-plum">What I focus on</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <li key={area.title} className="rounded-2xl border-2 border-outline bg-surface-raised p-5">
                  <h3 className="text-lg text-plum">{area.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{area.description}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-2xl text-plum">Interests</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <li key={interest}>
                  <Tag>{interest}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <QuickFacts />
        </Container>
      </section>

      <TechnicalFocus />
      <ContactCta />
    </>
  );
}
