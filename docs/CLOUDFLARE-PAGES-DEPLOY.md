# Deploying to Cloudflare Pages (static export)

This project uses **Next.js static export** (`output: 'export'`). The site is built to plain HTML/CSS/JS—no Worker, no edge runtime—so it runs reliably on Cloudflare Pages without white screens or compatibility flags.

## Cloudflare Pages build settings

In your Pages project (**Workers & Pages** → your project → **Settings** → **Builds & deployments**):

| Setting | Value |
|--------|--------|
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | (leave blank unless your app is in a subfolder) |

Do **not** use `npx @cloudflare/next-on-pages@1` anymore. Remove it and use the values above.

## After saving

1. Trigger a new deployment (push a commit or **Retry deployment**).
2. Cloudflare will run `npm run build`, then publish the contents of the `out` folder as a static site.

No wrangler, no Node compatibility flags, no Workers—just static files. Your custom domain will serve the site as before.
