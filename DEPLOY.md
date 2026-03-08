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

**Existing DBs:** If you created the DB before `project_url` was added, run the migration:

```bash
npx wrangler d1 execute hipkiss-digital-db --remote --file=./lib/db/migrations/001_add_project_url.sql
```

Optional: to add the Restaurant portfolio work item, run `lib/db/seed_restaurant_portfolio.sql` (after the migration).

## 2. R2 bucket (optional, for uploads)

Create the bucket (or in Cloudflare dashboard):

```bash
npx wrangler r2 bucket create hipkiss-uploads
```

The binding `BUCKET` is already in `wrangler.toml`. If you skip R2, admin image upload will fail unless you use external image URLs.

## 3. Secrets / environment

Set these as **runtime** variables. In the dashboard there are two places:
- **Build** → Variables and secrets: used only **during** the build. Not available when the site handles requests.
- **Settings** → Variables and Secrets (main Worker settings): used **at runtime** when users hit the site.

The contact form needs `RESEND_API_KEY` at **runtime**. Add it under **Settings** → **Variables and Secrets** (the section that says "used at runtime"). If you only added it under Build, add it again under Settings → Variables and Secrets, then **Redeploy**.

- `RESEND_API_KEY` – Resend API key (contact form emails). If missing, the form still saves to D1 but no email is sent and Resend will show nothing.
- `CONTACT_EMAIL` – Where contact form submissions are sent (default: support@hipkissdigital.com if unset)
- `ADMIN_PASSWORD` – Password for `/admin` login

If the form says “Email notification could not be sent”, check Worker logs for `RESEND_API_KEY not set`. Try adding RESEND_API_KEY as **Plain text** (not Secret), or set deploy to `npx opennextjs-cloudflare deploy -- --keep-vars`. Redeploy.

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_EMAIL
npx wrangler secret put ADMIN_PASSWORD
```

For local preview with real bindings, use [.dev.vars](https://developers.cloudflare.com/workers/development-testing/local-development/#local-only-environment-variables).

### Contact form email via Formspree (no Worker secrets)

To get contact form emails working without relying on Worker runtime secrets (e.g. if `RESEND_API_KEY` never reaches the Worker):

1. Sign up at [formspree.io](https://formspree.io) and create a new form.
2. Set the form’s email to **support@hipkissdigital.com** (or your preferred address) in the Formspree dashboard.
3. Copy the form ID from the form endpoint (e.g. `https://formspree.io/f/abcxyz` → the ID is `abcxyz`).
4. In Cloudflare: Worker → **Settings** → **Build** → **Variables and secrets** (build-time). Add:
   - **Variable name:** `NEXT_PUBLIC_FORMSPREE_FORM_ID`
   - **Value:** your Formspree form ID (e.g. `abcxyz`)
   - Type: **Plain text** (build-time vars are inlined into the client bundle).
5. Save and trigger a new deployment.

The contact form will still save submissions to D1 via `/api/contact` and will also POST to Formspree from the browser, so you receive the email. No yellow warning; no runtime secret required.

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

The Worker name in the dashboard must match the `name` in your `wrangler.toml`. If you created the Worker as `hipkissdigitalwebsite1`, set `name = "hipkissdigitalwebsite1"` in wrangler.toml so deploys and secrets apply to the same Worker.

**If "Latest build failed":**

1. Open **Deployments**, click the failed deployment, and read the **build log**.
2. **Wrong build command:** Build must be `npx opennextjs-cloudflare build` and deploy must be `npx opennextjs-cloudflare deploy`. If you used `npm run build`, the deploy will fail (no `.open-next/worker.js`).
3. **Node version:** Ensure the build environment uses Node 18+ (e.g. set in Build → Environment or use `engines` in package.json).
4. Re-run the deployment after fixing the command or env.

## 5. Resend sender

The contact API sends from `Hipkiss Digital <onboarding@resend.dev>`. To use your own domain, configure the domain in Resend and update the `from` field in `app/api/contact/route.ts`.

## Summary

| Step | Action |
|------|--------|
| D1 | `wrangler d1 create` → set `database_id` in wrangler.toml → `wrangler d1 execute ... --file=./lib/db/schema.sql` |
| R2 | `wrangler r2 bucket create hipkiss-uploads` (optional) |
| Secrets | Set `RESEND_API_KEY`, `CONTACT_EMAIL`, `ADMIN_PASSWORD` |
| Deploy | `opennextjs-cloudflare build && opennextjs-cloudflare deploy` |
