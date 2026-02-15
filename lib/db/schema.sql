-- Hipkiss Digital CMS – D1 schema
-- Run with: npx wrangler d1 execute hipkiss-digital-db --remote --file=./lib/db/schema.sql

CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS work_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  cover_image TEXT,
  gallery_images TEXT NOT NULL DEFAULT '[]',
  published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  avatar TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO site_settings (key, value) VALUES
  ('contactEmail', ''),
  ('heroText', 'Websites and apps that work for your business.'),
  ('socialLinks', '{}');

CREATE INDEX IF NOT EXISTS idx_work_slug ON work_items(slug);
CREATE INDEX IF NOT EXISTS idx_work_published ON work_items(published);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at);
