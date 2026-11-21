import { ArrowUpRight, FileText, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { DevToIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name} about backend or full-stack engineering roles, freelance projects and collaborations.`,
  path: "/contact",
});

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external: boolean;
};

const channels: Channel[] = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: <Mail className="size-5" aria-hidden="true" />,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "dorcasnyamekyequaye",
    href: site.linkedin,
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    label: "GitHub",
    value: "Dorcie-dee",
    href: site.github,
    icon: <GitHubIcon />,
    external: true,
  },
  {
    label: "DEV Community",
    value: "dorcie-dee",
    href: site.devto,
    icon: <DevToIcon />,
    external: true,
  },
  {
    label: "CV",
    value: "View my CV",
    href: site.cv,
    icon: <FileText className="size-5" aria-hidden="true" />,
    external: true,
  },
];

const reasons = [
  "Backend or full-stack software engineering roles",
  "Freelance work on APIs, backend systems or complete web applications",
  "Collaborations on practical products",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk about engineering roles, projects or collaborations.">
        <p>
          {site.availability} Email is the quickest way to reach me. I&apos;m also happy to
          connect on LinkedIn, and I write on DEV.
        </p>
      </PageHeader>

      <section aria-label="Ways to get in touch" className="surface-paper py-section">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2">
            {channels.map((channel) => (
              // min-w-0 lets the card shrink below its content so long values (e.g. email) wrap
              <li key={channel.label} className="min-w-0">
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full items-center gap-4 rounded-2xl border-2 border-outline bg-surface-raised p-6 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-stamp"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-lilac text-violet">
                    {channel.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-fg-muted">{channel.label}</span>
                    <span className="mt-0.5 block font-bold [overflow-wrap:anywhere]">{channel.value}</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-fg-muted transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                  {channel.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 max-w-prose-narrow">
            <h2 className="text-2xl text-plum">Good reasons to get in touch</h2>
            <ul className="mt-4 space-y-3 text-lg leading-relaxed text-fg-muted">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <span className="mt-3 size-1.5 shrink-0 rotate-45 bg-violet" aria-hidden="true" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
