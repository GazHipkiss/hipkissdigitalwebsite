import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkAdminAuth } from "@/lib/auth";
import type { Testimonial, TestimonialInput } from "@/lib/types";

export const runtime = "edge";

function parseTestimonialRow(r: Record<string, unknown>): Testimonial {
  return {
    id: r.id,
    name: r.name,
    role: r.role,
    company: r.company,
    quote: r.quote,
    avatar: r.avatar,
    created_at: r.created_at,
  };
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
    const { results } = await db.prepare("SELECT * FROM testimonials WHERE id = ?").bind(id).all();
    const row = (results ?? [])[0] as Record<string, unknown> | undefined;
    if (!row) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(parseTestimonialRow(row));
  } catch (e) {
    console.error("Admin testimonial get error:", e);
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
    const body = (await request.json()) as TestimonialInput;
    const name = String(body?.name ?? "").trim();
    const quote = String(body?.quote ?? "").trim();
    const role = body?.role ? String(body.role).trim().slice(0, 200) : null;
    const company = body?.company ? String(body.company).trim().slice(0, 200) : null;
    const avatar = body?.avatar ?? null;
    if (!name || !quote) return Response.json({ error: "Name and quote required" }, { status: 400 });

    await db
      .prepare("UPDATE testimonials SET name=?, role=?, company=?, quote=?, avatar=? WHERE id=?")
      .bind(name, role, company, quote, avatar, id)
      .run();
    const { results } = await db.prepare("SELECT * FROM testimonials WHERE id = ?").bind(id).all();
    const row = (results ?? [])[0] as Record<string, unknown> | undefined;
    return Response.json(row ? parseTestimonialRow(row) : { id });
  } catch (e) {
    console.error("Admin testimonial update error:", e);
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
    await db.prepare("DELETE FROM testimonials WHERE id = ?").bind(id).run();
    return Response.json({ success: true });
  } catch (e) {
    console.error("Admin testimonial delete error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
