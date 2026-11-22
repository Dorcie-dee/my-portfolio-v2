import Image from "next/image";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHeader } from "@/components/sections/page-header";
import { QuickFacts } from "@/components/sections/quick-facts";
import { TechnicalFocus } from "@/components/sections/technical-focus";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { pageMetadata } from "@/lib/page-metadata";
import { getProfile, getSite, getSkills } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata({
    title: "About",
    description: `About ${site.profile.name}, a full-stack software engineer with backend expertise.`,
    path: "/about",
    page: "about",
  });
}

export default async function AboutPage() {
  const [site, profile, skills] = await Promise.all([getSite(), getProfile(), getSkills()]);
  const linkedin = site.socialLinks.find((link) => link.platform === "linkedin")?.url ?? null;
  const availability = profile.availability?.isAvailable ? profile.availability.text : null;
  const photo = profile.showPhoto && profile.photo?.asset?.url ? profile.photo : null;

  return (
    <>
      <PageHeader eyebrow="About" title={profile.aboutHeading ?? ""}>
        {availability ? <p>{availability}</p> : null}
      </PageHeader>

      <section aria-labelledby="bio-heading" className="surface-paper py-section">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 id="bio-heading" className="text-2xl text-plum">
              Background
            </h2>
            <div className="mt-6 max-w-prose-narrow space-y-4 text-lg leading-relaxed text-fg-muted">
              {profile.biography?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {profile.focusAreas?.length ? (
              <>
                <h2 className="mt-14 text-2xl text-plum">What I focus on</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {profile.focusAreas.map((area) => (
                    <li key={area._key} className="rounded-2xl border-2 border-outline bg-surface-raised p-5">
                      <h3 className="text-lg text-plum">{area.title}</h3>
                      <p className="mt-1 text-sm text-fg-muted">{area.description}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {profile.interests?.length ? (
              <>
                <h2 className="mt-14 text-2xl text-plum">Interests</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <li key={interest}>
                      <Tag>{interest}</Tag>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <div className="flex flex-col gap-8 self-start">
            {photo ? (
              <div className="overflow-hidden rounded-3xl border-2 border-outline shadow-stamp-lg">
                <Image
                  src={urlFor(photo).width(800).height(1000).fit("crop").url()}
                  alt={photo.alt ?? ""}
                  width={800}
                  height={1000}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="h-auto w-full"
                  {...(photo.asset?.metadata?.lqip ? { placeholder: "blur" as const, blurDataURL: photo.asset.metadata.lqip } : {})}
                />
              </div>
            ) : null}
            <QuickFacts facts={profile.quickFacts} />
          </div>
        </Container>
      </section>

      <TechnicalFocus categories={skills} />
      <ContactCta email={site.settings.contactEmail} linkedinUrl={linkedin} />
    </>
  );
}
