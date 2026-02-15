import type { Metadata } from "next";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, app development, and ongoing support. From marketing sites to web applications — built to your requirements.",
};

const SERVICES = [
  {
    title: "Web development",
    description:
      "Custom websites that load fast, work on every device, and are built with clean, maintainable code. From brochure sites to content-heavy platforms.",
  },
  {
    title: "Web applications",
    description:
      "Interactive apps, dashboards, and tools that run in the browser. Modern frameworks, clear architecture, and scalable solutions.",
  },
  {
    title: "App development",
    description:
      "Native or cross-platform mobile and desktop applications. Focus on usability, performance, and long-term maintainability.",
  },
  {
    title: "Consulting & audits",
    description:
      "Code reviews, performance audits, and technical guidance. Get an expert opinion before you build or before you scale.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Services
              </h1>
              <p className="mt-6 text-lg text-muted">
                I build websites and applications that are reliable, fast, and easy to maintain. Every project is scoped clearly so you know what you’re getting — and when.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="panel section border-t border-border"
        aria-labelledby="services-list"
      >
        <div className="container-narrow">
          <h2 id="services-list" className="sr-only">
            What I offer
          </h2>
          <ul className="max-w-4xl space-y-8">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title}>
                <li>
                  <article className="rounded-card border border-border bg-background/50 p-8 transition-all duration-200 hover:shadow-md">
                    <span className="text-sm font-medium text-brand-mid">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-muted">
                      {service.description}
                    </p>
                  </article>
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
              Not sure what you need?
            </h2>
            <p className="mt-4 text-muted">
              Describe your project and I’ll suggest an approach and ballpark scope.
            </p>
            <div className="mt-8">
              <Button href="/contact">Discuss your project</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
