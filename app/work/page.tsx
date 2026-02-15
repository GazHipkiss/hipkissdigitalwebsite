import type { Metadata } from "next";
import { Reveal } from "../components/Reveal";
import { WorkList } from "./WorkList";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected web and app development projects. Case studies and examples of recent work.",
};

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

      <section className="panel section border-t border-border" aria-labelledby="case-studies">
        <div className="container-narrow">
          <h2 id="case-studies" className="sr-only">
            Case studies
          </h2>
          <WorkList />
        </div>
      </section>
    </>
  );
}
