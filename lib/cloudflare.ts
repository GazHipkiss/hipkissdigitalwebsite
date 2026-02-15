/**
 * Cloudflare bindings for OpenNext.
 * Use getCloudflareContext().env in API routes and server components.
 * Define D1 and R2 in wrangler.jsonc; run `npx wrangler types --env-interface CloudflareEnv` to generate types.
 */
export type CloudflareEnv = {
  DB: D1Database;
  BUCKET?: R2Bucket;
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  ADMIN_PASSWORD?: string;
};
