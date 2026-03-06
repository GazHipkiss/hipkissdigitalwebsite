-- Add optional live project URL to work_items (for external portfolio links).
-- Run on existing DB: npx wrangler d1 execute hipkiss-digital-db --remote --file=./lib/db/migrations/001_add_project_url.sql
ALTER TABLE work_items ADD COLUMN project_url TEXT;
