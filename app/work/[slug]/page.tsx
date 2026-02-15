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

const SLUGS = ["placeholder-ecommerce", "placeholder-saas", "placeholder-marketing"] as const;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

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
      <section className="section">
        <div className="container-narrow max-w-3xl">
          <Reveal>
            <Link
              href="/work"
              className="text-sm font-medium text-brand-mid transition-colors duration-200 hover:text-brand-accent"
            >
              ← Back to Work
            </Link>
            <p className="mt-4 text-sm font-medium text-brand-mid">
              {project.tagline}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
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
          </Reveal>
        </div>
      </section>

      <section className="panel section border-t border-border">
        <Reveal className="container-narrow max-w-3xl">
          <p className="text-lg text-muted">{project.detail}</p>
          <div className="mt-10">
            <Button href="/contact">Discuss a similar project</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
