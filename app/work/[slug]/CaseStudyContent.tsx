"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "../../components/Button";
import { Reveal } from "../../components/Reveal";
import type { WorkItem } from "@/lib/types";

type Props = { slug: string };

export function CaseStudyContent({ slug }: Props) {
  const [item, setItem] = useState<WorkItem | null | "404">(null);

  useEffect(() => {
    fetch(`/api/work/${encodeURIComponent(slug)}`)
      .then((r) => {
        if (r.status === 404) {
          setItem("404");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setItem(data);
      })
      .catch(() => setItem("404"));
  }, [slug]);

  if (item === "404") notFound();
  if (item === null) return <p className="text-muted">Loading…</p>;

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
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {item.title}
            </h1>
            {item.tags?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-brand-accent-subtle px-3 py-1 text-xs font-medium text-brand-deep"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </section>

      {item.cover_image && (
        <section className="container-narrow max-w-4xl">
          <Reveal>
            <div className="relative aspect-video overflow-hidden rounded-card border border-border">
              <Image
                src={item.cover_image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </Reveal>
        </section>
      )}

      <section className="panel section border-t border-border">
        <Reveal className="container-narrow max-w-3xl">
          <p className="text-lg text-muted">{item.description}</p>
          {item.gallery_images?.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {item.gallery_images.map((src, i) => (
                <div key={i} className="relative aspect-video overflow-hidden rounded-card border border-border">
                  <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          )}
          <div className="mt-10">
            <Button href="/contact">Discuss a similar project</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
