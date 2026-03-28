globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { m as maybeRenderHead, b as addAttribute, a as renderTemplate, r as renderComponent, u as unescapeHTML } from "./worker-entry_DXJ3ent8.mjs";
import { e as getLatestArticles, b as getArticlesByCategory } from "./articles_CSfOZ2Bv.mjs";
import { a as $$NewsletterForm, $ as $$Layout } from "./Layout_CfcrD1Rq.mjs";
import { $ as $$NewsCard } from "./NewsCard_CIDJrocL.mjs";
const $$HeroCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$HeroCard;
  const { article } = Astro2.props;
  const tagColor = (() => {
    switch (article.tag) {
      case "Anthropic":
        return "#9D6FFF";
      case "Google AI":
        return "#4D8EF0";
      case "OpenAI":
        return "#19C99B";
      case "Meta AI":
        return "#3AABFF";
      case "Tools & Apps":
        return "#F0A030";
      case "Policy & Ethics":
        return "#F05050";
      default:
        return "#8A95A8";
    }
  })();
  return renderTemplate`${maybeRenderHead()}<article class="hero-card" data-astro-cid-gbvmjkms> <figure class="hero-img-col" data-astro-cid-gbvmjkms> ${article.image ? renderTemplate`<img${addAttribute(article.image, "src")}${addAttribute(article.headline, "alt")} class="hero-img" data-astro-cid-gbvmjkms>` : renderTemplate`<div class="hero-placeholder"${addAttribute(`background: linear-gradient(135deg, ${tagColor}30, ${tagColor}0A);`, "style")} data-astro-cid-gbvmjkms></div>`} </figure> <div class="hero-content" data-astro-cid-gbvmjkms> <span class="tag-label"${addAttribute(`background: ${tagColor}25; color: ${tagColor}; border: 1px solid ${tagColor}40;`, "style")} data-astro-cid-gbvmjkms>${article.tag}</span> <h1 class="headline" data-astro-cid-gbvmjkms>${article.headline}</h1> <p class="excerpt" data-astro-cid-gbvmjkms>${article.excerpt}</p> <footer class="meta" data-astro-cid-gbvmjkms> ${article.author && renderTemplate`<span class="author" data-astro-cid-gbvmjkms>By ${article.author}</span>`} <time class="date" data-astro-cid-gbvmjkms>${article.date}</time> </footer> <a${addAttribute(article.href || "#", "href")} class="read-more" data-astro-cid-gbvmjkms>Read More →</a> </div> </article>`;
}, "D:/AI News/dailyaimail/src/components/HeroCard.astro", void 0);
const $$SectionHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SectionHeader;
  const { title, viewAllHref, viewAllLabel } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="section-header" data-astro-cid-wk2votdk> <div class="header-row" data-astro-cid-wk2votdk> <h2 class="title" data-astro-cid-wk2votdk>${title}</h2> ${viewAllHref && viewAllLabel && renderTemplate`<a${addAttribute(viewAllHref, "href")} class="view-all" data-astro-cid-wk2votdk> ${viewAllLabel} </a>`} </div> <hr class="divider" data-astro-cid-wk2votdk> </header>`;
}, "D:/AI News/dailyaimail/src/components/SectionHeader.astro", void 0);
const $$NewsletterBanner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="newsletter-banner-container" data-astro-cid-pjkfwxdf> ${renderComponent($$result, "NewsletterForm", $$NewsletterForm, { "data-astro-cid-pjkfwxdf": true })} </section>`;
}, "D:/AI News/dailyaimail/src/components/NewsletterBanner.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [
    latestArticles,
    anthropicArticles,
    googleArticles,
    openaiArticles,
    toolsArticles,
    policyArticles
  ] = await Promise.all([
    getLatestArticles(3),
    getArticlesByCategory("Anthropic").then((a) => a.slice(0, 3)),
    getArticlesByCategory("Google AI").then((a) => a.slice(0, 3)),
    getArticlesByCategory("OpenAI").then((a) => a.slice(0, 3)),
    getArticlesByCategory("Tools & Apps").then((a) => a.slice(0, 3)),
    getArticlesByCategory("Policy & Ethics").then((a) => a.slice(0, 3))
  ]);
  const heroArticle = anthropicArticles[0];
  const trendingArticles = (await getLatestArticles(5)).map((a) => ({
    headline: a.headline,
    slug: a.slug
  }));
  const siteUrl = "https://dailyaimail.news";
  const logoUrl = `${siteUrl}/dark-logo.svg`;
  const newestIso = latestArticles[0]?.isoDate ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const categories = [
    {
      tag: "Anthropic",
      slug: "anthropic",
      sameAs: ["https://www.wikidata.org/wiki/Q116820069"]
    },
    {
      tag: "Google AI",
      slug: "google-ai",
      sameAs: ["https://www.wikidata.org/wiki/Q95"]
    },
    {
      tag: "OpenAI",
      slug: "openai",
      sameAs: ["https://www.wikidata.org/wiki/Q21708200"]
    },
    {
      tag: "Meta AI",
      slug: "meta-ai",
      sameAs: ["https://www.wikidata.org/wiki/Q380"]
    },
    { tag: "Tools & Apps", slug: "tools-and-apps", sameAs: [] },
    {
      tag: "Policy & Ethics",
      slug: "policy-and-ethics",
      sameAs: ["https://www.wikidata.org/wiki/Q30059493"]
    }
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebPage — the homepage itself
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/`,
        url: `${siteUrl}/`,
        name: "Daily AI Mail — AI News, Research & Tools",
        headline: "Your daily source for AI news, research and tools",
        description: "Daily AI Mail delivers authoritative coverage of artificial intelligence news, model releases, research breakthroughs, tools, and policy developments for a global audience.",
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        author: { "@id": `${siteUrl}/#/schema/person/editorial-team` },
        dateModified: `${newestIso}T00:00:00+00:00`,
        image: { "@id": `${siteUrl}/#/schema/logo/image/` },
        primaryImageOfPage: { "@id": `${siteUrl}/#/schema/logo/image/` },
        breadcrumb: { "@id": `${siteUrl}/#breadcrumb` },
        isAccessibleForFree: true,
        accessMode: ["textual"],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero h1", ".hero-headline"]
        },
        // potentialAction — site-level search
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [`${siteUrl}/`]
          }
        ],
        // Explicit links to all section pages — internal mesh anchor
        significantLink: [
          `${siteUrl}/about-us`,
          `${siteUrl}/contact-us`,
          `${siteUrl}/publishing-principles`,
          ...categories.map((c) => `${siteUrl}/category/${c.slug}`)
        ],
        // mentions — every topic entity + the author
        mentions: [
          { "@id": `${siteUrl}/#/schema/person/editorial-team` },
          ...categories.map((c) => ({
            "@id": `${siteUrl}/category/${c.slug}#topic`
          }))
        ]
      },
      // 2. BreadcrumbList — homepage is the root
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }
        ]
      },
      // 3. WebSite — FULL canonical definition (lives here and is referenced everywhere else)
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Daily AI Mail",
        alternateName: ["Daily AI Mail", "DailyAIMail"],
        description: "Your daily source for AI news, research and tools.",
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#organization` },
        author: { "@id": `${siteUrl}/#/schema/person/editorial-team` },
        about: { "@id": `${siteUrl}/#organization` },
        dateCreated: "2026-01-01T00:00:00+00:00",
        dateModified: `${newestIso}T00:00:00+00:00`,
        isAccessibleForFree: true,
        license: `${siteUrl}/terms-and-conditions`,
        publishingPrinciples: `${siteUrl}/publishing-principles`,
        privacyPolicy: `${siteUrl}/privacy-policy`,
        // SearchAction — enables sitelinks search box eligibility
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteUrl}/?s={search_term_string}`
            },
            "query-input": {
              "@type": "PropertyValueSpecification",
              valueRequired: true,
              valueName: "search_term_string"
            }
          }
        ],
        // hasPart — explicitly connects website to all category collection pages
        hasPart: categories.map((c) => ({
          "@type": "CollectionPage",
          "@id": `${siteUrl}/category/${c.slug}`,
          url: `${siteUrl}/category/${c.slug}`,
          name: `${c.tag} News — Daily AI Mail`
        }))
      },
      // 4. NewsMediaOrganization — FULL canonical definition
      {
        "@type": "NewsMediaOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "Daily AI Mail",
        alternateName: "DailyAIMail",
        url: `${siteUrl}/`,
        foundingDate: "2026-01-01",
        description: "Daily AI Mail is an independent digital publication dedicated to covering the global artificial intelligence industry for researchers, engineers, business leaders, and policymakers.",
        publishingPrinciples: `${siteUrl}/publishing-principles`,
        logo: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#/schema/logo/image/`,
          inLanguage: "en-US",
          url: logoUrl,
          contentUrl: logoUrl,
          width: 512,
          height: 512,
          caption: "Daily AI Mail"
        },
        image: { "@id": `${siteUrl}/#/schema/logo/image/` },
        // contactPoint — editorial and press channels
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "editorial@dailyaimail.news",
            contactType: "editorial",
            availableLanguage: ["English"]
          },
          {
            "@type": "ContactPoint",
            email: "press@dailyaimail.news",
            contactType: "press",
            availableLanguage: ["English"]
          }
        ],
        // member — the founding editor
        member: { "@id": `${siteUrl}/#/schema/person/editorial-team` },
        founder: { "@id": `${siteUrl}/#/schema/person/editorial-team` },
        // areaServed — global coverage with MENA emphasis
        areaServed: [
          { "@type": "Place", name: "Worldwide" },
          { "@type": "Country", name: "Egypt" },
          { "@type": "Place", name: "MENA" }
        ],
        // knowsAbout — entity-level subject matter expertise
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Large Language Models",
          "AI Safety",
          "Generative AI",
          "AI Policy",
          "AI Ethics",
          "Neural Networks",
          "Natural Language Processing",
          "AI Research"
        ],
        sameAs: [
          "https://twitter.com/dailyaimail",
          "https://linkedin.com/company/dailyaimail",
          ""
        ]
      },
      // 5. Person — Daily AI Mail Editorial Staff — FULL definition (also fully defined on About Us)
      {
        "@type": "Person",
        "@id": `${siteUrl}/#/schema/person/editorial-team`,
        name: "Daily AI Mail Editorial Staff",
        givenName: "Mohamed",
        familyName: "Diab",
        url: "",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/editorial-team.jpg`,
          caption: "Daily AI Mail Editorial Staff"
        },
        jobTitle: "Editorial Staff",
        description: "Technical SEO Consultant and founder of Daily AI Mail, with over ten years of experience in the technology and digital marketing industry.",
        worksFor: { "@id": `${siteUrl}/#organization` },
        knowsAbout: [
          "Technical SEO",
          "Structured Data",
          "Knowledge Graph Optimization",
          "Artificial Intelligence",
          "AI News",
          "Digital Publishing",
          "Entity-Based SEO"
        ],
        sameAs: ["", ""]
      },
      // 6. SiteNavigationElement — maps the full nav structure
      // This is a strongly underused signal for site architecture
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteUrl}/#navigation`,
        name: "Main Navigation",
        url: `${siteUrl}/`,
        hasPart: [
          { "@type": "SiteNavigationElement", name: "Home", url: `${siteUrl}/` },
          {
            "@type": "SiteNavigationElement",
            name: "Anthropic",
            url: `${siteUrl}/category/anthropic`
          },
          {
            "@type": "SiteNavigationElement",
            name: "Google AI",
            url: `${siteUrl}/category/google-ai`
          },
          {
            "@type": "SiteNavigationElement",
            name: "OpenAI",
            url: `${siteUrl}/category/openai`
          },
          {
            "@type": "SiteNavigationElement",
            name: "Meta AI",
            url: `${siteUrl}/category/meta-ai`
          },
          {
            "@type": "SiteNavigationElement",
            name: "Tools & Apps",
            url: `${siteUrl}/category/tools-and-apps`
          },
          {
            "@type": "SiteNavigationElement",
            name: "Policy & Ethics",
            url: `${siteUrl}/category/policy-and-ethics`
          },
          {
            "@type": "SiteNavigationElement",
            name: "About",
            url: `${siteUrl}/about-us`
          }
        ]
      },
      // 7. DefinedTermSet — the full topic taxonomy
      // Anchors all category DefinedTerms to a named classification system
      {
        "@type": "DefinedTermSet",
        "@id": `${siteUrl}/#topics`,
        name: "Daily AI Mail Topic Taxonomy",
        description: "The editorial topic classification system used by Daily AI Mail to organize AI news coverage.",
        url: `${siteUrl}/`,
        publisher: { "@id": `${siteUrl}/#organization` },
        hasDefinedTerm: categories.map((c) => ({
          "@type": "DefinedTerm",
          "@id": `${siteUrl}/category/${c.slug}#topic`,
          name: c.tag,
          url: `${siteUrl}/category/${c.slug}`,
          inDefinedTermSet: { "@id": `${siteUrl}/#topics` },
          ...c.sameAs.length > 0 && { sameAs: c.sameAs }
        }))
      },
      // 8. ItemList — the latest articles shown on homepage
      // Machine-readable content index for the front page
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#latest`,
        name: "Latest AI News — Daily AI Mail",
        description: "The most recently published articles across all topics on Daily AI Mail.",
        numberOfItems: latestArticles.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: latestArticles.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${siteUrl}/articles/${a.slug}`,
          name: a.headline,
          item: {
            "@type": "NewsArticle",
            "@id": `${siteUrl}/articles/${a.slug}#article`,
            headline: a.headline,
            description: a.excerpt,
            datePublished: `${a.isoDate}T00:00:00+00:00`,
            author: { "@id": `${siteUrl}/#/schema/person/editorial-team` },
            publisher: { "@id": `${siteUrl}/#organization` },
            url: `${siteUrl}/articles/${a.slug}`
          }
        }))
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Daily AI Mail — AI News, Research & Tools", "description": "Daily AI Mail delivers authoritative coverage of artificial intelligence news, model releases, research breakthroughs, tools, and policy developments for a global audience.", "metaTitle": "Daily AI Mail — AI News, Research & Tools", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<section class="hero" data-astro-cid-j7pv25f6> <div class="hero-inner" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "HeroCard", $$HeroCard, { "article": heroArticle, "data-astro-cid-j7pv25f6": true })} </div> </section>  <div class="content-with-sidebar" data-astro-cid-j7pv25f6> <main class="main-content" data-astro-cid-j7pv25f6> <section class="news-section" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "SectionHeader", $$SectionHeader, { "title": "Latest AI News", "viewAllHref": "/category/openai", "viewAllLabel": "View All →", "data-astro-cid-j7pv25f6": true })} <div class="card-grid" data-astro-cid-j7pv25f6> ${latestArticles.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { ...a, "href": `/articles/${a.slug}`, "data-astro-cid-j7pv25f6": true })}`)} </div> </section> <section class="news-section" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "SectionHeader", $$SectionHeader, { "title": "Anthropic News", "viewAllHref": "/category/anthropic", "viewAllLabel": "View All Anthropic →", "data-astro-cid-j7pv25f6": true })} <div class="card-grid" data-astro-cid-j7pv25f6> ${anthropicArticles.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { ...a, "href": `/articles/${a.slug}`, "data-astro-cid-j7pv25f6": true })}`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> <a href="/category/anthropic" class="view-more-btn" data-astro-cid-j7pv25f6>View More Anthropic Stories →</a> </div> </section> <section class="news-section" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "SectionHeader", $$SectionHeader, { "title": "Google AI News", "viewAllHref": "/category/google-ai", "viewAllLabel": "View All Google AI →", "data-astro-cid-j7pv25f6": true })} <div class="card-grid" data-astro-cid-j7pv25f6> ${googleArticles.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { ...a, "href": `/articles/${a.slug}`, "data-astro-cid-j7pv25f6": true })}`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> <a href="/category/google-ai" class="view-more-btn" data-astro-cid-j7pv25f6>View More Google AI Stories →</a> </div> </section> <section class="news-section" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "SectionHeader", $$SectionHeader, { "title": "OpenAI News", "viewAllHref": "/category/openai", "viewAllLabel": "View All OpenAI →", "data-astro-cid-j7pv25f6": true })} <div class="card-grid" data-astro-cid-j7pv25f6> ${openaiArticles.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { ...a, "href": `/articles/${a.slug}`, "data-astro-cid-j7pv25f6": true })}`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> <a href="/category/openai" class="view-more-btn" data-astro-cid-j7pv25f6>View More OpenAI Stories →</a> </div> </section> </main> <aside class="sidebar" data-astro-cid-j7pv25f6> <div class="sidebar-widget" data-astro-cid-j7pv25f6> <h3 class="sidebar-title" data-astro-cid-j7pv25f6>Trending Now</h3> <ol class="trending-list" data-astro-cid-j7pv25f6> ${trendingArticles.map((t, i) => renderTemplate`<li class="trending-item" data-astro-cid-j7pv25f6> <span class="trending-num" data-astro-cid-j7pv25f6> ${String(i + 1).padStart(2, "0")} </span> <a${addAttribute(`/articles/${t.slug}`, "href")} data-astro-cid-j7pv25f6>${t.headline}</a> </li>`)} </ol> </div> <div class="sidebar-widget" data-astro-cid-j7pv25f6> <h3 class="sidebar-title" data-astro-cid-j7pv25f6>Topics</h3> <div class="tag-cloud" data-astro-cid-j7pv25f6> ${[
    "Anthropic",
    "OpenAI",
    "Google AI",
    "Meta AI",
    "LLM",
    "Safety",
    "Tools",
    "Research",
    "Policy",
    "Gemini"
  ].map((tag) => renderTemplate`<a href="#" class="tag-chip" data-astro-cid-j7pv25f6> ${tag} </a>`)} </div> </div> <div class="sidebar-widget sidebar-newsletter" style="padding: 0; background: transparent; border: none;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "NewsletterForm", $$NewsletterForm, { "data-astro-cid-j7pv25f6": true })} </div> </aside> </div> ${renderComponent($$result2, "NewsletterBanner", $$NewsletterBanner, { "data-astro-cid-j7pv25f6": true })} <div class="content-with-sidebar" data-astro-cid-j7pv25f6> <main class="main-content" data-astro-cid-j7pv25f6> <section class="news-section" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "SectionHeader", $$SectionHeader, { "title": "New AI Tools & Apps", "viewAllHref": "/category/tools-and-apps", "viewAllLabel": "View All Tools →", "data-astro-cid-j7pv25f6": true })} <div class="card-grid" data-astro-cid-j7pv25f6> ${toolsArticles.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { ...a, "href": `/articles/${a.slug}`, "data-astro-cid-j7pv25f6": true })}`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> <a href="/category/tools-and-apps" class="view-more-btn" data-astro-cid-j7pv25f6>View More Tools & Apps →</a> </div> </section> <section class="news-section" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "SectionHeader", $$SectionHeader, { "title": "AI Policy & Ethics", "viewAllHref": "/category/policy-and-ethics", "viewAllLabel": "View All →", "data-astro-cid-j7pv25f6": true })} <div class="card-grid" data-astro-cid-j7pv25f6> ${policyArticles.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { ...a, "href": `/articles/${a.slug}`, "data-astro-cid-j7pv25f6": true })}`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> <a href="/category/policy-and-ethics" class="view-more-btn" data-astro-cid-j7pv25f6>View More Policy Stories →</a> </div> </section> </main> <aside class="sidebar" data-astro-cid-j7pv25f6> <div class="sidebar-widget" data-astro-cid-j7pv25f6> <h3 class="sidebar-title" data-astro-cid-j7pv25f6>Trending Now</h3> <ol class="trending-list" data-astro-cid-j7pv25f6> ${trendingArticles.map((t, i) => renderTemplate`<li class="trending-item" data-astro-cid-j7pv25f6> <span class="trending-num" data-astro-cid-j7pv25f6> ${String(i + 1).padStart(2, "0")} </span> <a${addAttribute(`/articles/${t.slug}`, "href")} data-astro-cid-j7pv25f6>${t.headline}</a> </li>`)} </ol> </div> </aside> </div> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema))) })}`;
}, "D:/AI News/dailyaimail/src/pages/index.astro", void 0);
const $$file = "D:/AI News/dailyaimail/src/pages/index.astro";
const $$url = "";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
