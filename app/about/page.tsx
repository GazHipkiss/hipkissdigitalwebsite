import type { Metadata } from "next";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hipkiss Digital is a solo developer studio. Personal attention, direct communication, and high standards — no agency bloat.",
};

const STRENGTHS = [
  "You work with one person, not a rotating team.",
  "Decisions and answers come quickly — no layers of approval.",
  "Pricing is transparent and aligned with the work, not overhead.",
  "The same person who scopes the project builds and maintains it.",
];

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <Reveal className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
            <div className="flex-shrink-0">
              <img
                src="/logo.png"
                alt="Hipkiss Digital"
                width={200}
                height={60}
                className="h-14 w-auto object-contain"
              />
            </div>
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                About Hipkiss Digital
              </h1>
              <p className="mt-6 text-lg text-muted">
                Hipkiss Digital is a solo developer studio. I build websites and applications for businesses that want high-quality work, clear communication, and a single point of contact — without the cost and complexity of a large agency.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="panel section border-t border-border"
        aria-labelledby="solo-advantages"
      >
        <div className="container-narrow max-w-3xl">
          <Reveal>
            <h2 id="solo-advantages" className="text-2xl font-semibold text-foreground">
              Why solo is a strength
            </h2>
            <p className="mt-4 text-muted">
              Being a one-person studio isn’t a limitation — it’s what lets me offer the kind of attention and consistency that bigger teams often can’t.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-6">
            {STRENGTHS.map((item) => (
              <Reveal key={item}>
                <li className="flex gap-4">
                  <span
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-accent-subtle text-sm font-semibold text-brand-mid"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-border">
        <div className="container-narrow max-w-3xl">
          <Reveal>
            <h2 id="approach" className="text-2xl font-semibold text-foreground">
              How I work
            </h2>
            <p className="mt-4 text-muted">
              I focus on a small number of projects at a time. That means clear timelines, fewer surprises, and code that’s built to last. I use modern, well-supported tools and write documentation so you or another developer can take over if needed. No lock-in, no black boxes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="panel section border-t border-border">
        <Reveal className="container-narrow">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Let’s talk about your project
            </h2>
            <p className="mt-4 text-muted">
              Tell me what you’re trying to achieve and I’ll outline how I can help.
            </p>
            <div className="mt-8">
              <Button href="/contact">Get in touch</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
