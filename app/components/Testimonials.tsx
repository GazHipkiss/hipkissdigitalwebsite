"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import type { Testimonial } from "@/lib/types";

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="panel section border-t border-border" aria-labelledby="testimonials-heading">
      <div className="container-narrow">
        <Reveal>
          <h2 id="testimonials-heading" className="text-center text-2xl font-semibold text-foreground sm:text-3xl">
            What clients say
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <Reveal key={t.id}>
              <li className="rounded-card border border-border bg-background/60 p-6">
                <blockquote className="text-muted">{t.quote}</blockquote>
                <footer className="mt-4 flex items-center gap-3">
                  {t.avatar ? (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
                      <Image src={t.avatar} alt="" fill className="object-cover" sizes="40px" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent-subtle text-sm font-medium text-brand-deep">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <cite className="not-italic font-medium text-foreground">{t.name}</cite>
                    {(t.role || t.company) && (
                      <p className="text-sm text-muted">
                        {[t.role, t.company].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </footer>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
