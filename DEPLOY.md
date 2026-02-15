# Hipkiss Digital – Deployment (Cloudflare)

This app uses **Next.js App Router** with **OpenNext for Cloudflare**. APIs and admin run on the edge; static export is disabled.

## Prerequisites

- Node 18+
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) 3.99+ (e.g. `npm i -D wrangler`)
- [@opennextjs/cloudflare](https://www.npmjs.com/package/@opennextjs/cloudflare) (already in package.json)

## 1. D1 database

Create the database and apply the schema:

```bash
npx wrangler d1 create hipkiss-digital-db
```

Copy the `database_id` from the output into `wrangler.toml` under `[[d1_databases]]` → `database_id`.

Then run the schema:

```bash
npx wrangler d1 execute hipkiss-digital-db --remote --file=./lib/db/schema.sql
```

## 2. R2 bucket (optional, for uploads)

Create the bucket (or in Cloudflare dashboard):

```bash
npx wrangler r2 bucket create hipkiss-uploads
```

The binding `BUCKET` is already in `wrangler.toml`. If you skip R2, admin image upload will fail unless you use external image URLs.

## 3. Secrets / environment

Set these in the Cloudflare dashboard (Workers & Pages → your project → Settings → Variables) or via Wrangler:

- `RESEND_API_KEY` – Resend API key (contact form emails)
- `CONTACT_EMAIL` – Where contact form submissions are sent
- `ADMIN_PASSWORD` – Password for `/admin` login

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_EMAIL
npx wrangler secret put ADMIN_PASSWORD
```

For local preview with real bindings, use [.dev.vars](https://developers.cloudflare.com/workers/development-testing/local-development/#local-only-environment-variables).

## 4. Build and deploy

Recommended scripts (add to `package.json` if missing):

- `"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview"`
- `"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"`
- `"cf-typegen": "wrangler types --env-interface CloudflareEnv"`

Then:

```bash
npm run deploy
```

Or connect a Git repository to Cloudflare Pages and use the OpenNext build command in the dashboard.

## 5. Resend sender

The contact API sends from `Hipkiss Digital <onboarding@resend.dev>`. To use your own domain, configure the domain in Resend and update the `from` field in `app/api/contact/route.ts`.

## Summary

| Step | Action |
|------|--------|
| D1 | `wrangler d1 create` → set `database_id` in wrangler.toml → `wrangler d1 execute ... --file=./lib/db/schema.sql` |
| R2 | `wrangler r2 bucket create hipkiss-uploads` (optional) |
| Secrets | Set `RESEND_API_KEY`, `CONTACT_EMAIL`, `ADMIN_PASSWORD` |
| Deploy | `opennextjs-cloudflare build && opennextjs-cloudflare deploy` |
