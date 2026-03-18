-- Daily AI Mail — D1 Database Schema
-- Run: npm run db:init          (local dev)
-- Run: npm run db:init:prod     (production)

-- ── Users ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT    NOT NULL UNIQUE,
  username    TEXT    NOT NULL UNIQUE,
  password_hash TEXT  NOT NULL,
  password_salt TEXT  NOT NULL,
  display_name  TEXT  NOT NULL,
  avatar_initials TEXT NOT NULL,  -- e.g. "MD" — derived from display_name at reg
  role        TEXT    NOT NULL DEFAULT 'reader',  -- 'reader' | 'admin'
  is_verified INTEGER NOT NULL DEFAULT 0,         -- email verified flag
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  last_login  TEXT
);

-- ── Sessions ──────────────────────────────────────────────────────────────────
-- Sessions are stored in KV with TTL, but we log them here for revocation
CREATE TABLE IF NOT EXISTS sessions (
  token       TEXT PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  expires_at  TEXT    NOT NULL,
  ip_address  TEXT,
  user_agent  TEXT
);

-- ── Comments ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  article_slug  TEXT    NOT NULL,   -- matches article slug, e.g. "claude-4-changes-everything"
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body          TEXT    NOT NULL,   -- raw text, max 2000 chars
  status        TEXT    NOT NULL DEFAULT 'pending',  -- 'pending' | 'approved' | 'rejected'
  -- Schema.org fragment — used as @id in JSON-LD: /articles/{slug}#comment-{id}
  parent_id     INTEGER REFERENCES comments(id) ON DELETE SET NULL,  -- for replies (future)
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  approved_at   TEXT,
  approved_by   INTEGER REFERENCES users(id),  -- admin user id
  ip_address    TEXT,
  edited_at     TEXT
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_comments_article  ON comments(article_slug, status);
CREATE INDEX IF NOT EXISTS idx_comments_user     ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user     ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires  ON sessions(expires_at);