# Setting nodejs_compat on Cloudflare Pages

## Why you need this

Your Next.js app needs the `nodejs_compat` compatibility flag so it can use Node.js APIs on Cloudflare’s edge. Without it you get errors like “no nodejs_compat compatibility flag set” or 503s.

## Option 1: Use the wrangler.toml in this repo (recommended)

This repo already has a **`wrangler.toml`** in the project root with:

- `compatibility_flags = ["nodejs_compat"]`
- `compatibility_date = "2024-09-23"`

When Cloudflare builds from Git, it can pick up this file. Make sure:

1. **Latest code is pushed** (so `wrangler.toml` is in the commit that’s built).
2. **Trigger a new deployment** (e.g. push a commit or use “Retry deployment” in the dashboard).
3. Your project uses a **build setup that looks at the repo root** (so it sees `wrangler.toml`).

If your project is set to use a Wrangler config file, the dashboard may **hide** the Compatibility Flags UI for that project; the file is then the source of truth.

---

## Option 2: Set the flag in the Cloudflare dashboard

The UI location can vary. Try this path first:

1. Go to **https://dash.cloudflare.com**
2. In the left sidebar, open **Workers & Pages**
3. Click your **Pages** project (e.g. `hipkissdigitalwebsite`)
4. Open **Settings**
5. In the left submenu under your project, look for **Functions**
6. On the Functions page, find the **Compatibility Flags** (or **Compatibility**) section
7. For **Production** and **Preview**, add: `nodejs_compat` (one word, no quotes)
8. Click **Save**
9. **Redeploy** the project (Deployments → … on latest → Retry deployment, or push a new commit)

### If you don’t see “Functions” or “Compatibility Flags”

- Some **Next.js** Pages projects don’t show the Compatibility Flags section at all. In that case you **must** use **Option 1** (wrangler.toml).
- Check under **Settings** for anything named **Compatibility**, **Compatibility date**, or **Compatibility flags**.
- Make sure you’re in **Settings** for the **Pages** project, not a different product (e.g. not only “Workers”).

---

## After changing anything

Always **trigger a new deployment** (retry or push a new commit) so the new compatibility settings are applied. Old deployments keep their previous config.
