import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProfileContent } from "@/lib/content";
import { QuickFacts } from "./quick-facts";

export function Intro({ profile }: { profile: ProfileContent }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="surface-paper py-section">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading id="about-heading" eyebrow="About" title={profile.introHeading ?? ""} />
          <div className="mt-6 max-w-prose-narrow space-y-4 text-lg leading-relaxed text-fg-muted">
            {profile.introParagraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline"
          >
            More about me
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <QuickFacts facts={profile.quickFacts} />
      </Container>
    </section>
  );
}
