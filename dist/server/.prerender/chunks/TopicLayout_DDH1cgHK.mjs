globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate, u as unescapeHTML, b as addAttribute, m as maybeRenderHead } from "./worker-entry_DXJ3ent8.mjs";
import { $ as $$Layout } from "./Layout_CfcrD1Rq.mjs";
import { $ as $$Breadcrumb } from "./Breadcrumb_DX5qwp6P.mjs";
import { $ as $$NewsCard } from "./NewsCard_CIDJrocL.mjs";
import { d as topicToSlug, t as tagColor } from "./articles_CSfOZ2Bv.mjs";
import { $ as $$PaginationNav } from "./PaginationNav_D8h7lOn2.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$TopicLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TopicLayout;
  const { tag, articles, page } = Astro2.props;
  const color = tagColor(tag);
  const count = articles.length;
  const slug = topicToSlug(tag);
  const SITE_URL = "https://dailyaimail.news";
  const baseTopicUrl = `${SITE_URL}/topics/${slug}`;
  const topicUrl = page && page.currentPage > 1 ? `${baseTopicUrl}/${page.currentPage}` : baseTopicUrl;
  const logoUrl = `${SITE_URL}/dark-logo.svg`;
  const latestIso = articles.length > 0 ? [...articles].sort((a, b) => b.isoDate.localeCompare(a.isoDate))[0].isoDate : (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const getDynamicDescription = (topicName, articles2) => {
    const allKeywords = [...new Set(articles2.flatMap((a) => a.keywords || []))].filter((k) => k.toLowerCase() !== topicName.toLowerCase());
    const selectedKeywords = allKeywords.slice(0, 4);
    const keywordsSentence = selectedKeywords.length > 0 ? ` Covering ${selectedKeywords.slice(0, -1).join(", ")}${selectedKeywords.length > 1 ? " and " : ""}${selectedKeywords.slice(-1)}.` : "";
    return `The latest ${topicName} news, analysis, and updates for AI researchers, engineers, and business leaders.${keywordsSentence}`;
  };
  const pageTitle = `${tag} Recent News and Updates - Daily AI Mail`;
  const pageDescription = getDynamicDescription(tag, articles);
  const meta = {
    description: pageDescription,
    keywords: [tag, "AI", "artificial intelligence"],
    sameAs: []
  };
  const definedTerm = {
    "@type": "DefinedTerm",
    "@id": `${topicUrl}#topic`,
    name: tag,
    description: meta.description,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${SITE_URL}/#topics`,
      name: "Daily AI Mail Topic Taxonomy",
      url: `${SITE_URL}/`
    },
    ...meta.sameAs.length > 0 && { sameAs: meta.sameAs }
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": topicUrl,
        url: topicUrl,
        name: pageTitle,
        headline: `${tag} News`,
        description: pageDescription,
        keywords: meta.keywords,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${topicUrl}#topic` },
        hasPart: { "@id": `${topicUrl}#itemlist` },
        breadcrumb: { "@id": `${topicUrl}#breadcrumb` },
        image: { "@id": `${SITE_URL}/#/schema/logo/image/` },
        dateModified: `${latestIso}T00:00:00+00:00`,
        publisher: { "@id": `${SITE_URL}/#organization` },
        isAccessibleForFree: true,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".cat-title", ".cat-subtitle"]
        },
        potentialAction: [{ "@type": "ReadAction", target: [topicUrl] }],
        significantLink: articles.sort((a, b) => b.isoDate.localeCompare(a.isoDate)).slice(0, 3).map((a) => `${SITE_URL}/articles/${a.slug}`)
      },
      definedTerm,
      {
        "@type": "ItemList",
        "@id": `${topicUrl}#itemlist`,
        name: `${tag} Articles — Daily AI Mail`,
        numberOfItems: count,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: articles.sort((a, b) => b.isoDate.localeCompare(a.isoDate)).map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/articles/${a.slug}`,
          name: a.headline,
          item: {
            "@type": "NewsArticle",
            "@id": `${SITE_URL}/articles/${a.slug}#article`,
            headline: a.headline,
            description: a.excerpt,
            datePublished: `${a.isoDate}T00:00:00+00:00`,
            url: `${SITE_URL}/articles/${a.slug}`,
            author: {
              "@id": `${SITE_URL}/#/schema/person/editorial-team`
            },
            publisher: { "@id": `${SITE_URL}/#organization` }
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${topicUrl}#breadcrumb`,
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
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${tag} News`,
            item: topicUrl
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Daily AI Mail",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US"
      },
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: "Daily AI Mail",
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#/schema/logo/image/`,
          url: logoUrl,
          width: 512,
          height: 512
        },
        image: { "@id": `${SITE_URL}/#/schema/logo/image/` },
        sameAs: [
          "https://twitter.com/dailyaimail",
          "https://linkedin.com/company/dailyaimail"
        ]
      }
    ]
  };
  if (page && page.currentPage > 1) {
    schema["@graph"].push({
      "@type": "CollectionPage",
      "@id": topicUrl,
      "url": topicUrl,
      "isPartOf": { "@id": baseTopicUrl },
      "name": `${tag} News — Page ${page.currentPage} — Daily AI Mail`
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription, "metaTitle": pageTitle, "canonical": topicUrl, "ogType": "website", "ogTitle": pageTitle, "ogDescription": pageDescription, "data-astro-cid-bub7cl3e": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "items": [
    { label: "Home", href: "/" },
    { label: "Topics", href: "/topics" },
    { label: `${tag} News` }
  ], "data-astro-cid-bub7cl3e": true })} ${maybeRenderHead()}<div class="cat-hero"${addAttribute(`background:linear-gradient(135deg,${color}12 0%,transparent 60%);border-bottom:2px solid ${color}25;`, "style")} data-pagefind-ignore data-astro-cid-bub7cl3e> <div class="cat-hero-inner" data-astro-cid-bub7cl3e> <span class="cat-tag"${addAttribute(`background:${color}18;color:${color};`, "style")} data-astro-cid-bub7cl3e>${tag}</span> <h1 class="cat-title" data-astro-cid-bub7cl3e>${tag} News</h1> <p class="cat-subtitle" data-astro-cid-bub7cl3e> ${count} article${count !== 1 ? "s" : ""} · Updated daily
</p> </div> </div> <div class="cat-content" data-pagefind-ignore data-astro-cid-bub7cl3e> <div class="cat-inner" data-astro-cid-bub7cl3e> <div class="cat-grid" data-astro-cid-bub7cl3e> ${articles.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { "tag": a.tag, "headline": a.headline, "excerpt": a.excerpt, "date": a.date, "author": a.author, "readingTime": a.readingTime, "href": `/articles/${a.slug}`, "data-astro-cid-bub7cl3e": true })}`)} </div> ${page && renderTemplate`${renderComponent($$result2, "PaginationNav", $$PaginationNav, { "page": page, "data-astro-cid-bub7cl3e": true })}`} </div> </div> `, "head": ($$result2) => renderTemplate(_a || (_a = __template(["", "", '<script type="application/ld+json">', "<\/script>"])), page && page.url.prev && renderTemplate`<link rel="prev"${addAttribute(page.url.prev, "href")}>`, page && page.url.next && renderTemplate`<link rel="next"${addAttribute(page.url.next, "href")}>`, unescapeHTML(JSON.stringify(schema))) })}`;
}, "D:/AI News/dailyaimail/src/layouts/TopicLayout.astro", void 0);
export {
  $$TopicLayout as $
};
