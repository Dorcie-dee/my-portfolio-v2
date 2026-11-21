import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { LinkedInIcon } from "@/components/ui/brand-icons";

export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="surface-butter py-section">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_auto]">
        <div className="max-w-prose-narrow">
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="stripe h-1.5 w-[60px] shrink-0 rounded-full" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-heading" className="mt-4 text-headline text-balance text-plum">
            Have a backend role or project in mind? Let&apos;s talk.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-fg-muted">
            I&apos;m open to selected opportunities, including backend and full-stack engineering
            roles, freelance projects and collaborations. Email is the quickest way to reach me.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`}>
              <Mail className="size-4" aria-hidden="true" />
              Email me
            </ButtonLink>
            <ButtonLink href={site.linkedin} variant="secondary" external>
              <LinkedInIcon className="size-4" />
              Connect on LinkedIn
            </ButtonLink>
          </div>
          <p className="text-sm text-fg-muted">
            Or write to{" "}
            <a href={`mailto:${site.email}`} className="font-bold text-accent underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
