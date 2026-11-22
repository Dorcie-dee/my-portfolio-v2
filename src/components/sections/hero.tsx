import { ArrowRight } from "lucide-react";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { isExternal, platformName, type ProfileContent, type SocialLink, socialHref } from "@/lib/content";

const socialClass =
  "inline-flex size-11 items-center justify-center rounded-xl text-fg transition-colors hover:bg-lilac hover:text-accent";

// The hero introduction allows bold only; bold words keep the emphasised style.
const introComponents: PortableTextComponents = {
  block: { normal: ({ children }) => <p>{children}</p> },
  marks: { strong: ({ children }) => <strong className="font-bold text-fg">{children}</strong> },
};

/** Renders the headline with its highlight phrase wrapped in a marigold mark. */
function Headline({ text, highlight }: { text: string; highlight: string | null }) {
  if (!highlight) return <>{text}</>;
  const [before, after] = text.split(highlight);
  if (after === undefined) return <>{text}</>;

  return (
    <>
      {before}
      <span className="highlight">{highlight}</span>
      {after}
    </>
  );
}

type HeroProps = {
  profile: ProfileContent;
  /** Visible social links; email is shown elsewhere, so it is left out here. */
  socialLinks: SocialLink[];
};

export function Hero({ profile, socialLinks }: HeroProps) {
  const profiles = socialLinks.filter((link) => link.platform !== "email");
  const availability = profile.availability?.isAvailable ? profile.availability.text : null;

  return (
    <section aria-labelledby="hero-heading" className="surface-base">
      <Container className="grid items-center gap-14 pt-12 pb-section sm:pt-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:pt-22">
        <div>
          <p className="eyebrow text-accent">
            {[profile.greeting, [profile.focusDescriptor, profile.title].filter(Boolean).join(" ")]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h1 id="hero-heading" className="mt-5 text-display text-balance text-plum">
            <Headline text={profile.headline ?? ""} highlight={profile.headlineHighlight} />
          </h1>
          {profile.heroIntro?.length ? (
            <div className="mt-6 max-w-prose-narrow space-y-3 text-lg leading-relaxed text-fg-muted">
              <PortableText value={profile.heroIntro} components={introComponents} />
            </div>
          ) : null}

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">
              View projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
            {profiles.length ? (
              <span className="flex items-center gap-1 sm:ml-2">
                {profiles.map((link) => {
                  const href = socialHref(link);
                  if (!href) return null;
                  const external = isExternal(href);
                  return (
                    <a
                      key={link._id}
                      href={href}
                      className={socialClass}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <SocialIcon platform={link.platform} />
                      <span className="sr-only">
                        {platformName(link)} profile{external ? " (opens in a new tab)" : ""}
                      </span>
                    </a>
                  );
                })}
              </span>
            ) : null}
          </div>

          {availability ? (
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-lilac px-4 py-1.5 text-sm font-semibold text-ink">
              <span className="size-2 rounded-full bg-violet" aria-hidden="true" />
              {availability}
            </p>
          ) : null}
        </div>

        {profile.rightNow?.length ? (
          <aside
            aria-labelledby="right-now-heading"
            className="overflow-hidden rounded-3xl border-2 border-outline bg-surface-raised shadow-[10px_10px_0_var(--color-lilac)]"
          >
            <div className="stripe h-2" aria-hidden="true" />
            <div className="px-6 py-6 sm:px-7">
              <h2 id="right-now-heading" className="eyebrow text-fg-muted">
                Right now
              </h2>
              <dl className="mt-3">
                {profile.rightNow.map((item) => (
                  <div
                    key={item._key}
                    className="grid gap-1 border-t border-dashed border-line py-3.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="eyebrow text-accent">{item.label}</dt>
                    <dd className="text-[0.95rem] leading-snug">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        ) : null}
      </Container>
    </section>
  );
}
