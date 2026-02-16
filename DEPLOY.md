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

### Deploy from your machine

```bash
npm run deploy:cf
```

(or `npm run deploy` – see package.json)

### Deploy from Git (Cloudflare dashboard)

This app is a **full‑stack Next.js** app (APIs, admin, D1). Deploy it as a **Worker**, not as a static **Pages** site.

- **Use Workers, not Pages.** If you created a **Pages** project, the build settings often show a locked “Build output directory” (e.g. `.vercel/output/static`). That preset is for static or Vercel-style builds. OpenNext does **not** use that; it builds into `.open-next` and deploys a Worker. So you need a **Worker** connected to Git, not a Pages project.

**Steps:**

1. In [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages), choose **Create application** → **Worker** (or connect an existing Worker to your repo).
2. Connect your GitHub/GitLab repo to that **Worker** (not to a Pages project).
3. In the Worker’s **Settings → Build**:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx opennextjs-cloudflare deploy`
   - Leave **Root directory** blank unless the app lives in a subfolder.
   - **Do not set** a “Build output directory” – Workers + OpenNext don’t use that; the deploy command uploads the built Worker from `.open-next`.
4. Add **Build variables / secrets** if the build needs env vars (e.g. for `next build`). Add **Settings → Variables and secrets** for runtime (e.g. `RESEND_API_KEY`, `CONTACT_EMAIL`, `ADMIN_PASSWORD`). D1/R2 are configured in `wrangler.toml` (bindings).

The Worker name in the dashboard must match the `name` in your `wrangler.toml` (e.g. `hipkissdigitalwebsite`).

## 5. Resend sender

The contact API sends from `Hipkiss Digital <onboarding@resend.dev>`. To use your own domain, configure the domain in Resend and update the `from` field in `app/api/contact/route.ts`.

## Summary

| Step | Action |
|------|--------|
| D1 | `wrangler d1 create` → set `database_id` in wrangler.toml → `wrangler d1 execute ... --file=./lib/db/schema.sql` |
| R2 | `wrangler r2 bucket create hipkiss-uploads` (optional) |
| Secrets | Set `RESEND_API_KEY`, `CONTACT_EMAIL`, `ADMIN_PASSWORD` |
| Deploy | `opennextjs-cloudflare build && opennextjs-cloudflare deploy` |
