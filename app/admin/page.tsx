"use client";

import Link from "next/link";

/**
 * Admin dashboard. Does not fetch counts on load so the public site and /admin
 * never trigger admin APIs until you open Work / Testimonials / Enquiries.
 * To reconnect admin to the public site later: add a link to /admin in
 * app/components/Header.tsx (e.g. in NAV_LINKS or a separate "Admin" link).
 */
export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/work"
          className="rounded-card border border-border bg-surface-panel p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="font-medium text-foreground">Work items</h2>
          <p className="mt-1 text-2xl font-semibold text-brand-mid">—</p>
        </Link>
        <Link
          href="/admin/testimonials"
          className="rounded-card border border-border bg-surface-panel p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="font-medium text-foreground">Testimonials</h2>
          <p className="mt-1 text-2xl font-semibold text-brand-mid">—</p>
        </Link>
        <Link
          href="/admin/enquiries"
          className="rounded-card border border-border bg-surface-panel p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="font-medium text-foreground">Enquiries</h2>
          <p className="mt-1 text-2xl font-semibold text-brand-mid">—</p>
        </Link>
      </div>
    </div>
  );
}
