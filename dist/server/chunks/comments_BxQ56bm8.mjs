globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DcIrlnxg.mjs";
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from "./worker-entry_r5E4GpWC.mjs";
import { env } from "cloudflare:workers";
import { $ as $$Layout } from "./Layout_zrDdJ61s.mjs";
import { g as getSession, r as requireAdmin } from "./auth_DBUpFZ-m.mjs";
import { g as getAllCommentsForAdmin, f as formatDate } from "./db_DccF6XuO.mjs";
const prerender = false;
const $$Comments = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Comments;
  const db = env.DB;
  const kv = env.SESSION;
  const user = await getSession(kv, Astro2.cookies);
  const denied = requireAdmin(user);
  if (denied) return denied;
  const comments = await getAllCommentsForAdmin(db);
  const pending = comments.filter((c) => c.status === "pending");
  const published = comments.filter((c) => c.status === "approved");
  const trashed = comments.filter((c) => c.status === "rejected");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Comment Moderation - Daily AI Mail", "metaTitle": "Comment Moderation", "data-astro-cid-3j3cdvlv": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-wrap" data-astro-cid-3j3cdvlv> <header class="admin-header" data-astro-cid-3j3cdvlv> <h1 class="admin-title" data-astro-cid-3j3cdvlv>Comment Moderation</h1> <div class="admin-stats" data-astro-cid-3j3cdvlv> <span class="stat stat--pending" data-astro-cid-3j3cdvlv>${pending.length} Pending</span> <span class="stat stat--approved" data-astro-cid-3j3cdvlv>${published.length} Published</span> <span class="stat stat--trashed" data-astro-cid-3j3cdvlv>${trashed.length} Trashed</span> </div> </header> ${pending.length > 0 ? renderTemplate`<section class="admin-section" data-astro-cid-3j3cdvlv> <h2 class="admin-section-title" data-astro-cid-3j3cdvlv>Pending Review</h2> <div class="comment-queue" data-astro-cid-3j3cdvlv> ${pending.map((c) => renderTemplate`<div class="admin-comment admin-comment--pending" data-astro-cid-3j3cdvlv> <div class="ac-meta" data-astro-cid-3j3cdvlv> <strong data-astro-cid-3j3cdvlv>${c.display_name}</strong> <span class="ac-sep" data-astro-cid-3j3cdvlv>�</span> <a${addAttribute(`/news/${c.article_slug}`, "href")} class="ac-article" data-astro-cid-3j3cdvlv> ${c.article_slug} </a> <span class="ac-sep" data-astro-cid-3j3cdvlv>�</span> <time data-astro-cid-3j3cdvlv>${formatDate(c.created_at)}</time> </div> <p class="ac-body" data-astro-cid-3j3cdvlv>${c.body}</p> <div class="ac-actions" data-astro-cid-3j3cdvlv> <form method="POST" action="/api/comments/moderate" style="display:inline;" data-astro-cid-3j3cdvlv> <input type="hidden" name="commentId"${addAttribute(c.id, "value")} data-astro-cid-3j3cdvlv> <input type="hidden" name="action" value="approve" data-astro-cid-3j3cdvlv> <button type="submit" class="ac-btn ac-btn--approve" data-astro-cid-3j3cdvlv>Publish</button> </form> <form method="POST" action="/api/comments/moderate" style="display:inline;" data-astro-cid-3j3cdvlv> <input type="hidden" name="commentId"${addAttribute(c.id, "value")} data-astro-cid-3j3cdvlv> <input type="hidden" name="action" value="trash" data-astro-cid-3j3cdvlv> <button type="submit" class="ac-btn ac-btn--reject" data-astro-cid-3j3cdvlv>Trash</button> </form> </div> </div>`)} </div> </section>` : renderTemplate`<div class="admin-empty" data-astro-cid-3j3cdvlv> <p data-astro-cid-3j3cdvlv>No comments pending review. All caught up.</p> </div>`} ${published.length > 0 && renderTemplate`<section class="admin-section" data-astro-cid-3j3cdvlv> <h2 class="admin-section-title" data-astro-cid-3j3cdvlv>Published (${published.length})</h2> <div class="comment-queue" data-astro-cid-3j3cdvlv> ${published.map((c) => renderTemplate`<div class="admin-comment admin-comment--approved" data-astro-cid-3j3cdvlv> <div class="ac-meta" data-astro-cid-3j3cdvlv> <strong data-astro-cid-3j3cdvlv>${c.display_name}</strong> <span class="ac-sep" data-astro-cid-3j3cdvlv>�</span> <a${addAttribute(`/news/${c.article_slug}#comment-${c.id}`, "href")} class="ac-article" data-astro-cid-3j3cdvlv> ${c.article_slug} </a> <span class="ac-sep" data-astro-cid-3j3cdvlv>�</span> <time data-astro-cid-3j3cdvlv>${formatDate(c.created_at)}</time> </div> <p class="ac-body" data-astro-cid-3j3cdvlv>${c.body}</p> <div class="ac-actions" data-astro-cid-3j3cdvlv> <form method="POST" action="/api/comments/moderate" style="display:inline;" data-astro-cid-3j3cdvlv> <input type="hidden" name="commentId"${addAttribute(c.id, "value")} data-astro-cid-3j3cdvlv> <input type="hidden" name="action" value="trash" data-astro-cid-3j3cdvlv> <button type="submit" class="ac-btn ac-btn--reject" data-astro-cid-3j3cdvlv>Trash</button> </form> </div> </div>`)} </div> </section>`} ${trashed.length > 0 && renderTemplate`<section class="admin-section" data-astro-cid-3j3cdvlv> <h2 class="admin-section-title" data-astro-cid-3j3cdvlv>Trashed (${trashed.length})</h2> <div class="comment-queue" data-astro-cid-3j3cdvlv> ${trashed.map((c) => renderTemplate`<div class="admin-comment admin-comment--trashed" data-astro-cid-3j3cdvlv> <div class="ac-meta" data-astro-cid-3j3cdvlv> <strong data-astro-cid-3j3cdvlv>${c.display_name}</strong> <span class="ac-sep" data-astro-cid-3j3cdvlv>�</span> <a${addAttribute(`/news/${c.article_slug}`, "href")} class="ac-article" data-astro-cid-3j3cdvlv> ${c.article_slug} </a> <span class="ac-sep" data-astro-cid-3j3cdvlv>�</span> <time data-astro-cid-3j3cdvlv>${formatDate(c.created_at)}</time> </div> <p class="ac-body" data-astro-cid-3j3cdvlv>${c.body}</p> <div class="ac-actions" data-astro-cid-3j3cdvlv> <form method="POST" action="/api/comments/moderate" style="display:inline;" data-astro-cid-3j3cdvlv> <input type="hidden" name="commentId"${addAttribute(c.id, "value")} data-astro-cid-3j3cdvlv> <input type="hidden" name="action" value="approve" data-astro-cid-3j3cdvlv> <button type="submit" class="ac-btn ac-btn--approve" data-astro-cid-3j3cdvlv>Publish</button> </form> <form method="POST" action="/api/comments/moderate" style="display:inline;" data-astro-cid-3j3cdvlv> <input type="hidden" name="commentId"${addAttribute(c.id, "value")} data-astro-cid-3j3cdvlv> <input type="hidden" name="action" value="delete" data-astro-cid-3j3cdvlv> <button type="submit" class="ac-btn ac-btn--delete" data-astro-cid-3j3cdvlv>Delete Permanently</button> </form> </div> </div>`)} </div> </section>`} </div> ` })}`;
}, "D:/AI News/dailyaimail/src/pages/admin/comments.astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/admin/comments.astro";
const $$url = "/admin/comments.html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Comments,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
