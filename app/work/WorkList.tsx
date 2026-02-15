"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import type { WorkItem } from "@/lib/types";

const FALLBACK: WorkItem[] = [];

export function WorkList() {
  const [items, setItems] = useState<WorkItem[] | null>(null);

  useEffect(() => {
    fetch("/api/work")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : FALLBACK))
      .catch(() => setItems(FALLBACK));
  }, []);

  if (items === null) return <p className="text-muted">Loading…</p>;

  return (
    <>
      <ul className="max-w-4xl space-y-8">
        {items.length === 0 ? (
          <li className="rounded-card border border-border bg-background/50 p-8 text-center text-muted">
            No projects yet. Check back soon.
          </li>
        ) : (
          items.map((project) => (
            <Reveal key={project.slug}>
              <li>
                <Link
                  href={`/work/${project.slug}`}
                  className="group block rounded-card border border-border bg-background/50 p-8 transition-all duration-200 hover:border-brand-accent/30 hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-brand-accent">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-muted">{project.description}</p>
                  {project.tags?.length > 0 && (
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
                  )}
                </Link>
              </li>
            </Reveal>
          ))
        )}
      </ul>
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
