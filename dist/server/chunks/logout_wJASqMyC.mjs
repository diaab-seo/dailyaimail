globalThis.process ??= {};
globalThis.process.env ??= {};
import { env } from "cloudflare:workers";
import { d as destroySession } from "./auth_DBUpFZ-m.mjs";
const prerender = false;
const POST = async ({ cookies }) => {
  const kv = env.SESSION;
  await destroySession(kv, cookies);
  return new Response(null, { status: 302, headers: { Location: "/" } });
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
