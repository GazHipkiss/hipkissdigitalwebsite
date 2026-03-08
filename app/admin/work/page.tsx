"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
          const text = await r.text();
          let msg = `Error ${r.status}`;
          try {
            const j = JSON.parse(text);
            if (j?.error) msg = j.error;
            if (j?.details) msg += ": " + j.details;
          } catch {
            if (text) msg += ": " + text.slice(0, 100);
          }
          setError(msg);
          return [];
        }
        return r.json();
      })
      .then((data) => Array.isArray(data) ? data : [])
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
