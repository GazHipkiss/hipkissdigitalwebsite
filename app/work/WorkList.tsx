"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { safeJson } from "@/lib/safeFetch";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import type { WorkItem } from "@/lib/types";

const RESTAURANT_PROJECT: WorkItem = {
  id: 0,
  title: "The Copper Fox",
  slug: "restaurant-portfolio",
  description:
    "A responsive restaurant site built with vanilla HTML, CSS, and JavaScript to showcase front-end skills—semantic markup, responsive layout, and clean, maintainable code. The Copper Fox theme brings seasonal British dining to the screen.",
  tags: ["HTML", "CSS", "JavaScript"],
  cover_image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  gallery_images: [],
  published: 1,
  project_url: "https://portfolio-restaurant-nu.vercel.app",
  created_at: "",
  updated_at: "",
};

export function WorkList() {
  const [items, setItems] = useState<WorkItem[]>([RESTAURANT_PROJECT]);

  useEffect(() => {
    fetch("/api/work")
      .then(async (r) => safeJson<WorkItem[]>(r))
      .then((data) => {
        const fromApi = Array.isArray(data) ? data : [];
        const hasRestaurant = fromApi.some(
          (p) => p.slug === "restaurant-portfolio" || p.project_url?.includes("portfolio-restaurant-nu")
        );
        return hasRestaurant ? fromApi : [RESTAURANT_PROJECT, ...fromApi];
      })
      .then(setItems)
      .catch(() => setItems([RESTAURANT_PROJECT]));
  }, []);

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
                  className="group block overflow-hidden rounded-card border border-border bg-background/50 transition-all duration-200 hover:border-brand-accent/30 hover:shadow-md"
                >
                  {project.cover_image && (
                    <div className="relative aspect-video w-full bg-border">
                      <Image
                        src={project.cover_image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        sizes="(max-width: 896px) 100vw, 896px"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
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
                  </div>
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
