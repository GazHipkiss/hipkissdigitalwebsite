"use client";

import { useEffect, useState } from "react";
import type { Enquiry } from "@/lib/types";

export default function AdminEnquiriesPage() {
  const [list, setList] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/enquiries", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login?from=" + encodeURIComponent("/admin/enquiries");
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
      <h1 className="text-2xl font-semibold text-foreground mb-6">Enquiries</h1>
      <div className="space-y-4">
        {list.length === 0 ? (
          <p className="text-muted">No enquiries yet.</p>
        ) : (
          list.map((e) => (
            <div
              key={e.id}
              className="rounded-card border border-border bg-surface-panel p-6"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <span>{new Date(e.created_at).toLocaleString()}</span>
                {e.service && <span>• {e.service}</span>}
                {e.budget && <span>• {e.budget}</span>}
              </div>
              <p className="mt-1 font-medium text-foreground">{e.name}</p>
              <p className="text-sm text-brand-mid">{e.email}</p>
              <p className="mt-2 text-foreground whitespace-pre-wrap">{e.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
