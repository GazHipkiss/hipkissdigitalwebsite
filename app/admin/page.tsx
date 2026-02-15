"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [authOk, setAuthOk] = useState<boolean | null>(null);
  const [counts, setCounts] = useState({ work: 0, testimonials: 0, enquiries: 0 });

  useEffect(() => {
    const opts = { credentials: "include" as RequestCredentials };
    Promise.all([
      fetch("/api/admin/work", opts),
      fetch("/api/admin/testimonials", opts),
      fetch("/api/admin/enquiries", opts),
    ]).then(([w, t, e]) => {
      if (w.status === 401 || t.status === 401 || e.status === 401) {
        window.location.href = "/admin/login?from=" + encodeURIComponent("/admin");
        return;
      }
      setAuthOk(true);
      Promise.all([w.json(), t.json(), e.json()]).then(([work, testimonials, enquiries]) => {
        setCounts({
          work: Array.isArray(work) ? work.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          enquiries: Array.isArray(enquiries) ? enquiries.length : 0,
        });
      });
    }).catch(() => setAuthOk(false));
  }, []);

  if (authOk === null) return <p className="text-muted">Loading…</p>;
  if (authOk === false) return <p className="text-muted">Redirecting to login…</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/work"
          className="rounded-card border border-border bg-surface-panel p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="font-medium text-foreground">Work items</h2>
          <p className="mt-1 text-2xl font-semibold text-brand-mid">{counts.work}</p>
        </Link>
        <Link
          href="/admin/testimonials"
          className="rounded-card border border-border bg-surface-panel p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="font-medium text-foreground">Testimonials</h2>
          <p className="mt-1 text-2xl font-semibold text-brand-mid">{counts.testimonials}</p>
        </Link>
        <Link
          href="/admin/enquiries"
          className="rounded-card border border-border bg-surface-panel p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="font-medium text-foreground">Enquiries</h2>
          <p className="mt-1 text-2xl font-semibold text-brand-mid">{counts.enquiries}</p>
        </Link>
      </div>
    </div>
  );
}
