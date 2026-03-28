globalThis.process ??= {};
globalThis.process.env ??= {};
async function getUserByEmail(db, email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
}
async function getUserByUsername(db, username) {
  return db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();
}
async function createUser(db, data) {
  const result = await db.prepare(
    `INSERT INTO users (email, username, password_hash, password_salt, display_name, avatar_initials)
     VALUES (?, ?, ?, ?, ?, ?) RETURNING id`
  ).bind(data.email, data.username, data.password_hash, data.password_salt, data.display_name, data.avatar_initials).first();
  return result.id;
}
async function updateLastLogin(db, userId) {
  await db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").bind(userId).run();
}
async function getApprovedComments(db, articleSlug) {
  const result = await db.prepare(
    `SELECT c.*, u.display_name, u.username, u.avatar_initials
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.article_slug = ? AND c.status = 'approved'
     ORDER BY c.created_at ASC`
  ).bind(articleSlug).all();
  return result.results;
}
async function getAllCommentsForAdmin(db) {
  const result = await db.prepare(
    `SELECT c.*, u.display_name, u.username, u.avatar_initials
     FROM comments c
     JOIN users u ON c.user_id = u.id
     ORDER BY c.created_at DESC LIMIT 200`
  ).all();
  return result.results;
}
async function createComment(db, data) {
  const result = await db.prepare(
    `INSERT INTO comments (article_slug, user_id, body, ip_address)
     VALUES (?, ?, ?, ?) RETURNING id`
  ).bind(data.article_slug, data.user_id, data.body, data.ip_address ?? null).first();
  return result.id;
}
async function approveComment(db, commentId, adminId) {
  await db.prepare(
    `UPDATE comments SET status = 'approved', approved_at = datetime('now'), approved_by = ?
     WHERE id = ?`
  ).bind(adminId, commentId).run();
}
async function rejectComment(db, commentId, adminId) {
  await db.prepare(
    `UPDATE comments SET status = 'rejected', approved_by = ?  WHERE id = ?`
  ).bind(adminId, commentId).run();
}
async function deleteComment(db, commentId) {
  await db.prepare("DELETE FROM comments WHERE id = ?").bind(commentId).run();
}
function makeInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
export {
  approveComment as a,
  getApprovedComments as b,
  createComment as c,
  deleteComment as d,
  getUserByEmail as e,
  formatDate as f,
  getAllCommentsForAdmin as g,
  getUserByUsername as h,
  createUser as i,
  makeInitials as m,
  rejectComment as r,
  updateLastLogin as u
};
