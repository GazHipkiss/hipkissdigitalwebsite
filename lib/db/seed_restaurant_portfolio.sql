-- Optional: add the Restaurant portfolio piece so it appears on the Work page.
-- Run migration first if needed: npx wrangler d1 execute hipkiss-digital-db --remote --file=./lib/db/migrations/001_add_project_url.sql
-- Then run: npx wrangler d1 execute hipkiss-digital-db --remote --file=./lib/db/seed_restaurant_portfolio.sql
INSERT OR IGNORE INTO work_items (title, slug, description, tags, cover_image, gallery_images, published, project_url, created_at, updated_at)
VALUES (
  'Restaurant portfolio',
  'restaurant-portfolio',
  'A responsive restaurant portfolio and menu site built with Nuxt, showcasing layout and UX for a food business. Deployed on Vercel.',
  '["Nuxt", "Vue", "Vercel", "Portfolio"]',
  NULL,
  '[]',
  1,
  'https://portfolio-restaurant-nu.vercel.app/',
  datetime('now'),
  datetime('now')
);
