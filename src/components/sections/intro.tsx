import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuickFacts } from "./quick-facts";

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-heading" className="surface-light py-section">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading id="about-heading" eyebrow="About" title="Backend first, and across the stack when it counts." />
          <div className="mt-6 max-w-prose-narrow space-y-4 text-lg leading-relaxed text-fg-muted">
            <p>
              I&apos;m a backend-focused software engineer. Most of my work is on the server side:
              building REST APIs with Node.js and TypeScript, structuring services with NestJS and
              Express, and modelling data in PostgreSQL and MongoDB.
            </p>
            <p>
              I write automated tests with Jest and Supertest and document APIs with
              Swagger/OpenAPI, so the systems I work on are easier to trust and to hand over. When
              a feature needs a frontend, I build that too.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline"
          >
            More about me
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <QuickFacts />
      </Container>
    </section>
  );
}
