import { ArrowRight } from "lucide-react";
import { currentRole } from "@/data/experience";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RoleCard } from "./role-card";

export function ExperienceHighlight() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="surface-dark py-section">
      <Container>
        <SectionHeading id="experience-heading" eyebrow="Experience" title="Building healthcare software as part of a professional engineering team." />

        <div className="mt-12">
          <RoleCard role={currentRole} />
        </div>

        <ButtonLink href="/experience" variant="secondary" className="mt-8">
          View experience
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </Container>
    </section>
  );
}
