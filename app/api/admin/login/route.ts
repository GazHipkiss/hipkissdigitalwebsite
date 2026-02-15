import { getCloudflareContext } from "@opennextjs/cloudflare";
import { setAdminCookieHeader } from "@/lib/auth";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const ctx = getCloudflareContext();
    const password = ctx.env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD ?? "";
    if (!password) {
      return Response.json({ error: "Admin not configured" }, { status: 503 });
    }
    const body = await request.json();
    const submitted = typeof body?.password === "string" ? body.password : "";
    if (submitted !== password) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": setAdminCookieHeader(password),
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
