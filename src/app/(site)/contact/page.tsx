import { ArrowUpRight, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SocialIcon } from "@/components/ui/social-icon";
import { isExternal, platformName, type SocialLink, socialHref } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";
import { getSite } from "@/sanity/lib/data";

export async function generateMetadata() {
  const site = await getSite();
  return pageMetadata({
    title: "Contact",
    description: `Contact ${site.profile.name} about software engineering roles, freelance projects and collaborations.`,
    path: "/contact",
    page: "contact",
  });
}

type Channel = {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external: boolean;
};

/** Card for a social link: the platform name, and the address or profile handle. */
function toChannel(link: SocialLink): Channel | null {
  const href = socialHref(link);
  if (!href || !link.url) return null;
  const handle =
    link.platform === "email" ? link.url.replace(/^mailto:/, "") : link.url.replace(/\/+$/, "").split("/").pop() ?? link.url;
  return {
    key: link._id,
    label: platformName(link),
    value: handle,
    href,
    icon: <SocialIcon platform={link.platform} />,
    external: isExternal(href),
  };
}

const reasons = [
  "Full-stack software engineering roles, especially backend-focused ones",
  "Freelance work on complete web applications, APIs or backend systems",
  "Collaborations on practical products",
];

export default async function ContactPage() {
  const site = await getSite();
  const availability = site.profile.availability?.isAvailable ? site.profile.availability.text : null;
  const channels = site.socialLinks.map(toChannel).filter((channel) => channel !== null);
  if (site.cv?.url) {
    channels.push({
      key: "cv",
      label: site.cv.buttonLabel || "CV",
      value: "View my CV",
      href: site.cv.url,
      icon: <FileText className="size-5" aria-hidden="true" />,
      external: true,
    });
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk about engineering roles, projects or collaborations.">
        <p>
          {availability ? `${availability} ` : null}Email is the quickest way to reach me. I&apos;m also happy to
          connect on LinkedIn, and I write on DEV.
        </p>
      </PageHeader>

      <section aria-label="Ways to get in touch" className="surface-paper py-section">
        <Container>
          {channels.length ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {channels.map((channel) => (
                // min-w-0 lets the card shrink below its content so long values (e.g. email) wrap
                <li key={channel.key} className="min-w-0">
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
          ) : null}

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
