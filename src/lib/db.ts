/**
 * src/lib/db.ts
 * Typed D1 query helpers.
 */

export type DBUser = {
    id: number;
    email: string;
    username: string;
    password_hash: string;
    password_salt: string;
    display_name: string;
    avatar_initials: string;
    role: 'reader' | 'admin';
    is_verified: number;
    created_at: string;
    last_login: string | null;
};

export type DBComment = {
    id: number;
    article_slug: string;
    user_id: number;
    body: string;
    status: 'pending' | 'approved' | 'rejected';
    parent_id: number | null;
    created_at: string;
    approved_at: string | null;
    approved_by: number | null;
    ip_address: string | null;
    edited_at: string | null;
    // JOINed fields
    display_name?: string;
    username?: string;
    avatar_initials?: string;
};

// ── Users ──────────────────────────────────────────────────────────────────────

export async function getUserByEmail(db: D1Database, email: string): Promise<DBUser | null> {
    return db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<DBUser>();
}

export async function getUserByUsername(db: D1Database, username: string): Promise<DBUser | null> {
    return db.prepare('SELECT * FROM users WHERE username = ?').bind(username).first<DBUser>();
}

export async function getUserById(db: D1Database, id: number): Promise<DBUser | null> {
    return db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<DBUser>();
}

export async function createUser(db: D1Database, data: {
    email: string; username: string; password_hash: string; password_salt: string;
    display_name: string; avatar_initials: string;
}): Promise<number> {
    const result = await db.prepare(
        `INSERT INTO users (email, username, password_hash, password_salt, display_name, avatar_initials)
     VALUES (?, ?, ?, ?, ?, ?) RETURNING id`
    ).bind(data.email, data.username, data.password_hash, data.password_salt, data.display_name, data.avatar_initials)
        .first<{ id: number }>();
    return result!.id;
}

export async function updateLastLogin(db: D1Database, userId: number): Promise<void> {
    await db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").bind(userId).run();
}

// ── Comments ───────────────────────────────────────────────────────────────────

export async function getApprovedComments(db: D1Database, articleSlug: string): Promise<DBComment[]> {
    const result = await db.prepare(
        `SELECT c.*, u.display_name, u.username, u.avatar_initials
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.article_slug = ? AND c.status = 'approved'
     ORDER BY c.created_at ASC`
    ).bind(articleSlug).all<DBComment>();
    return result.results;
}

export async function getPendingComments(db: D1Database): Promise<DBComment[]> {
    const result = await db.prepare(
        `SELECT c.*, u.display_name, u.username, u.avatar_initials
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.status = 'pending'
     ORDER BY c.created_at DESC`
    ).all<DBComment>();
    return result.results;
}

export async function getAllCommentsForAdmin(db: D1Database): Promise<DBComment[]> {
    const result = await db.prepare(
        `SELECT c.*, u.display_name, u.username, u.avatar_initials
     FROM comments c
     JOIN users u ON c.user_id = u.id
     ORDER BY c.created_at DESC LIMIT 200`
    ).all<DBComment>();
    return result.results;
}

export async function createComment(db: D1Database, data: {
    article_slug: string; user_id: number; body: string; ip_address?: string;
}): Promise<number> {
    const result = await db.prepare(
        `INSERT INTO comments (article_slug, user_id, body, ip_address)
     VALUES (?, ?, ?, ?) RETURNING id`
    ).bind(data.article_slug, data.user_id, data.body, data.ip_address ?? null)
        .first<{ id: number }>();
    return result!.id;
}

export async function approveComment(db: D1Database, commentId: number, adminId: number): Promise<void> {
    await db.prepare(
        `UPDATE comments SET status = 'approved', approved_at = datetime('now'), approved_by = ?
     WHERE id = ?`
    ).bind(adminId, commentId).run();
}

export async function rejectComment(db: D1Database, commentId: number, adminId: number): Promise<void> {
    await db.prepare(
        `UPDATE comments SET status = 'rejected', approved_by = ?  WHERE id = ?`
    ).bind(adminId, commentId).run();
}

export async function deleteComment(db: D1Database, commentId: number): Promise<void> {
    await db.prepare('DELETE FROM comments WHERE id = ?').bind(commentId).run();
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Derive 2-letter initials from a display name */
export function makeInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Format a stored ISO datetime for display */
export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}