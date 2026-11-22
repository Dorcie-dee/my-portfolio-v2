import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ExperienceEntry } from "@/lib/content";
import { RoleCard } from "./role-card";

/** Homepage highlight of the current role (Profile → Current professional role). */
export function ExperienceHighlight({ role }: { role: ExperienceEntry | null }) {
  if (!role) return null;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="surface-paper py-section">
      <Container>
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Building healthcare software as part of a professional engineering team."
        />

        <div className="mt-12">
          <RoleCard role={role} />
        </div>

        <ButtonLink href="/experience" variant="secondary" className="mt-10">
          View experience
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </Container>
    </section>
  );
}
