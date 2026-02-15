import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected web and app development projects. Case studies and examples of recent work.",
};

const CASE_STUDIES = [
  {
    slug: "placeholder-ecommerce",
    title: "E-commerce platform",
    tagline: "Custom storefront and admin",
    description:
      "A tailored online store with inventory management, payments, and reporting. Built for a growing retailer who needed more control than off-the-shelf tools offered.",
    tags: ["Web app", "E-commerce", "React"],
  },
  {
    slug: "placeholder-saas",
    title: "SaaS dashboard",
    tagline: "B2B analytics and workflows",
    description:
      "Internal tool for a services company: dashboards, role-based access, and integrations with existing systems. Reduced manual work and improved visibility.",
    tags: ["Web app", "Dashboard", "API integration"],
  },
  {
    slug: "placeholder-marketing",
    title: "Marketing website",
    tagline: "Fast, accessible, on-brand",
    description:
      "A new marketing site for a professional services firm. Focus on clarity, performance, and a clear path from visitor to enquiry.",
    tags: ["Website", "CMS", "SEO"],
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Work
              </h1>
              <p className="mt-6 text-lg text-muted">
                A selection of recent projects. Each one was built with clear requirements, direct communication, and a focus on long-term maintainability.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="panel section border-t border-border"
        aria-labelledby="case-studies"
      >
        <div className="container-narrow">
          <h2 id="case-studies" className="sr-only">
            Case studies
          </h2>
          <ul className="max-w-4xl space-y-8">
            {CASE_STUDIES.map((project) => (
              <Reveal key={project.slug}>
                <li>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group block rounded-card border border-border bg-background/50 p-8 transition-all duration-200 hover:border-brand-accent/30 hover:shadow-md"
                  >
                    <span className="text-sm font-medium text-brand-mid">
                      {project.tagline}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-brand-accent">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-muted">
                      {project.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-brand-accent-subtle px-3 py-1 text-xs font-medium text-brand-deep"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <Reveal className="container-narrow">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Have a similar project in mind?
            </h2>
            <p className="mt-4 text-muted">
              I take on a limited number of projects so each one gets proper attention.
            </p>
            <div className="mt-8">
              <Button href="/contact">Start a conversation</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
