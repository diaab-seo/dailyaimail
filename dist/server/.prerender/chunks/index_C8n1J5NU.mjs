globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate, u as unescapeHTML, m as maybeRenderHead, b as addAttribute } from "./worker-entry_DXJ3ent8.mjs";
import { $ as $$Layout, r as renderScript } from "./Layout_CfcrD1Rq.mjs";
import { g as getArticles, a as getAllCategories, d as topicToSlug, t as tagColor } from "./articles_CSfOZ2Bv.mjs";
import { $ as $$Breadcrumb } from "./Breadcrumb_DX5qwp6P.mjs";
import { $ as $$NewsCard } from "./NewsCard_CIDJrocL.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = true;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allArticles = await getArticles();
  const allCategories = await getAllCategories();
  const sorted = [...allArticles].sort(
    (a, b) => b.isoDate.localeCompare(a.isoDate)
  );
  const SITE_URL = "https://dailyaimail.news";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/topics`,
        url: `${SITE_URL}/topics`,
        name: "All AI Topics — Daily AI Mail",
        description: "Browse all artificial intelligence topics covered by Daily AI Mail, including Anthropic, Google AI, OpenAI, Meta AI, Tools & Apps, and Policy & Ethics.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: { "@id": `${SITE_URL}/#topics` },
        breadcrumb: { "@id": `${SITE_URL}/topics#breadcrumb` },
        inLanguage: "en-US",
        hasPart: allCategories.map((tag) => ({
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/topics/${topicToSlug(tag)}`,
          url: `${SITE_URL}/topics/${topicToSlug(tag)}`,
          name: `${tag} News — Daily AI Mail`
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/topics#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Topics",
            item: `${SITE_URL}/topics`
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Daily AI Mail",
        publisher: { "@id": `${SITE_URL}/#organization` }
      },
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: "Daily AI Mail",
        url: `${SITE_URL}/`
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "All Topics — Daily AI Mail", "metaTitle": "All AI Topics — Daily AI Mail", "description": "Browse all artificial intelligence topics covered by Daily AI Mail, including Anthropic, Google AI, OpenAI, Meta AI, Tools & Apps, and Policy & Ethics.", "canonical": `${SITE_URL}/topics`, "data-astro-cid-n7tr52od": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "items": [{ label: "Home", href: "/" }, { label: "Topics" }], "data-astro-cid-n7tr52od": true })}  ${maybeRenderHead()}<div class="topics-hero" data-astro-cid-n7tr52od> <div class="topics-hero-inner" data-astro-cid-n7tr52od> <h1 class="topics-title" data-astro-cid-n7tr52od>All Topics</h1> <p class="topics-sub" data-astro-cid-n7tr52od> ${allArticles.length} articles across ${allCategories.length} topics
</p> </div> </div>  <div class="topics-filter-bar" data-astro-cid-n7tr52od> <div class="topics-filter-inner" data-astro-cid-n7tr52od> <div class="filter-row" data-astro-cid-n7tr52od> <!-- Topic chips --> <div class="chip-group" role="group" aria-label="Filter by topic" data-astro-cid-n7tr52od> <button class="chip chip--active" data-filter-topic="all" data-astro-cid-n7tr52od>All Topics</button> ${allCategories.map((tag) => renderTemplate`<button class="chip"${addAttribute(topicToSlug(tag), "data-filter-topic")}${addAttribute(`--chip-color:${tagColor(tag)};`, "style")} data-astro-cid-n7tr52od> ${tag} </button>`)} </div> <!-- Sort --> <div class="sort-group" data-astro-cid-n7tr52od> <label for="sort-select" class="sort-label" data-astro-cid-n7tr52od>Sort:</label> <select id="sort-select" class="sort-select" data-astro-cid-n7tr52od> <option value="newest" data-astro-cid-n7tr52od>Newest first</option> <option value="oldest" data-astro-cid-n7tr52od>Oldest first</option> </select> </div> </div> <!-- Result count --> <p class="result-count" id="result-count" data-astro-cid-n7tr52od> ${allArticles.length} articles
</p> </div> </div>  <div class="topics-content" data-astro-cid-n7tr52od> <div class="topics-inner" data-astro-cid-n7tr52od> <div class="topics-grid" id="topics-grid" data-astro-cid-n7tr52od> ${sorted.map((a) => renderTemplate`<div class="article-card-wrap"${addAttribute(topicToSlug(a.tag), "data-topic")}${addAttribute(a.isoDate, "data-isodate")} data-astro-cid-n7tr52od> ${renderComponent($$result2, "NewsCard", $$NewsCard, { "tag": a.tag, "headline": a.headline, "excerpt": a.excerpt, "date": a.date, "author": a.author, "readingTime": a.readingTime, "href": `/articles/${a.slug}`, "data-astro-cid-n7tr52od": true })} </div>`)} </div> <!-- Empty state --> <p class="no-results" id="no-results" style="display:none;" data-astro-cid-n7tr52od>
No articles found for this topic. Try selecting a different
                filter.
</p> </div> </div> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema))) })} ${renderScript($$result, "D:/AI News/dailyaimail/src/pages/topics/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/AI News/dailyaimail/src/pages/topics/index.astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/topics/index.astro";
const $$url = "/topics.html";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
