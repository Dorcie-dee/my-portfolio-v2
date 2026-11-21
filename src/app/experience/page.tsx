import { ContactCta } from "@/components/sections/contact-cta";
import { PageHeader } from "@/components/sections/page-header";
import { RoleCard } from "@/components/sections/role-card";
import { Container } from "@/components/ui/container";
import { roles } from "@/data/experience";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Experience",
  description: `Professional experience of ${site.name}, Mid-Level Software Engineer at Medpharma Alliance International.`,
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Professional software engineering experience.">
        <p>
          My current role is on a professional engineering team building healthcare-related
          software. Details of internal systems are kept private.
        </p>
      </PageHeader>

      <section aria-label="Roles" className="surface-light py-section">
        <Container>
          <ol className="space-y-6">
            {roles.map((role) => (
              <li key={`${role.organisation}-${role.title}`}>
                <RoleCard role={role} as="h2" />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ContactCta surface="muted" />
    </>
  );
}
