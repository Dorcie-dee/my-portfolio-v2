import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuickFacts } from "./quick-facts";

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-heading" className="surface-paper py-section">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading id="about-heading" eyebrow="About" title="Full-stack engineering, with backend at the core." />
          <div className="mt-6 max-w-prose-narrow space-y-4 text-lg leading-relaxed text-fg-muted">
            <p>
              I&apos;m a full-stack software engineer. I work across the whole product, from user
              interfaces to the backend systems, APIs, databases and integrations behind them. My
              strongest expertise is on the backend: building services with Node.js, TypeScript,
              NestJS and Express, and modelling data in PostgreSQL and MongoDB.
            </p>
            <p>
              On the frontend I build with Next.js, React and React Native. Throughout, I pay
              attention to maintainability, security, solid functionality and the experience of the
              people using the software. I write automated tests with Jest and Supertest and
              document APIs with Swagger/OpenAPI and Postman.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline"
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
