import { ContactCta } from "@/components/sections/contact-cta";
import { PageHeader } from "@/components/sections/page-header";
import { RoleCard } from "@/components/sections/role-card";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/page-metadata";
import { getExperience, getSite } from "@/sanity/lib/data";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata({
    title: "Experience",
    description: `Professional experience of ${site.profile.name}.`,
    path: "/experience",
    page: "experience",
  });
}

export default async function ExperiencePage() {
  const [site, roles] = await Promise.all([getSite(), getExperience()]);
  const linkedin = site.socialLinks.find((link) => link.platform === "linkedin")?.url ?? null;

  return (
    <>
      <PageHeader eyebrow="Experience" title="Professional software engineering experience.">
        <p>
          My current role is on a professional engineering team building healthcare-related
          software. Details of internal systems are kept private.
        </p>
      </PageHeader>

      {roles.length ? (
        <section aria-label="Roles" className="surface-paper py-section">
          <Container>
            <ol className="space-y-6">
              {roles.map((role) => (
                <li key={role._id}>
                  <RoleCard role={role} as="h2" />
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      <ContactCta email={site.settings.contactEmail} linkedinUrl={linkedin} />
    </>
  );
}
