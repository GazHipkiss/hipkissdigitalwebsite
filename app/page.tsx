import Link from "next/link";
import { Button } from "./components/Button";
import { Reveal } from "./components/Reveal";
import { HeroReveal } from "./components/HeroReveal";

export default function Home() {
  return (
    <>
      <section
        className="hero-gradient relative overflow-hidden section"
        aria-labelledby="hero-heading"
      >
        <div className="container-narrow">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              <HeroReveal>
                Websites and apps that work for your business.
              </HeroReveal>
            </h1>
            <p className="mt-6 text-lg text-muted sm:text-xl max-w-2xl mx-auto animate-fade-up animate-fade-up-delay-2">
              I build high-quality, reliable digital products for real businesses. One developer, direct communication, no agency bloat — just focused work that gets results.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up animate-fade-up-delay-3">
              <Button href="/contact">Start a project</Button>
              <Button href="/work" variant="outline">
                View recent work
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="panel section border-t border-border"
        aria-labelledby="value-heading"
      >
        <div className="container-narrow">
          <Reveal>
            <h2 id="value-heading" className="text-center text-2xl font-semibold text-foreground sm:text-3xl">
              Why work with a solo developer?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
              You get a single point of contact, clear communication, and someone who cares about the outcome as much as you do.
            </p>
          </Reveal>
          <Reveal className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger>
            <div className="rounded-card border border-border bg-background/60 p-6 transition-all duration-200 hover:shadow-md">
              <span className="text-2xl font-bold text-brand-mid" aria-hidden>01</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">Direct communication</h3>
              <p className="mt-2 text-sm text-muted">
                No account managers or middlemen. You work directly with the person building your product.
              </p>
            </div>
            <div className="rounded-card border border-border bg-background/60 p-6 transition-all duration-200 hover:shadow-md">
              <span className="text-2xl font-bold text-brand-mid" aria-hidden>02</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">High standards</h3>
              <p className="mt-2 text-sm text-muted">
                Clean code, modern stack, and attention to detail. Built to last and easy to maintain.
              </p>
            </div>
            <div className="rounded-card border border-border bg-background/60 p-6 transition-all duration-200 hover:shadow-md">
              <span className="text-2xl font-bold text-brand-mid" aria-hidden>03</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">No agency bloat</h3>
              <p className="mt-2 text-sm text-muted">
                Fair pricing and efficient delivery. You pay for the work, not for layers of overhead.
              </p>
            </div>
            <div className="rounded-card border border-border bg-background/60 p-6 transition-all duration-200 hover:shadow-md">
              <span className="text-2xl font-bold text-brand-mid" aria-hidden>04</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">Personal attention</h3>
              <p className="mt-2 text-sm text-muted">
                Your project isn’t one of dozens. I take on limited work so each client gets proper focus.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="cta-heading">
        <Reveal className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="cta-heading" className="text-2xl font-semibold text-foreground sm:text-3xl">
              Ready to build something?
            </h2>
            <p className="mt-4 text-muted">
              Tell me about your project. I’ll get back to you within 24 hours.
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
