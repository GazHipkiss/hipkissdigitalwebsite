import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkAdminAuth } from "@/lib/auth";
import type { CloudflareEnv } from "@/lib/cloudflare";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as CloudflareEnv;
    if (!checkAdminAuth(request, env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const bucket = env.BUCKET;
    if (!bucket) return Response.json({ error: "Upload not configured (no R2)" }, { status: 503 });

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || !(file instanceof File)) return Response.json({ error: "No file" }, { status: 400 });

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
    const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    await bucket.put(key, file.stream(), {
      httpMetadata: { contentType: file.type || "application/octet-stream" },
    });
    return Response.json({ key, url: `/api/uploads/${key}` });
  } catch (e) {
    console.error("Upload error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
