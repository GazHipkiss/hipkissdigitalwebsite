"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { safeJson } from "@/lib/safeFetch";
import type { WorkItem } from "@/lib/types";

export default function AdminWorkPage() {
  const [list, setList] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/work", { credentials: "include" })
      .then(async (r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login?from=" + encodeURIComponent("/admin/work");
          return [];
        }
        if (!r.ok) {
          const j = await safeJson<{ error?: string; details?: string }>(r);
          const msg = j?.error ? (j.details ? `${j.error}: ${j.details}` : j.error) : `Error ${r.status}`;
          setError(msg);
          return [];
        }
        const data = await safeJson<WorkItem[]>(r);
        return Array.isArray(data) ? data : [];
      })
      .then(setList)
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted">Loading…</p>;
  if (error) return <p className="text-muted">Failed to load: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Work</h1>
        <Link href="/admin/work/new" className="btn-primary">
          Add work item
        </Link>
      </div>
      <div className="space-y-3">
        {list.length === 0 ? (
          <p className="text-muted">No work items. Add one to get started.</p>
        ) : (
          list.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between rounded-card border border-border bg-surface-panel p-4"
            >
              <div>
                <p className="font-medium text-foreground">{w.title}</p>
                <p className="text-sm text-muted">/{w.slug} {w.published ? "• Published" : "• Draft"}</p>
              </div>
              <Link href={`/admin/work/${w.id}`} className="text-sm text-brand-mid hover:underline">
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
