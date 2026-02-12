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
      <section className="px-6 pt-16 pb-12 lg:px-8 lg:pt-24 lg:pb-16">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Work
            </h1>
            <p className="mt-6 text-lg text-[var(--muted)]">
              A selection of recent projects. Each one was built with clear requirements, direct communication, and a focus on long-term maintainability.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="border-t border-[var(--border)] px-6 py-16 lg:px-8 lg:py-20"
        aria-labelledby="case-studies"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="case-studies" className="sr-only">
            Case studies
          </h2>
          <ul className="space-y-8">
            {CASE_STUDIES.map((project) => (
              <Reveal key={project.slug}>
                <li>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group block rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 transition-all duration-200 hover:border-[var(--brand-mid)]/30 hover:shadow-md"
                  >
                    <span className="text-sm font-medium text-[var(--brand-mid)]">
                      {project.tagline}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-mid)]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-[var(--muted)]">
                      {project.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-[var(--brand-light)] px-3 py-1 text-xs font-medium text-[var(--brand-dark)]"
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

      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-6 py-16 lg:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">
            Have a similar project in mind?
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            I take on a limited number of projects so each one gets proper attention.
          </p>
          <div className="mt-8">
            <Button href="/contact">Start a conversation</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
