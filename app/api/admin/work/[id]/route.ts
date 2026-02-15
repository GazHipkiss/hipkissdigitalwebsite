import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkAdminAuth } from "@/lib/auth";
import type { WorkItem, WorkItemInput } from "@/lib/types";

export const runtime = "edge";

function parseWorkRow(r: Record<string, unknown>): WorkItem {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    description: r.description,
    tags: jsonParse(r.tags, []),
    cover_image: r.cover_image,
    gallery_images: jsonParse(r.gallery_images, []),
    published: r.published ?? 0,
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

function jsonParse<T>(s: unknown, fallback: T): T {
  if (typeof s !== "string") return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as { ADMIN_PASSWORD?: string; DB: D1Database };
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const db = env.DB;
    const { results } = await db.prepare("SELECT * FROM work_items WHERE id = ?").bind(id).all();
    const row = (results ?? [])[0] as Record<string, unknown> | undefined;
    if (!row) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(parseWorkRow(row));
  } catch (e) {
    console.error("Admin work get error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as { ADMIN_PASSWORD?: string; DB: D1Database };
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const db = env.DB;
    const body = (await request.json()) as WorkItemInput & { slug?: string };
    const title = String(body?.title ?? "").trim();
    const slug = String(body?.slug ?? "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-") || "untitled";
    const description = String(body?.description ?? "").trim();
    const tags = Array.isArray(body?.tags) ? body.tags : [];
    const cover_image = body?.cover_image ?? null;
    const gallery_images = Array.isArray(body?.gallery_images) ? body.gallery_images : [];
    const published = body?.published === true ? 1 : 0;
    if (!title) return Response.json({ error: "Title required" }, { status: 400 });

    await db
      .prepare(
        "UPDATE work_items SET title=?, slug=?, description=?, tags=?, cover_image=?, gallery_images=?, published=?, updated_at=datetime('now') WHERE id=?"
      )
      .bind(title, slug, description, JSON.stringify(tags), cover_image, JSON.stringify(gallery_images), published, id)
      .run();
    const { results } = await db.prepare("SELECT * FROM work_items WHERE id = ?").bind(id).all();
    const row = (results ?? [])[0] as Record<string, unknown> | undefined;
    return Response.json(row ? parseWorkRow(row) : { id });
  } catch (e) {
    console.error("Admin work update error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as { ADMIN_PASSWORD?: string; DB: D1Database };
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const db = env.DB;
    await db.prepare("DELETE FROM work_items WHERE id = ?").bind(id).run();
    return Response.json({ success: true });
  } catch (e) {
    console.error("Admin work delete error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
