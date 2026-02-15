import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { WorkItem } from "@/lib/types";

export const runtime = "edge";

function jsonParse<T>(s: unknown, fallback: T): T {
  if (typeof s !== "string") return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

function parseRow(r: Record<string, unknown>): WorkItem {
  return {
    id: r.id as number,
    title: r.title as string,
    slug: r.slug as string,
    description: r.description as string,
    tags: jsonParse(r.tags, []),
    cover_image: (r.cover_image as string) ?? null,
    gallery_images: jsonParse(r.gallery_images, []),
    published: (r.published as number) ?? 0,
    created_at: r.created_at as string,
    updated_at: r.updated_at as string,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const ctx = getCloudflareContext();
    const db = (ctx.env as { DB: D1Database }).DB;
    const { results } = await db
      .prepare("SELECT * FROM work_items WHERE slug = ? AND published = 1")
      .bind(slug)
      .all();
    const row = (results ?? [])[0] as Record<string, unknown> | undefined;
    if (!row) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(parseRow(row));
  } catch (e) {
    console.error("Work by slug error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
