import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareEnv } from "@/lib/cloudflare";
import type { EnquiryInput } from "@/lib/types";

export const runtime = "edge";

function validateBody(body: unknown): { ok: true; data: EnquiryInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";
  if (!name || name.length > 200) return { ok: false, error: "Name is required (max 200 chars)" };
  if (!email || email.length > 200) return { ok: false, error: "Email is required (max 200 chars)" };
  if (!message || message.length > 10000) return { ok: false, error: "Message is required (max 10000 chars)" };
  const service = typeof o.service === "string" ? o.service.trim().slice(0, 200) : undefined;
  const budget = typeof o.budget === "string" ? o.budget.trim().slice(0, 200) : undefined;
  return { ok: true, data: { name, email, message, service, budget } };
}

async function sendResendEmail(params: {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  apiKey: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`,
    },
    body: JSON.stringify({
      from: "Hipkiss Digital <onboarding@resend.dev>",
      to: [params.to],
      reply_to: params.replyTo,
      subject: params.subject,
      html: params.html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: `Resend error: ${res.status} ${err}` };
  }
  return { ok: true };
}

export async function POST(request: Request) {
  try {
    const ctx = getCloudflareContext();
    const env = ctx.env as CloudflareEnv;
    const db = env.DB;
    const contactEmail = env.CONTACT_EMAIL ?? process.env.CONTACT_EMAIL ?? "";
    const resendKey = env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;

    const raw = await request.json();
    const validated = validateBody(raw);
    if (!validated.ok) {
      return Response.json({ error: validated.error }, { status: 400 });
    }
    const { name, email, message, service, budget } = validated.data;

    await db
      .prepare(
        "INSERT INTO enquiries (name, email, service, budget, message) VALUES (?, ?, ?, ?, ?)"
      )
      .bind(name, email, service ?? null, budget ?? null, message)
      .run();

    if (resendKey && contactEmail) {
      const subject = `Enquiry from ${name} – Hipkiss Digital`;
      const html = `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
        ${budget ? `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <pre>${escapeHtml(message)}</pre>
      `;
      const emailResult = await sendResendEmail({
        to: contactEmail,
        replyTo: email,
        subject,
        html,
        apiKey: resendKey,
      });
      if (!emailResult.ok) {
        console.error("Resend failed:", emailResult.error);
      }
    }

    return Response.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
