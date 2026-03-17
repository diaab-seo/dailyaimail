/**
 * src/utils/schema.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Central structured data factory for Daily AI Mail.
 *
 * ARCHITECTURE
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  Full entity definitions live on:                                        │
 * │    Homepage    → #website, #organization, #person, #topics, #navigation  │
 * │    About Us    → #organization (deepest), #person (deepest)              │
 * │                                                                           │
 * │  All other pages use lightweight reference nodes — @type + @id only —    │
 * │  pointing back to the canonical definitions. Google merges them.         │
 * │                                                                           │
 * │  Every page gets: WebPage/subtype, BreadcrumbList, WebSite ref,          │
 * │  Organization ref, Person ref.                                            │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

export const SITE_URL = "https://dailyaimail.com";
export const LOGO_URL = `${SITE_URL}/logo.png`;

// ── Lightweight reference nodes (used on secondary pages) ─────────────────────
// These @id pointers tell crawlers "the full definition is elsewhere on this site"

export const orgRef = () => ({
    "@type": "NewsMediaOrganization",
    "@id": `${SITE_URL}/#organization`,
});

export const websiteRef = () => ({
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
});

export const personRef = () => ({
    "@type": "Person",
    "@id": `${SITE_URL}/#/schema/person/mohamed-diab`,
});

// ── BreadcrumbList factory ─────────────────────────────────────────────────────

type BreadcrumbItem = { name: string; url?: string };

export function breadcrumbList(pageId: string, items: BreadcrumbItem[]) {
    return {
        "@type": "BreadcrumbList",
        "@id": `${pageId}#breadcrumb`,
        "itemListElement": items.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.name,
            ...(item.url && { "item": item.url }),
        })),
    };
}

// ── Page type configurations ───────────────────────────────────────────────────

type PageConfig = {
    schemaType: string;     // Schema.org @type
    urlPath: string;     // e.g. /contact-us
    name: string;     // <title>-level name
    description: string;
    publishDate: string;     // ISO date
    modifiedDate: string;
    breadcrumbLabel: string;  // label for the breadcrumb leaf node
};

// ── Main builder ───────────────────────────────────────────────────────────────

export function buildPageSchema(cfg: PageConfig) {
    const pageUrl = `${SITE_URL}${cfg.urlPath}`;

    // Every page type shares these four nodes.
    // The WebPage/subtype node is the only one that varies.
    const sharedNodes = [
        // 1. WebSite — lightweight reference back to homepage canonical
        {
            ...websiteRef(),
            "url": `${SITE_URL}/`,
            "name": "Daily AI Mail",
            "description": "Your daily source for AI news, research and tools.",
            "publisher": { "@id": `${SITE_URL}/#organization` },
        },

        // 2. Organization — lightweight reference; full def on Homepage + About Us
        {
            ...orgRef(),
            "name": "Daily AI Mail",
            "url": `${SITE_URL}/`,
            "logo": { "@id": `${SITE_URL}/#/schema/logo/image/` },
            "sameAs": ["https://twitter.com/dailyaimail", "https://linkedin.com/company/dailyaimail"],
        },

        // 3. Person — lightweight reference; full def on Homepage + About Us
        {
            ...personRef(),
            "name": "Mohamed Diab",
            "url": "https://interactiveseo.digital",
        },

        // 4. BreadcrumbList — Home → This page
        breadcrumbList(pageUrl, [
            { name: "Home", url: `${SITE_URL}/` },
            { name: cfg.breadcrumbLabel, url: pageUrl },
        ]),
    ];

    // WebPage subtype node — unique per page type
    const webPageNode: Record<string, unknown> = {
        "@type": cfg.schemaType,
        "@id": pageUrl,
        "url": pageUrl,
        "name": cfg.name,
        "description": cfg.description,
        "inLanguage": "en-US",
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "publisher": { "@id": `${SITE_URL}/#organization` },
        "author": { "@id": `${SITE_URL}/#/schema/person/mohamed-diab` },
        "datePublished": `${cfg.publishDate}T00:00:00+00:00`,
        "dateModified": `${cfg.modifiedDate}T00:00:00+00:00`,
        "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
        "isAccessibleForFree": true,
        "inLanguage": "en-US",
    };

    // ── Per-type extra properties ──────────────────────────────────────────────
    // Each page type adds the properties that make semantic sense for it.
    // Nothing here is invented — all are valid Schema.org properties.

    if (cfg.schemaType === "ContactPage") {
        // ContactPage — links to contact mechanisms + org
        webPageNode["mainEntity"] = orgRef();
        webPageNode["about"] = orgRef();
        webPageNode["mentions"] = [orgRef(), personRef()];
        webPageNode["potentialAction"] = [
            {
                "@type": "CommunicateAction",
                "target": `${SITE_URL}/contact-us`,
                "name": "Contact Daily AI Mail",
            }
        ];
    }

    if (cfg.schemaType === "WebPage" && cfg.urlPath === "/publishing-principles") {
        // Publishing Principles — a journalism-specific editorial policy document
        // These properties are read by Google News publisher evaluation
        webPageNode["about"] = orgRef();
        webPageNode["mainEntity"] = orgRef();
        webPageNode["genre"] = "Editorial Policy";
        webPageNode["keywords"] = ["editorial standards", "publishing principles", "corrections policy", "editorial independence", "source attribution"];
        webPageNode["teaches"] = "Daily AI Mail editorial standards and publishing principles";
        webPageNode["mentions"] = [orgRef(), personRef()];
        // Explicitly connects this page to the org's journalism policy properties
        // referenced from the org node on About Us + Homepage
        webPageNode["relatedLink"] = [
            `${SITE_URL}/about-us`,
            `${SITE_URL}/contact-us`,
        ];
    }

    if (cfg.schemaType === "WebPage" && cfg.urlPath === "/privacy-policy") {
        webPageNode["about"] = orgRef();
        webPageNode["genre"] = "Privacy Policy";
        webPageNode["keywords"] = ["privacy policy", "data protection", "GDPR", "personal data", "cookies"];
        webPageNode["relatedLink"] = [
            `${SITE_URL}/cookies-policy`,
            `${SITE_URL}/terms-and-conditions`,
        ];
    }

    if (cfg.schemaType === "WebPage" && cfg.urlPath === "/cookies-policy") {
        webPageNode["about"] = orgRef();
        webPageNode["genre"] = "Cookie Policy";
        webPageNode["keywords"] = ["cookies", "cookie policy", "tracking", "analytics", "consent"];
        webPageNode["relatedLink"] = [
            `${SITE_URL}/privacy-policy`,
            `${SITE_URL}/terms-and-conditions`,
        ];
    }

    if (cfg.schemaType === "WebPage" && cfg.urlPath === "/terms-and-conditions") {
        webPageNode["about"] = orgRef();
        webPageNode["genre"] = "Terms and Conditions";
        webPageNode["keywords"] = ["terms and conditions", "terms of use", "intellectual property", "disclaimer", "legal"];
        webPageNode["relatedLink"] = [
            `${SITE_URL}/privacy-policy`,
            `${SITE_URL}/publishing-principles`,
        ];
    }

    return {
        "@context": "https://schema.org",
        "@graph": [webPageNode, ...sharedNodes],
    };
}

// ── Frontmatter schemaType → page config map ──────────────────────────────────
// PageLayout.astro calls this with the frontmatter values.
// Add new pages here — no other file needs changing.

export function resolvePageSchema(
    schemaType: string | null,
    frontmatter: {
        title: string;
        description: string;
        publishDate: string;
        lastModified: string;
        metaTitle?: string;
    }
): object | null {

    const pub = (frontmatter.publishDate ?? "2026-01-01").replace(/\//g, "-");
    const mod = (frontmatter.lastModified ?? "2026-03-15").replace(/\//g, "-");

    const configs: Record<string, PageConfig> = {

        "contact": {
            schemaType: "ContactPage",
            urlPath: "/contact-us",
            name: frontmatter.metaTitle ?? "Contact Daily AI Mail",
            description: frontmatter.description,
            publishDate: pub,
            modifiedDate: mod,
            breadcrumbLabel: "Contact Us",
        },

        "publishing-principles": {
            schemaType: "WebPage",
            urlPath: "/publishing-principles",
            name: frontmatter.metaTitle ?? "Publishing Principles — Daily AI Mail",
            description: frontmatter.description,
            publishDate: pub,
            modifiedDate: mod,
            breadcrumbLabel: "Publishing Principles",
        },

        "privacy": {
            schemaType: "WebPage",
            urlPath: "/privacy-policy",
            name: frontmatter.metaTitle ?? "Privacy Policy — Daily AI Mail",
            description: frontmatter.description,
            publishDate: pub,
            modifiedDate: mod,
            breadcrumbLabel: "Privacy Policy",
        },

        "cookies": {
            schemaType: "WebPage",
            urlPath: "/cookies-policy",
            name: frontmatter.metaTitle ?? "Cookies Policy — Daily AI Mail",
            description: frontmatter.description,
            publishDate: pub,
            modifiedDate: mod,
            breadcrumbLabel: "Cookies Policy",
        },

        "terms": {
            schemaType: "WebPage",
            urlPath: "/terms-and-conditions",
            name: frontmatter.metaTitle ?? "Terms and Conditions — Daily AI Mail",
            description: frontmatter.description,
            publishDate: pub,
            modifiedDate: mod,
            breadcrumbLabel: "Terms and Conditions",
        },

    };

    const cfg = configs[schemaType ?? ""];
    if (!cfg) return null;
    return buildPageSchema(cfg);
}