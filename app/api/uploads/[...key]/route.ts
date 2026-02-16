import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareEnv } from "@/lib/cloudflare";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const key = (await params).key.join("/");
    if (!key) return new Response("Not found", { status: 404 });
    const ctx = getCloudflareContext();
    const bucket = (ctx.env as CloudflareEnv).BUCKET;
    if (!bucket) return new Response("Not configured", { status: 503 });
    const object = await bucket.get(key);
    if (!object) return new Response("Not found", { status: 404 });
    const headers = new Headers();
    if (object.httpMetadata?.contentType) headers.set("Content-Type", object.httpMetadata.contentType);
    return new Response(object.body, { headers });
  } catch (e) {
    console.error("Upload serve error:", e);
    return new Response("Error", { status: 500 });
  }
}
