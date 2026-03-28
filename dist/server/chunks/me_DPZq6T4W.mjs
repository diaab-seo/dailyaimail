globalThis.process ??= {};
globalThis.process.env ??= {};
import { env } from "cloudflare:workers";
import { g as getSession } from "./auth_DBUpFZ-m.mjs";
const prerender = false;
const GET = async ({ cookies }) => {
  const kv = env.SESSION;
  if (!kv) {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  }
  const user = await getSession(kv, cookies);
  return new Response(JSON.stringify({ user: user ?? null }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Private so CDN won't share sessions between users.
      // max-age=10 means logout reflects within ~10 seconds on next navigation.
      "Cache-Control": "private, max-age=10"
    }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
