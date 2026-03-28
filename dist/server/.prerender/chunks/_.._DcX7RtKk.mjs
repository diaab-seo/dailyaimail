globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate, u as unescapeHTML, b as addAttribute, m as maybeRenderHead } from "./worker-entry_DXJ3ent8.mjs";
import { g as getArticles } from "./articles_CSfOZ2Bv.mjs";
import { $ as $$Layout } from "./Layout_CfcrD1Rq.mjs";
import { $ as $$Breadcrumb } from "./Breadcrumb_DX5qwp6P.mjs";
import { $ as $$NewsCard } from "./NewsCard_CIDJrocL.mjs";
import { $ as $$PaginationNav } from "./PaginationNav_D8h7lOn2.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
async function getStaticPaths({ paginate }) {
  const allArticles = await getArticles();
  const sorted = [...allArticles].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  return paginate(sorted, { pageSize: 12 });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { page: page2 } = Astro2.props;
  const SITE_URL = "https://dailyaimail.news";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/news/${page2.currentPage > 1 ? page2.currentPage + "/" : ""}`,
        url: `${SITE_URL}/news/${page2.currentPage > 1 ? page2.currentPage + "/" : ""}`,
        name: `All News${page2.currentPage > 1 ? ` — Page ${page2.currentPage}` : ""} - Daily AI Mail`,
        description: "Browse the latest artificial intelligence news and analysis.",
        isPartOf: { "@id": `${SITE_URL}/#website` }
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `All News${page2.currentPage > 1 ? ` - Page ${page2.currentPage}` : ""} - Daily AI Mail`, "metaTitle": `All News${page2.currentPage > 1 ? ` - Page ${page2.currentPage}` : ""} - Daily AI Mail`, "description": "Browse the latest artificial intelligence news and analysis.", "canonical": `${SITE_URL}/news/${page2.currentPage > 1 ? page2.currentPage + "/" : ""}`, "data-astro-cid-rf3rntel": true }, { "default": async ($$result2) => renderTemplate`   ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "items": [{ label: "Home", href: "/" }, { label: "News" }], "data-astro-cid-rf3rntel": true })} ${maybeRenderHead()}<div class="news-hero" data-astro-cid-rf3rntel> <div class="news-hero-inner" data-astro-cid-rf3rntel> <h1 class="news-title" data-astro-cid-rf3rntel>All News</h1> </div> </div> <div class="news-content" data-astro-cid-rf3rntel> <div class="news-inner" data-astro-cid-rf3rntel> <div class="news-grid" data-astro-cid-rf3rntel> ${page2.data.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { "tag": a.tag, "headline": a.headline, "excerpt": a.excerpt, "date": a.date, "author": a.author, "readingTime": a.readingTime, "href": `/articles/${a.slug}`, "data-astro-cid-rf3rntel": true })}`)} </div> ${renderComponent($$result2, "PaginationNav", $$PaginationNav, { "page": page2, "data-astro-cid-rf3rntel": true })} </div> </div> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(["", "", '<script type="application/ld+json">', "<\/script>"])), page2.url.prev && renderTemplate`<link rel="prev"${addAttribute(page2.url.prev, "href")}>`, page2.url.next && renderTemplate`<link rel="next"${addAttribute(page2.url.next, "href")}>`, unescapeHTML(JSON.stringify(schema))) })}`;
}, "D:/AI News/dailyaimail/src/pages/news/[...page].astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/news/[...page].astro";
const $$url = "/news/[...page].html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
