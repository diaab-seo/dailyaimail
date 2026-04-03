globalThis.process ??= {};
globalThis.process.env ??= {};
import { env } from "cloudflare:workers";
import { c as createSession } from "./auth_DBUpFZ-m.mjs";
import { b as getUserByEmail, e as getUserByUsername, m as makeInitials, h as createUser, i as getUserById, u as updateLastLogin } from "./db_DccF6XuO.mjs";
import { h as hashPassword } from "./password_2Yxh1Nin.mjs";
const prerender = false;
const CLIENT_ID = "211980990853-n9806238qr51qtn69h914ed1nbv5a8m0.apps.googleusercontent.com";
function getSafeRedirectPath(value) {
  if (typeof value !== "string" || !value.startsWith("/")) return "/";
  if (value.startsWith("//")) return "/";
  return value;
}
const POST = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const credential = formData.get("credential");
    const requestUrl = new URL(request.url);
    const returnTo = getSafeRedirectPath(
      formData.get("state") ?? requestUrl.searchParams.get("from")
    );
    if (!credential || typeof credential !== "string") {
      return new Response("Missing Google token credential", { status: 400 });
    }
    const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    if (!res.ok) {
      return new Response("Invalid Google token", { status: 401 });
    }
    const payload = await res.json();
    if (payload.aud !== CLIENT_ID) {
      return new Response("Token audience mismatch", { status: 401 });
    }
    const email = payload.email.toLowerCase();
    const name = payload.name || email.split("@")[0];
    const emailVerified = payload.email_verified === "true" || payload.email_verified === true;
    if (!emailVerified) {
      return new Response("Email not verified by Google", { status: 400 });
    }
    const db = env.DB;
    const kv = env.SESSION;
    let dbUser = await getUserByEmail(db, email);
    if (!dbUser) {
      const randomPass = crypto.randomUUID();
      const { hash, salt } = await hashPassword(randomPass);
      let baseUsername = email.split("@")[0].replace(/[^a-z0-9]/gi, "").toLowerCase();
      let username = baseUsername;
      let suffix = 1;
      while (await getUserByUsername(db, username)) {
        username = `${baseUsername}${suffix}`;
        suffix++;
      }
      const initials = makeInitials(name);
      const newId = await createUser(db, {
        email,
        username,
        password_hash: hash,
        password_salt: salt,
        display_name: name,
        avatar_initials: initials
      });
      dbUser = await getUserById(db, newId);
    }
    if (!dbUser) {
      return new Response("Failed to create user", { status: 500 });
    }
    const sessionUser = {
      id: dbUser.id,
      email: dbUser.email,
      username: dbUser.username,
      displayName: dbUser.display_name,
      avatarInitials: dbUser.avatar_initials,
      role: dbUser.role
    };
    const ip = request.headers.get("CF-Connecting-IP") ?? void 0;
    const ua = request.headers.get("User-Agent") ?? void 0;
    await createSession(kv, cookies, sessionUser, { ip, ua });
    await updateLastLogin(db, sessionUser.id);
    return redirect(returnTo);
  } catch (e) {
    return new Response("Internal Server Error: " + e.message, { status: 500 });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
