import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkAdminAuth } from "@/lib/auth";
import type { CloudflareEnv } from "@/lib/cloudflare";
import type { Testimonial, TestimonialInput } from "@/lib/types";

export const runtime = "edge";

function parseTestimonialRow(r: Record<string, unknown>): Testimonial {
  return {
    id: r.id as number,
    name: r.name as string,
    role: (r.role as string) ?? null,
    company: (r.company as string) ?? null,
    quote: r.quote as string,
    avatar: (r.avatar as string) ?? null,
    created_at: r.created_at as string,
  };
}

export async function GET(request: Request) {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as CloudflareEnv;
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = env.DB;
    const { results } = await db
      .prepare("SELECT * FROM testimonials ORDER BY created_at DESC")
      .all();
    const items = ((results ?? []) as Record<string, unknown>[]).map(parseTestimonialRow);
    return Response.json(items);
  } catch (e) {
    console.error("Admin testimonials list error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as CloudflareEnv;
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = env.DB;
    const body = (await request.json()) as TestimonialInput;
    const name = String(body?.name ?? "").trim();
    const quote = String(body?.quote ?? "").trim();
    const role = body?.role ? String(body.role).trim().slice(0, 200) : null;
    const company = body?.company ? String(body.company).trim().slice(0, 200) : null;
    const avatar = body?.avatar ?? null;
    if (!name || !quote) return Response.json({ error: "Name and quote required" }, { status: 400 });

    await db
      .prepare("INSERT INTO testimonials (name, role, company, quote, avatar) VALUES (?, ?, ?, ?, ?)")
      .bind(name, role, company, quote, avatar)
      .run();
    const { results } = await db.prepare("SELECT * FROM testimonials ORDER BY id DESC LIMIT 1").all();
    const row = (results ?? [])[0] as Record<string, unknown> | undefined;
    return Response.json(row ? parseTestimonialRow(row) : {});
  } catch (e) {
    console.error("Admin testimonial create error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
