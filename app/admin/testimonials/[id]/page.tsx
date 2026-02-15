"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Testimonial } from "@/lib/types";

export default function AdminTestimonialEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [item, setItem] = useState<Partial<Testimonial>>({
    name: "",
    role: "",
    company: "",
    quote: "",
    avatar: null,
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/testimonials/${id}`, { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login?from=" + encodeURIComponent(`/admin/testimonials/${id}`);
          return null;
        }
        return r.json();
      })
      .then((data) => data && setItem(data))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = isNew ? "/api/admin/testimonials" : `/api/admin/testimonials/${id}`;
    const method = isNew ? "POST" : "PUT";
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: item.name,
        role: item.role || undefined,
        company: item.company || undefined,
        quote: item.quote,
        avatar: item.avatar ?? null,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else router.push("/admin/testimonials");
      })
      .finally(() => setSaving(false));
  }

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div>
      <Link href="/admin/testimonials" className="text-sm text-brand-mid hover:underline mb-4 inline-block">
        ← Back to Testimonials
      </Link>
      <h1 className="text-2xl font-semibold text-foreground mb-6">
        {isNew ? "New testimonial" : "Edit testimonial"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Name</label>
          <input
            type="text"
            value={item.name ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, name: e.target.value }))}
            required
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Role</label>
          <input
            type="text"
            value={item.role ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, role: e.target.value }))}
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Company</label>
          <input
            type="text"
            value={item.company ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, company: e.target.value }))}
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Quote</label>
          <textarea
            value={item.quote ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, quote: e.target.value }))}
            rows={4}
            required
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Avatar URL</label>
          <input
            type="text"
            value={item.avatar ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, avatar: e.target.value || null }))}
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "Save"}
          </button>
          {!isNew && (
            <button
              type="button"
              onClick={() => {
                if (confirm("Delete this testimonial?")) {
                  fetch(`/api/admin/testimonials/${id}`, { method: "DELETE", credentials: "include" })
                    .then(() => router.push("/admin/testimonials"));
                }
              }}
              className="rounded-button border border-border px-4 py-2 text-sm text-muted hover:bg-border"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
