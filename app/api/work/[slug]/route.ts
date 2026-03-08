import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareEnv } from "@/lib/cloudflare";
import type { WorkItem } from "@/lib/types";

const RESTAURANT_FALLBACK: WorkItem = {
  id: 0,
  title: "The Copper Fox",
  slug: "restaurant-portfolio",
  description:
    "A responsive restaurant site built with vanilla HTML, CSS, and JavaScript to showcase front-end skills—semantic markup, responsive layout, and clean, maintainable code. The Copper Fox theme brings seasonal British dining to the screen.",
  tags: ["HTML", "CSS", "JavaScript"],
  cover_image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  gallery_images: [],
  published: 1,
  project_url: "https://portfolio-restaurant-nu.vercel.app",
  created_at: "",
  updated_at: "",
};

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
    project_url: (r.project_url as string) ?? null,
    created_at: r.created_at as string,
    updated_at: r.updated_at as string,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const ctx = getCloudflareContext();
    const db = (ctx.env as CloudflareEnv).DB;
    const { results } = await db
      .prepare("SELECT * FROM work_items WHERE slug = ? AND published = 1")
      .bind(slug)
      .all();
    const row = (results ?? [])[0] as Record<string, unknown> | undefined;
    if (row) return Response.json(parseRow(row));
    if (slug === "restaurant-portfolio") return Response.json(RESTAURANT_FALLBACK);
    return Response.json({ error: "Not found" }, { status: 404 });
  } catch (e) {
    console.error("Work by slug error:", e);
    if (slug === "restaurant-portfolio") return Response.json(RESTAURANT_FALLBACK);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
