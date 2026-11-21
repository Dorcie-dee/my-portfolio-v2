import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { LinkedInIcon } from "@/components/ui/brand-icons";

export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="surface-light py-section">
      <Container>
        <div className="max-w-prose-narrow">
          <p className="font-mono text-sm text-accent">Contact</p>
          <h2 id="contact-heading" className="mt-3 text-headline font-semibold text-balance">
            Have a backend role or project in mind? Let&apos;s talk.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-fg-muted">
            I&apos;m open to selected opportunities, including backend and full-stack engineering
            roles, freelance projects and collaborations. Email is the quickest way to reach me.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`}>
              <Mail className="size-4" aria-hidden="true" />
              Email me
            </ButtonLink>
            <ButtonLink href={site.linkedin} variant="secondary" external>
              <LinkedInIcon className="size-4" />
              Connect on LinkedIn
            </ButtonLink>
          </div>

          <p className="mt-6 text-sm text-fg-muted">
            Or write to{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-accent underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
