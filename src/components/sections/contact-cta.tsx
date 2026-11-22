import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { LinkedInIcon } from "@/components/ui/brand-icons";

type ContactCtaProps = {
  email: string | null;
  /** LinkedIn URL, when the LinkedIn social link is visible. */
  linkedinUrl: string | null;
};

export function ContactCta({ email, linkedinUrl }: ContactCtaProps) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="surface-butter py-section">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.5fr)_auto]">
        <div className="max-w-prose-narrow">
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="stripe h-1.5 w-[60px] shrink-0 rounded-full" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-heading" className="mt-4 text-headline text-balance text-plum">
            Have a software engineering role or project in mind? Let&apos;s talk.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-fg-muted">
            I&apos;m open to selected opportunities, including full-stack and backend-focused
            engineering roles, freelance projects and collaborations. Email is the quickest way to reach me.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            {email ? (
              <ButtonLink href={`mailto:${email}`}>
                <Mail className="size-4" aria-hidden="true" />
                Email me
              </ButtonLink>
            ) : null}
            {linkedinUrl ? (
              <ButtonLink href={linkedinUrl} variant="secondary" external>
                <LinkedInIcon className="size-4" />
                Connect on LinkedIn
              </ButtonLink>
            ) : null}
          </div>
          {email ? (
            <p className="text-sm text-fg-muted">
              Or write to{" "}
              <a href={`mailto:${email}`} className="font-bold text-accent underline underline-offset-4">
                {email}
              </a>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
