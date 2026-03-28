globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_DwN0t49P.mjs";
import { r as renderComponent, a as renderTemplate, u as unescapeHTML, m as maybeRenderHead, c as renderSlot } from "./worker-entry_DXJ3ent8.mjs";
import { $ as $$Layout } from "./Layout_CfcrD1Rq.mjs";
import { $ as $$Breadcrumb } from "./Breadcrumb_DX5qwp6P.mjs";
const SITE_URL = "https://dailyaimail.news";
const orgRef = () => ({
  "@type": "NewsMediaOrganization",
  "@id": `${SITE_URL}/#organization`
});
const websiteRef = () => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`
});
const editorialTeamRef = () => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#/schema/editorial-team`
});
function breadcrumbList(pageId, items) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageId}#breadcrumb`,
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      ...item.url && { "item": item.url }
    }))
  };
}
function buildPageSchema(cfg) {
  const pageUrl = `${SITE_URL}${cfg.urlPath}`;
  const sharedNodes = [
    // 1. WebSite — lightweight reference back to homepage canonical
    {
      ...websiteRef(),
      "url": `${SITE_URL}/`,
      "name": "Daily AI Mail",
      "description": "Your daily source for AI news, research and tools.",
      "publisher": { "@id": `${SITE_URL}/#organization` }
    },
    // 2. Organization — lightweight reference; full def on Homepage + About Us
    {
      ...orgRef(),
      "name": "Daily AI Mail",
      "url": `${SITE_URL}/`,
      "logo": { "@id": `${SITE_URL}/#/schema/logo/image/` },
      "sameAs": ["https://twitter.com/dailyaimail", "https://linkedin.com/company/dailyaimail"]
    },
    // 3. Editorial Team
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#/schema/editorial-team`,
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
    },
    // 4. BreadcrumbList — Home → This page
    breadcrumbList(pageUrl, [
      { name: "Home", url: `${SITE_URL}/` },
      { name: cfg.breadcrumbLabel, url: pageUrl }
    ])
  ];
  const webPageNode = {
    "@type": cfg.schemaType,
    "@id": pageUrl,
    "url": pageUrl,
    "name": cfg.name,
    "description": cfg.description,
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "author": { "@id": "https://dailyaimail.news/#/schema/editorial-team" },
    "datePublished": `${cfg.publishDate}T00:00:00+00:00`,
    "dateModified": `${cfg.modifiedDate}T00:00:00+00:00`,
    "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
    "isAccessibleForFree": true,
    "inLanguage": "en-US"
  };
  if (cfg.schemaType === "ContactPage") {
    webPageNode["mainEntity"] = orgRef();
    webPageNode["about"] = orgRef();
    webPageNode["mentions"] = [orgRef(), editorialTeamRef()];
    webPageNode["potentialAction"] = [
      {
        "@type": "CommunicateAction",
        "target": `${SITE_URL}/contact-us`,
        "name": "Contact Daily AI Mail"
      }
    ];
  }
  if (cfg.schemaType === "WebPage" && cfg.urlPath === "/publishing-principles") {
    webPageNode["about"] = orgRef();
    webPageNode["mainEntity"] = orgRef();
    webPageNode["genre"] = "Editorial Policy";
    webPageNode["keywords"] = ["editorial standards", "publishing principles", "corrections policy", "editorial independence", "source attribution"];
    webPageNode["teaches"] = "Daily AI Mail editorial standards and publishing principles";
    webPageNode["mentions"] = [orgRef(), editorialTeamRef()];
    webPageNode["relatedLink"] = [
      `${SITE_URL}/about-us`,
      `${SITE_URL}/contact-us`
    ];
  }
  if (cfg.schemaType === "WebPage" && cfg.urlPath === "/privacy-policy") {
    webPageNode["about"] = orgRef();
    webPageNode["genre"] = "Privacy Policy";
    webPageNode["keywords"] = ["privacy policy", "data protection", "GDPR", "personal data", "cookies"];
    webPageNode["relatedLink"] = [
      `${SITE_URL}/cookies-policy`,
      `${SITE_URL}/terms-and-conditions`
    ];
  }
  if (cfg.schemaType === "WebPage" && cfg.urlPath === "/cookies-policy") {
    webPageNode["about"] = orgRef();
    webPageNode["genre"] = "Cookie Policy";
    webPageNode["keywords"] = ["cookies", "cookie policy", "tracking", "analytics", "consent"];
    webPageNode["relatedLink"] = [
      `${SITE_URL}/privacy-policy`,
      `${SITE_URL}/terms-and-conditions`
    ];
  }
  if (cfg.schemaType === "WebPage" && cfg.urlPath === "/terms-and-conditions") {
    webPageNode["about"] = orgRef();
    webPageNode["genre"] = "Terms and Conditions";
    webPageNode["keywords"] = ["terms and conditions", "terms of use", "intellectual property", "disclaimer", "legal"];
    webPageNode["relatedLink"] = [
      `${SITE_URL}/privacy-policy`,
      `${SITE_URL}/publishing-principles`
    ];
  }
  return {
    "@context": "https://schema.org",
    "@graph": [webPageNode, ...sharedNodes]
  };
}
function resolvePageSchema(schemaType, frontmatter) {
  const pub = (frontmatter.publishDate ?? "2026-01-01").replace(/\//g, "-");
  const mod = (frontmatter.lastModified ?? "2026-03-15").replace(/\//g, "-");
  const configs = {
    "contact": {
      schemaType: "ContactPage",
      urlPath: "/contact-us",
      name: frontmatter.metaTitle ?? "Contact Daily AI Mail",
      description: frontmatter.description,
      publishDate: pub,
      modifiedDate: mod,
      breadcrumbLabel: "Contact Us"
    },
    "publishing-principles": {
      schemaType: "WebPage",
      urlPath: "/publishing-principles",
      name: frontmatter.metaTitle ?? "Publishing Principles — Daily AI Mail",
      description: frontmatter.description,
      publishDate: pub,
      modifiedDate: mod,
      breadcrumbLabel: "Publishing Principles"
    },
    "privacy": {
      schemaType: "WebPage",
      urlPath: "/privacy-policy",
      name: frontmatter.metaTitle ?? "Privacy Policy — Daily AI Mail",
      description: frontmatter.description,
      publishDate: pub,
      modifiedDate: mod,
      breadcrumbLabel: "Privacy Policy"
    },
    "cookies": {
      schemaType: "WebPage",
      urlPath: "/cookies-policy",
      name: frontmatter.metaTitle ?? "Cookies Policy — Daily AI Mail",
      description: frontmatter.description,
      publishDate: pub,
      modifiedDate: mod,
      breadcrumbLabel: "Cookies Policy"
    },
    "terms": {
      schemaType: "WebPage",
      urlPath: "/terms-and-conditions",
      name: frontmatter.metaTitle ?? "Terms and Conditions — Daily AI Mail",
      description: frontmatter.description,
      publishDate: pub,
      modifiedDate: mod,
      breadcrumbLabel: "Terms and Conditions"
    }
  };
  const cfg = configs[schemaType ?? ""];
  if (!cfg) return null;
  return buildPageSchema(cfg);
}
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$PageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PageLayout;
  const fm = Astro2.props.frontmatter ?? {};
  const title = Astro2.props.title ?? fm.title;
  const description = Astro2.props.description ?? fm.description;
  const metaTitle = Astro2.props.metaTitle ?? fm.metaTitle;
  const publishDate = Astro2.props.publishDate ?? fm.publishDate;
  const lastModified = Astro2.props.lastModified ?? fm.lastModified;
  const author = Astro2.props.author ?? fm.author;
  const schemaType = Astro2.props.schemaType ?? fm.schemaType ?? null;
  const SITE_URL2 = "https://dailyaimail.news";
  const pubIso = (publishDate ?? "2026-01-01").replace(/\//g, "-");
  const modIso = (lastModified ?? "2026-03-15").replace(/\//g, "-");
  const logoUrl = `${SITE_URL2}/dark-logo.svg`;
  const breadcrumbMap = {
    about: { label: "About Us", href: "/about-us" },
    contact: { label: "Contact Us", href: "/contact-us" },
    "publishing-principles": {
      label: "Publishing Principles",
      href: "/publishing-principles"
    },
    privacy: { label: "Privacy Policy", href: "/privacy-policy" },
    cookies: { label: "Cookies Policy", href: "/cookies-policy" },
    terms: { label: "Terms & Conditions", href: "/terms-and-conditions" }
  };
  const crumb = breadcrumbMap[schemaType ?? ""];
  let pageSchema = null;
  if (schemaType === "about") {
    pageSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AboutPage",
          "@id": `${SITE_URL2}/about-us`,
          url: `${SITE_URL2}/about-us`,
          name: metaTitle ?? "About Daily AI Mail",
          description: description ?? "Daily AI Mail is an independent publication covering artificial intelligence news.",
          inLanguage: "en-US",
          isPartOf: { "@id": `${SITE_URL2}/#website` },
          mainEntity: { "@id": `${SITE_URL2}/#organization` },
          about: { "@id": `${SITE_URL2}/#organization` },
          author: { "@id": "https://dailyaimail.news/#/schema/editorial-team" },
          publisher: { "@id": `${SITE_URL2}/#organization` },
          datePublished: `${pubIso}T00:00:00+00:00`,
          dateModified: `${modIso}T00:00:00+00:00`,
          breadcrumb: { "@id": `${SITE_URL2}/about-us#breadcrumb` },
          isAccessibleForFree: true,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".page-title"]
          },
          relatedLink: [
            `${SITE_URL2}/publishing-principles`,
            `${SITE_URL2}/contact-us`
          ],
          mentions: [
            { "@id": "https://dailyaimail.news/#/schema/editorial-team" },
            { "@id": `${SITE_URL2}/#organization` }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${SITE_URL2}/about-us#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${SITE_URL2}/`
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "About Us",
              item: `${SITE_URL2}/about-us`
            }
          ]
        },
        {
          "@type": "NewsMediaOrganization",
          "@id": `${SITE_URL2}/#organization`,
          name: "Daily AI Mail",
          url: `${SITE_URL2}/`,
          foundingDate: "2026-01-01",
          description: "Daily AI Mail is an independent digital publication covering the global artificial intelligence industry.",
          publishingPrinciples: `${SITE_URL2}/publishing-principles`,
          ethicsPolicy: `${SITE_URL2}/publishing-principles`,
          masthead: `${SITE_URL2}/about-us`,
          correctionsPolicy: `${SITE_URL2}/publishing-principles`,
          missionCoveragePrioritiesPolicy: `${SITE_URL2}/publishing-principles`,
          logo: {
            "@type": "ImageObject",
            "@id": `${SITE_URL2}/#/schema/logo/image/`,
            url: logoUrl,
            contentUrl: logoUrl,
            width: 512,
            height: 512,
            caption: "Daily AI Mail"
          },
          image: { "@id": `${SITE_URL2}/#/schema/logo/image/` },
          member: { "@id": "https://dailyaimail.news/#/schema/editorial-team" },
          subjectOf: { "@id": `${SITE_URL2}/about-us` },
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "editorial@dailyaimail.news",
              contactType: "editorial"
            },
            {
              "@type": "ContactPoint",
              email: "press@dailyaimail.news",
              contactType: "press"
            },
            {
              "@type": "ContactPoint",
              email: "corrections@dailyaimail.news",
              contactType: "corrections"
            }
          ],
          knowsAbout: [
            "Artificial Intelligence",
            "Machine Learning",
            "Large Language Models",
            "AI Safety",
            "Generative AI",
            "AI Policy"
          ],
          sameAs: [
            "https://twitter.com/dailyaimail",
            "https://linkedin.com/company/dailyaimail"
          ]
        },
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
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL2}/#website`,
          url: `${SITE_URL2}/`,
          name: "Daily AI Mail",
          publisher: { "@id": `${SITE_URL2}/#organization` }
        }
      ]
    };
  } else {
    pageSchema = resolvePageSchema(schemaType, {
      description: description ?? "",
      publishDate: pubIso,
      lastModified: modIso,
      metaTitle
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "metaTitle": metaTitle, "canonical": `${SITE_URL2}${crumb?.href ?? ""}`, "ogTitle": metaTitle ?? title, "ogDescription": description, "data-astro-cid-3zbxo6iv": true }, { "default": ($$result2) => renderTemplate`${crumb && renderTemplate`${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "items": [{ label: "Home", href: "/" }, { label: crumb.label }], "data-astro-cid-3zbxo6iv": true })}`}${maybeRenderHead()}<main class="page-main" data-astro-cid-3zbxo6iv> <div class="page-container" data-astro-cid-3zbxo6iv> <header class="page-header" data-astro-cid-3zbxo6iv> <h1 class="page-title" data-astro-cid-3zbxo6iv>${title}</h1> <div class="page-meta" data-astro-cid-3zbxo6iv> ${author && renderTemplate`<span data-astro-cid-3zbxo6iv>By ${author}</span>`} ${publishDate && renderTemplate`<span data-astro-cid-3zbxo6iv>Published ${publishDate}</span>`} ${lastModified && renderTemplate`<span data-astro-cid-3zbxo6iv>Last updated ${lastModified}</span>`} </div> </header> <div class="page-content" data-astro-cid-3zbxo6iv> ${renderSlot($$result2, $$slots["default"])} </div> </div> </main> `, "head": ($$result2) => renderTemplate`${pageSchema && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(pageSchema)))}` })}`;
}, "D:/AI News/dailyaimail/src/layouts/PageLayout.astro", void 0);
export {
  $$PageLayout as $
};
