globalThis.process ??= {};
globalThis.process.env ??= {};
import { env } from "cloudflare:workers";
import { g as getSession, r as requireAdmin } from "./auth_DBUpFZ-m.mjs";
import { a as approveComment, r as rejectComment, d as deleteComment } from "./db_B2V00Vzv.mjs";
const prerender = false;
const POST = async ({ request, cookies }) => {
  const db = env.DB;
  const kv = env.SESSION;
  const user = await getSession(kv, cookies);
  const denied = requireAdmin(user);
  if (denied) return denied;
  const form = await request.formData();
  const action = form.get("action");
  const commentId = parseInt(form.get("commentId"));
  if (!action || isNaN(commentId)) return new Response(null, { status: 400 });
  if (action === "approve") await approveComment(db, commentId, user.id);
  if (action === "reject") await rejectComment(db, commentId, user.id);
  if (action === "delete") await deleteComment(db, commentId);
  return new Response(null, { status: 302, headers: { Location: "/admin/comments" } });
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
