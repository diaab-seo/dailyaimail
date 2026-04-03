globalThis.process ??= {};
globalThis.process.env ??= {};
import { env } from "cloudflare:workers";
import { g as getSession } from "./auth_DBUpFZ-m.mjs";
import { c as createComment } from "./db_DccF6XuO.mjs";
const prerender = false;
const POST = async ({ request, cookies }) => {
  const db = env.DB;
  const kv = env.SESSION;
  const form = await request.formData();
  const articleSlug = (form.get("articleSlug") ?? "").trim();
  const body = (form.get("body") ?? "").trim();
  const user = await getSession(kv, cookies);
  if (!user) {
    const returnTo = articleSlug ? `/news/${articleSlug}` : "/";
    return new Response(null, {
      status: 302,
      headers: { Location: `/auth/login?from=${encodeURIComponent(returnTo)}` }
    });
  }
  const ip = request.headers.get("CF-Connecting-IP") ?? void 0;
  if (!articleSlug || !body) return new Response(null, { status: 400 });
  if (body.length > 2e3) {
    return new Response(null, { status: 302, headers: { Location: `/news/${articleSlug}?err=toolong#comments` } });
  }
  await createComment(db, { article_slug: articleSlug, user_id: user.id, body, ip_address: ip });
  return new Response(null, { status: 302, headers: { Location: `/news/${articleSlug}?commented=1#comments` } });
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
