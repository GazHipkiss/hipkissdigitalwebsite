"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { WorkItem } from "@/lib/types";

export default function AdminWorkEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";
  const [item, setItem] = useState<Partial<WorkItem>>({
    title: "",
    slug: "",
    description: "",
    tags: [],
    cover_image: null,
    gallery_images: [],
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/work/${id}`, { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login?from=" + encodeURIComponent(`/admin/work/${id}`);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setItem({ ...data, published: data.published === 1 });
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = isNew ? "/api/admin/work" : `/api/admin/work/${id}`;
    const method = isNew ? "POST" : "PUT";
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: item.title,
        slug: item.slug || (item.title ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        description: item.description,
        tags: item.tags ?? [],
        cover_image: item.cover_image ?? null,
        gallery_images: item.gallery_images ?? [],
        published: item.published ?? false,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else router.push("/admin/work");
      })
      .finally(() => setSaving(false));
  }

  if (loading) return <p className="text-muted">Loading…</p>;

  return (
    <div>
      <Link href="/admin/work" className="text-sm text-brand-mid hover:underline mb-4 inline-block">
        ← Back to Work
      </Link>
      <h1 className="text-2xl font-semibold text-foreground mb-6">
        {isNew ? "New work item" : "Edit work item"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Title</label>
          <input
            type="text"
            value={item.title ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, title: e.target.value }))}
            required
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Slug (URL)</label>
          <input
            type="text"
            value={item.slug ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, slug: e.target.value }))}
            placeholder="e.g. my-project"
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Description</label>
          <textarea
            value={item.description ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, description: e.target.value }))}
            rows={4}
            required
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Tags (JSON array)</label>
          <input
            type="text"
            value={JSON.stringify(item.tags ?? [])}
            onChange={(e) => {
              try {
                setItem((p) => ({ ...p, tags: JSON.parse(e.target.value || "[]") }));
              } catch {}
            }}
            placeholder='["Web app", "React"]'
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Cover image URL</label>
          <input
            type="text"
            value={item.cover_image ?? ""}
            onChange={(e) => setItem((p) => ({ ...p, cover_image: e.target.value || null }))}
            placeholder="/api/uploads/..."
            className="w-full rounded-input border border-border bg-surface-panel px-4 py-3 text-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={!!item.published}
            onChange={(e) => setItem((p) => ({ ...p, published: e.target.checked }))}
          />
          <label htmlFor="published" className="text-sm text-foreground">Published</label>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "Save"}
          </button>
          {!isNew && (
            <button
              type="button"
              onClick={() => {
                if (confirm("Delete this work item?")) {
                  fetch(`/api/admin/work/${id}`, { method: "DELETE", credentials: "include" })
                    .then(() => router.push("/admin/work"));
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
