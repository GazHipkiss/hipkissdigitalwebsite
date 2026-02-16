import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareEnv } from "@/lib/cloudflare";
import type { Testimonial } from "@/lib/types";

export const runtime = "edge";

function parseRow(r: Record<string, unknown>): Testimonial {
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

export async function GET() {
  try {
    const ctx = getCloudflareContext();
    const db = (ctx.env as CloudflareEnv).DB;
    const { results } = await db
      .prepare("SELECT * FROM testimonials ORDER BY created_at DESC")
      .all();
    const items = ((results ?? []) as Record<string, unknown>[]).map(parseRow);
    return Response.json(items);
  } catch (e) {
    console.error("Testimonials list error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
