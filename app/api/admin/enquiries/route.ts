import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkAdminAuth } from "@/lib/auth";
import type { Enquiry } from "@/lib/types";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as { ADMIN_PASSWORD?: string; DB: D1Database };
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = env.DB;
    const { results } = await db
      .prepare("SELECT id, name, email, service, budget, message, created_at FROM enquiries ORDER BY created_at DESC LIMIT 500")
      .all();
    const enquiries = (results ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      service: r.service,
      budget: r.budget,
      message: r.message,
      created_at: r.created_at,
    })) as Enquiry[];
    return Response.json(enquiries);
  } catch (e) {
    console.error("Enquiries list error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
