"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Testimonial } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/testimonials", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login?from=" + encodeURIComponent("/admin/testimonials");
          return [];
        }
        return r.json();
      })
      .then(setList)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="btn-primary">
          Add testimonial
        </Link>
      </div>
      <div className="space-y-3">
        {list.length === 0 ? (
          <p className="text-muted">No testimonials yet.</p>
        ) : (
          list.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-card border border-border bg-surface-panel p-4"
            >
              <div>
                <p className="font-medium text-foreground">{t.name}</p>
                {(t.role || t.company) && (
                  <p className="text-sm text-muted">{[t.role, t.company].filter(Boolean).join(" • ")}</p>
                )}
                <p className="text-sm text-foreground mt-1 line-clamp-2">{t.quote}</p>
              </div>
              <Link href={`/admin/testimonials/${t.id}`} className="text-sm text-brand-mid hover:underline">
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
