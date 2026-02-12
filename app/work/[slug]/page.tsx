import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "../../components/Button";
import { Reveal } from "../../components/Reveal";

const CASE_STUDIES: Record<
  string,
  { title: string; tagline: string; description: string; tags: string[]; detail: string }
> = {
  "placeholder-ecommerce": {
    title: "E-commerce platform",
    tagline: "Custom storefront and admin",
    description:
      "A tailored online store with inventory management, payments, and reporting.",
    tags: ["Web app", "E-commerce", "React"],
    detail:
      "This project was built for a growing retailer who needed more control than off-the-shelf tools offered. We delivered a custom storefront, admin dashboard for inventory and orders, and secure payment integration. The result was a faster site, clearer reporting, and a foundation they can extend as they grow.",
  },
  "placeholder-saas": {
    title: "SaaS dashboard",
    tagline: "B2B analytics and workflows",
    description:
      "Internal tool for a services company: dashboards, role-based access, and integrations.",
    tags: ["Web app", "Dashboard", "API integration"],
    detail:
      "The client needed an internal tool to replace spreadsheets and manual processes. We built a dashboard with role-based access, key metrics, and integrations with their existing systems. Manual work dropped and visibility into operations improved. The stack was chosen for maintainability and future in-house ownership.",
  },
  "placeholder-marketing": {
    title: "Marketing website",
    tagline: "Fast, accessible, on-brand",
    description:
      "A new marketing site for a professional services firm.",
    tags: ["Website", "CMS", "SEO"],
    detail:
      "A full replacement of an outdated marketing site. Goals were clarity, performance, and a clear path from visitor to enquiry. The site is fully responsive, accessible, and backed by a simple CMS so the team can update content without developer involvement.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];
  if (!project) notFound();

  return (
    <>
      <section className="px-6 pt-16 pb-12 lg:px-8 lg:pt-24 lg:pb-16">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/work"
              className="text-sm font-medium text-[var(--brand-mid)] hover:underline"
            >
              ← Back to Work
            </Link>
            <p className="mt-4 text-sm font-medium text-[var(--brand-mid)]">
              {project.tagline}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {project.title}
            </h1>
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
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--border)] px-6 py-16 lg:px-8 lg:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-[var(--muted)]">{project.detail}</p>
          </div>
          <div className="mt-10">
            <Button href="/contact">Discuss a similar project</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
