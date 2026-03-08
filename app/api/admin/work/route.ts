import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkAdminAuth } from "@/lib/auth";
import type { CloudflareEnv } from "@/lib/cloudflare";
import type { WorkItem, WorkItemInput } from "@/lib/types";

export const runtime = "edge";

function parseWorkRow(r: Record<string, unknown>): WorkItem {
  return {
    id: r.id as number,
    title: r.title as string,
    slug: r.slug as string,
    description: r.description as string,
    tags: jsonParse(r.tags, []),
    cover_image: (r.cover_image as string) ?? null,
    gallery_images: jsonParse(r.gallery_images, []),
    published: (r.published as number) ?? 0,
    project_url: (r.project_url as string) ?? null,
    created_at: r.created_at as string,
    updated_at: r.updated_at as string,
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

export async function GET(request: Request) {
  try {
    let env: CloudflareEnv;
    try {
      const ctx = getCloudflareContext();
      env = (ctx?.env ?? {}) as CloudflareEnv;
    } catch (ctxErr) {
      console.error("getCloudflareContext error:", ctxErr);
      return Response.json({ error: "Server error", details: "Context unavailable" }, { status: 500 });
    }
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = env.DB;
    if (!db) {
      return Response.json({ error: "Database not configured" }, { status: 503 });
    }
    const { results } = await db
      .prepare("SELECT * FROM work_items ORDER BY created_at DESC")
      .all();
    const rows = (results ?? []) as Record<string, unknown>[];
    const items = rows.map((r) => {
      try {
        return parseWorkRow(r);
      } catch (parseErr) {
        console.error("parseWorkRow error:", parseErr, r);
        return null;
      }
    }).filter((x): x is WorkItem => x !== null);
    return Response.json(items);
  } catch (e) {
    console.error("Admin work list error:", e);
    return Response.json({ error: "Server error", details: String((e as Error).message) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    let env: CloudflareEnv;
    try {
      const ctx = getCloudflareContext();
      env = (ctx?.env ?? {}) as CloudflareEnv;
    } catch (ctxErr) {
      console.error("getCloudflareContext error:", ctxErr);
      return Response.json({ error: "Server error", details: "Context unavailable" }, { status: 500 });
    }
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = env.DB;
    const body = (await request.json()) as WorkItemInput;
    const title = String(body?.title ?? "").trim();
    const slug = String(body?.slug ?? "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-") || "untitled";
    const description = String(body?.description ?? "").trim();
    const tags = Array.isArray(body?.tags) ? body.tags : [];
    const cover_image = body?.cover_image ?? null;
    const gallery_images = Array.isArray(body?.gallery_images) ? body.gallery_images : [];
    const published = body?.published === true ? 1 : 0;
    const project_url = typeof body?.project_url === "string" ? body.project_url.trim() || null : null;
    if (!title) return Response.json({ error: "Title required" }, { status: 400 });

    await db
      .prepare(
        "INSERT INTO work_items (title, slug, description, tags, cover_image, gallery_images, published, project_url, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))"
      )
      .bind(title, slug, description, JSON.stringify(tags), cover_image, JSON.stringify(gallery_images), published, project_url)
      .run();
    const { results } = await db.prepare("SELECT * FROM work_items WHERE slug = ?").bind(slug).all();
    const row = (results ?? [])[0] as Record<string, unknown> | undefined;
    return Response.json(row ? parseWorkRow(row) : { slug });
  } catch (e) {
    console.error("Admin work create error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
