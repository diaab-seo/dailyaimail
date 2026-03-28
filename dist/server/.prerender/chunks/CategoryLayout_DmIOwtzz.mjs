globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate, u as unescapeHTML, b as addAttribute, m as maybeRenderHead } from "./worker-entry_DXJ3ent8.mjs";
import { $ as $$Layout } from "./Layout_CfcrD1Rq.mjs";
import { $ as $$NewsCard } from "./NewsCard_CIDJrocL.mjs";
import { c as categoryToSlug, t as tagColor } from "./articles_CSfOZ2Bv.mjs";
import { $ as $$PaginationNav } from "./PaginationNav_D8h7lOn2.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$CategoryLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CategoryLayout;
  const { tag, articles, page } = Astro2.props;
  const color = tagColor(tag);
  const count = articles.length;
  const siteUrl = "https://dailyaimail.news";
  const catSlug = categoryToSlug(tag);
  const baseCatUrl = `${siteUrl}/category/${catSlug}`;
  const catUrl = page && page.currentPage > 1 ? `${baseCatUrl}/${page.currentPage}` : baseCatUrl;
  const logoUrl = `${siteUrl}/dark-logo.svg`;
  const latestIso = articles.length > 0 ? [...articles].sort((a, b) => b.isoDate.localeCompare(a.isoDate))[0].isoDate : (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const dateModified = `${latestIso}T00:00:00+00:00`;
  const topicMeta = {
    Anthropic: {
      description: "Latest news, research, and product releases from Anthropic, the AI safety company behind the Claude family of large language models.",
      keywords: [
        "Anthropic",
        "Claude",
        "Constitutional AI",
        "AI safety",
        "large language models",
        "LLM"
      ],
      sameAs: [
        "https://www.wikidata.org/wiki/Q116820069",
        "https://en.wikipedia.org/wiki/Anthropic"
      ]
    },
    "Google AI": {
      description: "Coverage of Google's artificial intelligence research and products, including Gemini, DeepMind, Google Labs, and AI integrations across Google's product suite.",
      keywords: [
        "Google AI",
        "Gemini",
        "DeepMind",
        "Google DeepMind",
        "AI research",
        "machine learning"
      ],
      sameAs: [
        "https://www.wikidata.org/wiki/Q95",
        "https://en.wikipedia.org/wiki/Google_AI"
      ]
    },
    OpenAI: {
      description: "News and analysis covering OpenAI's models, products, and research — including GPT, ChatGPT, DALL-E, Sora, and the company's safety and governance decisions.",
      keywords: [
        "OpenAI",
        "ChatGPT",
        "GPT-5",
        "Sora",
        "DALL-E",
        "AI models",
        "generative AI"
      ],
      sameAs: [
        "https://www.wikidata.org/wiki/Q21708200",
        "https://en.wikipedia.org/wiki/OpenAI"
      ]
    },
    "Meta AI": {
      description: "Reports on Meta's artificial intelligence division, covering Llama open-source models, AI research publications, and AI features across Meta's platforms.",
      keywords: [
        "Meta AI",
        "Llama",
        "open source AI",
        "Meta",
        "Facebook AI",
        "large language models"
      ],
      sameAs: [
        "https://www.wikidata.org/wiki/Q380",
        "https://en.wikipedia.org/wiki/Meta_AI"
      ]
    },
    "Tools & Apps": {
      description: "Reviews, comparisons, and release coverage of AI-powered tools, productivity applications, developer utilities, and consumer AI products.",
      keywords: [
        "AI tools",
        "AI apps",
        "AI software",
        "productivity AI",
        "AI assistants",
        "developer tools"
      ],
      sameAs: []
    },
    "Policy & Ethics": {
      description: "Reporting on artificial intelligence regulation, governance frameworks, safety research, ethical debates, and legislative developments worldwide.",
      keywords: [
        "AI policy",
        "AI regulation",
        "AI ethics",
        "AI governance",
        "AI safety",
        "EU AI Act"
      ],
      sameAs: ["https://www.wikidata.org/wiki/Q30059493"]
    }
  };
  const meta = topicMeta[tag] ?? {
    description: `The latest ${tag} news, research and updates from Daily AI Mail.`,
    keywords: [tag, "AI", "artificial intelligence"],
    sameAs: []
  };
  const itemList = {
    "@type": "ItemList",
    "@id": `${catUrl}#itemlist`,
    name: `${tag} Articles — Daily AI Mail`,
    description: `A curated list of ${count} article${count !== 1 ? "s" : ""} covering ${tag}.`,
    numberOfItems: count,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: articles.sort((a, b) => b.isoDate.localeCompare(a.isoDate)).map((article, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/articles/${article.slug}`,
      name: article.headline,
      item: {
        "@type": "NewsArticle",
        "@id": `${siteUrl}/articles/${article.slug}#article`,
        headline: article.headline,
        description: article.excerpt,
        datePublished: `${article.isoDate}T00:00:00+00:00`,
        dateModified: `${article.modifiedDate ?? article.isoDate}T00:00:00+00:00`,
        url: `${siteUrl}/articles/${article.slug}`,
        author: { "@id": `${siteUrl}/#/schema/person/editorial-team` },
        publisher: { "@id": `${siteUrl}/#organization` },
        image: article.image ? `${siteUrl}${article.image}` : void 0
      }
    }))
  };
  const definedTerm = {
    "@type": "DefinedTerm",
    "@id": `${catUrl}#topic`,
    name: tag,
    description: meta.description,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${siteUrl}/#topics`,
      name: "Daily AI Mail Topic Taxonomy",
      url: `${siteUrl}/`
    },
    ...meta.sameAs.length > 0 && { sameAs: meta.sameAs }
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. CollectionPage — the category page itself
      {
        "@type": "CollectionPage",
        "@id": catUrl,
        url: catUrl,
        name: `${tag} News & Research — Daily AI Mail`,
        headline: `${tag} News`,
        description: meta.description,
        abstract: `Daily AI Mail's ${tag} coverage includes breaking news, in-depth analysis, research summaries, and product updates. All articles are written and edited to editorial standards by the Daily AI Mail team.`,
        keywords: meta.keywords,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${catUrl}#topic` },
        hasPart: { "@id": `${catUrl}#itemlist` },
        breadcrumb: { "@id": `${catUrl}#breadcrumb` },
        image: { "@id": `${siteUrl}/#/schema/logo/image/` },
        thumbnailUrl: logoUrl,
        dateModified,
        publisher: { "@id": `${siteUrl}/#organization` },
        creator: { "@id": `${siteUrl}/#organization` },
        copyrightHolder: { "@id": `${siteUrl}/#organization` },
        copyrightYear: "2026",
        license: `${siteUrl}/terms-and-conditions`,
        isAccessibleForFree: true,
        accessMode: ["textual"],
        accessModeSufficient: [
          { "@type": "ItemList", itemListElement: ["textual"] }
        ],
        // Audience signals — tells crawlers who this content serves
        audience: {
          "@type": "Audience",
          audienceType: "Researchers, engineers, business leaders, and policymakers following artificial intelligence developments",
          geographicArea: {
            "@type": "AdministrativeArea",
            name: "Worldwide"
          }
        },
        // Speakable — marks the h1 and description as safe for voice/TTS surfaces
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".cat-title", ".cat-subtitle"]
        },
        // potentialAction — ReadAction marks this as content meant to be consumed
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [catUrl]
          }
        ],
        // significantLinks — the top 3 most recent articles
        significantLink: articles.sort((a, b) => b.isoDate.localeCompare(a.isoDate)).slice(0, 3).map((a) => `${siteUrl}/articles/${a.slug}`),
        // mentions — every distinct author and the topic entity
        mentions: [
          { "@id": `${siteUrl}/#/schema/person/editorial-team` },
          { "@id": `${catUrl}#topic` }
        ]
      },
      // 2. DefinedTerm — the topic as a semantic entity
      definedTerm,
      // 3. ItemList — machine-readable article index for this category
      itemList,
      // 4. BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": `${catUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: `${tag} News`, item: catUrl }
        ]
      },
      // 5. WebSite
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Daily AI Mail",
        description: "Your daily source for AI news, research and tools.",
        publisher: { "@id": `${siteUrl}/#organization` },
        alternateName: "Daily AI Mail",
        inLanguage: "en-US",
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
        ]
      },
      // 6. NewsMediaOrganization
      {
        "@type": "NewsMediaOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "Daily AI Mail",
        url: `${siteUrl}/`,
        foundingDate: "2026",
        publishingPrinciples: `${siteUrl}/publishing-principles`,
        logo: {
          "@type": "ImageObject",
          inLanguage: "en-US",
          "@id": `${siteUrl}/#/schema/logo/image/`,
          url: logoUrl,
          contentUrl: logoUrl,
          width: 512,
          height: 512,
          caption: "Daily AI Mail"
        },
        image: { "@id": `${siteUrl}/#/schema/logo/image/` },
        sameAs: [
          "https://twitter.com/dailyaimail",
          "https://linkedin.com/company/dailyaimail",
          ""
        ]
      },
      // 7. Person (author / editor)
      {
        "@type": "Organization",
        "@id": "https://dailyaimail.news/#/schema/editorial-team",
        "name": "Daily AI Mail Editorial Staff",
        "alternateName": ["Daily AI Mail Editors", "Daily AI Mail Staff Writers", "The Editors"],
        "url": "https://dailyaimail.news/about-us/editorial-team",
        "description": "The Daily AI Mail editorial staff is an independent team of AI journalists, researchers, and analysts with over 15 years of experience covering artificial intelligence, machine learning, and emerging technologies.",
        "memberOf": { "@id": "https://dailyaimail.news/#organization" },
        "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Large Language Models", "AI Safety", "Generative AI", "AI Policy", "AI Ethics", "Neural Networks", "Natural Language Processing", "AI Research", "Technology Journalism"],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Experience",
          "description": "Over 15 years of professional experience in AI journalism and technology reporting"
        },
        "publishingPrinciples": "https://dailyaimail.news/publishing-principles",
        "sameAs": [
          "https://www.facebook.com/dailyaimail/",
          "https://www.linkedin.com/company/dailaimail/",
          "https://x.com/dailyaimail",
          "https://medium.com/@dailyaimail",
          "https://www.reddit.com/user/dailyaimail/"
        ]
      }
    ]
  };
  if (page && page.currentPage > 1) {
    schema["@graph"].push({
      "@type": "CollectionPage",
      "@id": catUrl,
      "url": catUrl,
      "isPartOf": { "@id": baseCatUrl },
      "name": `${tag} News — Page ${page.currentPage} — Daily AI Mail`
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${tag} News — Daily AI Mail`, "description": meta.description, "metaTitle": `${tag} News & Research — Daily AI Mail`, "data-astro-cid-5stfgk4a": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="cat-hero"${addAttribute(`background: linear-gradient(135deg, ${color}12 0%, transparent 60%); border-bottom: 2px solid ${color}25;`, "style")} data-pagefind-ignore data-astro-cid-5stfgk4a> <div class="cat-hero-inner" data-astro-cid-5stfgk4a> <span class="cat-tag"${addAttribute(`background: ${color}18; color: ${color};`, "style")} data-astro-cid-5stfgk4a>${tag}</span> <h1 class="cat-title" data-astro-cid-5stfgk4a>${tag} News</h1> <p class="cat-subtitle" data-astro-cid-5stfgk4a> ${count} article${count !== 1 ? "s" : ""} · Updated daily
</p> </div> </div>  <div class="cat-content" data-pagefind-ignore data-astro-cid-5stfgk4a> <div class="cat-inner" data-astro-cid-5stfgk4a> <div class="cat-grid" data-astro-cid-5stfgk4a> ${articles.map((a) => renderTemplate`${renderComponent($$result2, "NewsCard", $$NewsCard, { "tag": a.tag, "headline": a.headline, "excerpt": a.excerpt, "date": a.date, "author": a.author, "readingTime": a.readingTime, "href": `/articles/${a.slug}`, "data-astro-cid-5stfgk4a": true })}`)} </div> ${page && renderTemplate`${renderComponent($$result2, "PaginationNav", $$PaginationNav, { "page": page, "data-astro-cid-5stfgk4a": true })}`} </div> </div> `, "head": ($$result2) => renderTemplate(_a || (_a = __template(["", "", '<script type="application/ld+json">', "<\/script>"])), page && page.url.prev && renderTemplate`<link rel="prev"${addAttribute(page.url.prev, "href")}>`, page && page.url.next && renderTemplate`<link rel="next"${addAttribute(page.url.next, "href")}>`, unescapeHTML(JSON.stringify(schema))) })}`;
}, "D:/AI News/dailyaimail/src/layouts/CategoryLayout.astro", void 0);
export {
  $$CategoryLayout as $
};
