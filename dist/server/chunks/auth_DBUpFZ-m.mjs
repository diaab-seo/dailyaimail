globalThis.process ??= {};
globalThis.process.env ??= {};
const SESSION_COOKIE = "dai_session";
const SESSION_TTL_SEC = 60 * 60 * 24 * 30;
function generateToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function createSession(kv, cookies, user, meta = {}) {
  const token = generateToken();
  const payload = JSON.stringify({ user, ip: meta.ip, ua: meta.ua, created: Date.now() });
  await kv.put(`session:${token}`, payload, { expirationTtl: SESSION_TTL_SEC });
  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: SESSION_TTL_SEC,
    path: "/"
  });
  return token;
}
async function getSession(kv, cookies) {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const raw = await kv.get(`session:${token}`);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    return data.user;
  } catch {
    return null;
  }
}
async function destroySession(kv, cookies) {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (token) await kv.delete(`session:${token}`);
  cookies.delete(SESSION_COOKIE, { path: "/" });
}
function requireAdmin(user) {
  if (!user || user.role !== "admin") {
    return new Response(null, { status: 302, headers: { Location: "/" } });
  }
  return null;
}
export {
  createSession as c,
  destroySession as d,
  getSession as g,
  requireAdmin as r
};
