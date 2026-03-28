globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate, u as unescapeHTML, b as addAttribute, m as maybeRenderHead } from "./worker-entry_DXJ3ent8.mjs";
import { $ as $$Layout } from "./Layout_CfcrD1Rq.mjs";
import { $ as $$PaginationNav } from "./PaginationNav_D8h7lOn2.mjs";
import { g as getArticles, t as tagColor } from "./articles_CSfOZ2Bv.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
async function getStaticPaths({ paginate }) {
  const allArticles = await getArticles();
  const authorArticles = allArticles.filter((a) => a.author === "Daily AI Mail Editorial Staff").sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());
  return paginate(authorArticles, { pageSize: 12 });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { page: page2 } = Astro2.props;
  const authorName = "Daily AI Mail Editorial Staff";
  const authorArticles = page2.data;
  const title = `${authorName}`;
  const description = `The Daily AI Mail editorial staff is an independent team of AI journalists, researchers, and analysts with over 15 years of experience covering artificial intelligence, machine learning, and emerging technologies.`;
  const SITE_URL = "https://dailyaimail.news";
  const authorUrl = `${SITE_URL}/about-us/editorial-team`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": authorName,
      "description": description,
      "image": `${SITE_URL}/dark-logo.svg`,
      "jobTitle": "Staff Writers",
      "url": authorUrl,
      "sameAs": [
        "https://www.facebook.com/dailyaimail/",
        "https://www.linkedin.com/company/dailaimail/",
        "https://x.com/dailyaimail",
        "https://medium.com/@dailyaimail",
        "https://www.reddit.com/user/dailyaimail/"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Daily AI Mail",
        "url": SITE_URL
      }
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "metaTitle": title, "data-astro-cid-e52tp3ng": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="author-page" data-astro-cid-e52tp3ng> <!-- Header Section --> <header class="author-header" data-astro-cid-e52tp3ng> <div class="container" data-astro-cid-e52tp3ng> <div class="author-header-grid" data-astro-cid-e52tp3ng> <div class="author-image-wrapper" data-astro-cid-e52tp3ng> <img src="/dark-logo.svg"${addAttribute(authorName, "alt")} width="400" height="400" class="author-profile-img" loading="eager" data-astro-cid-e52tp3ng> </div> <div class="author-info" data-astro-cid-e52tp3ng> <h1 class="author-title" data-astro-cid-e52tp3ng>${authorName}</h1> <p class="author-role" data-astro-cid-e52tp3ng>Staff Writers · 15+ Years Covering AI</p> <div class="author-bio-content" data-astro-cid-e52tp3ng> <p data-astro-cid-e52tp3ng>
Daily AI Mail is written and edited by the <strong data-astro-cid-e52tp3ng>Daily AI Mail Editorial Staff</strong>, an independent team of AI journalists, researchers, and analysts with over 15 years of experience covering artificial intelligence, machine learning, and emerging technologies.
</p> <p data-astro-cid-e52tp3ng>
The publication is built on a technology stack designed for performance, accessibility, and editorial scalability — reflecting a belief that the infrastructure of journalism matters as much as its content.
</p> </div> <div class="author-socials" data-astro-cid-e52tp3ng> <a href="https://www.facebook.com/dailyaimail/" class="social-link" target="_blank" rel="noopener" data-astro-cid-e52tp3ng> <span data-astro-cid-e52tp3ng>Facebook</span> </a> <a href="https://www.linkedin.com/company/dailaimail/" class="social-link" target="_blank" rel="noopener" data-astro-cid-e52tp3ng> <span data-astro-cid-e52tp3ng>LinkedIn</span> </a> <a href="https://x.com/dailyaimail" class="social-link" target="_blank" rel="noopener" data-astro-cid-e52tp3ng> <span data-astro-cid-e52tp3ng>X / Twitter</span> </a> <a href="https://medium.com/@dailyaimail" class="social-link" target="_blank" rel="noopener" data-astro-cid-e52tp3ng> <span data-astro-cid-e52tp3ng>Medium</span> </a> <a href="https://www.reddit.com/user/dailyaimail/" class="social-link" target="_blank" rel="noopener" data-astro-cid-e52tp3ng> <span data-astro-cid-e52tp3ng>Reddit</span> </a> </div> </div> </div> </div> </header> <!-- Articles Section --> <section class="author-articles" data-astro-cid-e52tp3ng> <div class="container" data-astro-cid-e52tp3ng> <h2 class="section-title" data-astro-cid-e52tp3ng>Latest from ${authorName}</h2> ${authorArticles.length > 0 ? renderTemplate`<div class="articles-grid" data-astro-cid-e52tp3ng> ${authorArticles.map((article) => renderTemplate`<a${addAttribute(`/articles/${article.slug}`, "href")} class="article-card" data-astro-cid-e52tp3ng> <div class="article-card-inner" data-astro-cid-e52tp3ng> <span class="article-tag"${addAttribute(`background:${tagColor(article.tag)}15; color:${tagColor(article.tag)}; border:1px solid ${tagColor(article.tag)}35;`, "style")} data-astro-cid-e52tp3ng> ${article.tag} </span> <h3 class="article-headline" data-astro-cid-e52tp3ng>${article.headline}</h3> <p class="article-excerpt" data-astro-cid-e52tp3ng>${article.excerpt}</p> <div class="article-meta" data-astro-cid-e52tp3ng> <time${addAttribute(article.isoDate, "datetime")} data-astro-cid-e52tp3ng>${article.date}</time> <span class="sep" data-astro-cid-e52tp3ng>·</span> <span data-astro-cid-e52tp3ng>${article.readingTime}</span> </div> </div> </a>`)} </div>` : renderTemplate`<p class="no-articles" data-astro-cid-e52tp3ng>No articles published yet.</p>`} ${renderComponent($$result2, "PaginationNav", $$PaginationNav, { "page": page2, "data-astro-cid-e52tp3ng": true })} </div> </section> </main> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(["", "", '<script type="application/ld+json">', "<\/script>"])), page2.url.prev && renderTemplate`<link rel="prev"${addAttribute(page2.url.prev, "href")}>`, page2.url.next && renderTemplate`<link rel="next"${addAttribute(page2.url.next, "href")}>`, unescapeHTML(JSON.stringify(schema))) })}`;
}, "D:/AI News/dailyaimail/src/pages/about-us/editorial-team/[...page].astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/about-us/editorial-team/[...page].astro";
const $$url = "/about-us/editorial-team/[...page].html";
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
