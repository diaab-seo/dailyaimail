// src/lib/explainers-schema.ts

const SITE_URL = "https://dailyaimail.news";

// ── Shared reference helpers (mirrors existing schema lib) ────────────────────
function websiteRef() {
    return { "@id": `${SITE_URL}/#website` };
}
function orgRef() {
    return { "@id": `${SITE_URL}/#organization` };
}
function editorialTeamRef() {
    return { "@id": `${SITE_URL}/#/schema/editorial-team` };
}

// The canonical @id for the DefinedTermSet (hub)
export const TERM_SET_ID = `${SITE_URL}/explainers/#termset`;

// ── Hub page schema ───────────────────────────────────────────────────────────
export interface TermStub {
    slug: string;
    term: string;
    abbreviation?: string;
    category: string;
    definition: string;
}

export function buildExplainersHubSchema(terms: TermStub[]): object {
    const pageUrl = `${SITE_URL}/explainers`;

    // Every DefinedTerm's @id referenced from the hub (forward relationship)
    const hasDefinedTerm = terms.map(t => ({
        "@id": `${SITE_URL}/explainers/${t.slug}#term`,
    }));

    return {
        "@context": "https://schema.org",
        "@graph": [
            // 1. CollectionPage (WebPage subtype)
            {
                "@type": "CollectionPage",
                "@id": pageUrl,
                "url": pageUrl,
                "name": "AI Explainers — Daily AI Mail",
                "description": "Plain-language definitions of every key term in artificial intelligence — from LLMs to agents, training to safety alignment.",
                "isPartOf": websiteRef(),
                "publisher": orgRef(),
                "author": editorialTeamRef(),
                "datePublished": "2026-03-26T00:00:00+00:00",
                "dateModified": new Date().toISOString(),
                "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
                "isAccessibleForFree": true,
                "inLanguage": "en-US",
                "mainEntity": { "@id": TERM_SET_ID },
            },

            // 2. DefinedTermSet — the hub node; owns all terms
            {
                "@type": "DefinedTermSet",
                "@id": TERM_SET_ID,
                "name": "Daily AI Mail AI Glossary",
                "description": "A comprehensive, evergreen glossary of artificial intelligence terms maintained by the Daily AI Mail editorial staff.",
                "url": `${SITE_URL}/explainers`,
                "publisher": orgRef(),
                "inLanguage": "en-US",
                // Forward relationship → all DefinedTerm nodes
                "hasDefinedTerm": hasDefinedTerm,
            },

            // 3. WebSite — shared node
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                "url": `${SITE_URL}/`,
                "name": "Daily AI Mail",
                "description": "Independent AI news, analysis, and explainers.",
                "publisher": orgRef(),
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${SITE_URL}/?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                },
                "inLanguage": "en-US",
            },

            // 4. Organization — lightweight reference
            {
                ...orgRef(),
                "@type": "Organization",
                "name": "Daily AI Mail",
                "url": `${SITE_URL}/`,
                "logo": { "@id": `${SITE_URL}/#/schema/logo/image/` },
                "sameAs": [
                    "https://twitter.com/dailyaimail",
                    "https://linkedin.com/company/dailyaimail",
                ],
            },

            // 5. Editorial Team reference
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#/schema/editorial-team`,
                "name": "Daily AI Mail Editorial Staff",
                "url": `${SITE_URL}/about-us/editorial-team`,
                "memberOf": orgRef(),
            },

            // 6. BreadcrumbList — Home → Explainers
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": `${SITE_URL}/`,
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Explainers",
                        "item": pageUrl,
                    },
                ],
            },
        ],
    };
}

// ── Individual term page schema ───────────────────────────────────────────────
export interface TermData {
    slug: string;
    term: string;
    abbreviation?: string;
    category: string;
    definition: string;
    dateAdded: string;
    lastUpdated?: string;
    relatedTerms?: string[];
    seoTitle?: string;
    seoDescription?: string;
}

export function buildExplainerTermSchema(term: TermData): object {
    const pageUrl  = `${SITE_URL}/explainers/${term.slug}`;
    const termId   = `${pageUrl}#term`;
    const pubDate  = `${term.dateAdded}T00:00:00+00:00`;
    const modDate  = term.lastUpdated
        ? `${term.lastUpdated}T00:00:00+00:00`
        : pubDate;

    // Inverse relationship: this term → the DefinedTermSet hub
    const inDefinedTermSet = {
        "@type": "DefinedTermSet",
        "@id": TERM_SET_ID,
        "name": "Daily AI Mail AI Glossary",
        "url": `${SITE_URL}/explainers`,
    };

    // Optional: related terms as DefinedTerm stubs
    const relatedNodes = (term.relatedTerms ?? []).map(slug => ({
        "@type": "DefinedTerm",
        "@id": `${SITE_URL}/explainers/${slug}#term`,
        "url": `${SITE_URL}/explainers/${slug}`,
    }));

    return {
        "@context": "https://schema.org",
        "@graph": [
            // 1. WebPage for this term
            {
                "@type": "WebPage",
                "@id": pageUrl,
                "url": pageUrl,
                "name": term.seoTitle ?? `${term.term}${term.abbreviation ? ` (${term.abbreviation})` : ''} — Daily AI Mail`,
                "description": term.seoDescription ?? term.definition,
                "publisher": orgRef(),
                "author": editorialTeamRef(),
                "datePublished": pubDate,
                "dateModified": modDate,
                "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
                "isAccessibleForFree": true,
                "inLanguage": "en-US",
                "mainEntity": { "@id": termId },
                // This page is part of the DefinedTermSet's collection page
                "isPartOf": [websiteRef(), { "@id": `${SITE_URL}/explainers` }],
            },

            // 2. DefinedTerm — the term node itself (INVERSE relationship back to hub)
            {
                "@type": "DefinedTerm",
                "@id": termId,
                "name": term.term,
                ...(term.abbreviation ? { "alternateName": term.abbreviation } : {}),
                "description": term.definition,
                "url": pageUrl,
                // Inverse: DefinedTerm → DefinedTermSet (bidirectional link)
                "inDefinedTermSet": inDefinedTermSet,
                // termCode = slug, useful for crawlers
                "termCode": term.slug,
                ...(relatedNodes.length > 0 ? { "sameAs": relatedNodes.map(r => r.url) } : {}),
            },

            // 3. WebSite — shared node
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                "url": `${SITE_URL}/`,
                "name": "Daily AI Mail",
                "publisher": orgRef(),
                "inLanguage": "en-US",
            },

            // 4. Organization — lightweight reference
            {
                ...orgRef(),
                "@type": "Organization",
                "name": "Daily AI Mail",
                "url": `${SITE_URL}/`,
                "logo": { "@id": `${SITE_URL}/#/schema/logo/image/` },
                "sameAs": [
                    "https://twitter.com/dailyaimail",
                    "https://linkedin.com/company/dailyaimail",
                ],
            },

            // 5. Editorial Team reference
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#/schema/editorial-team`,
                "name": "Daily AI Mail Editorial Staff",
                "url": `${SITE_URL}/about-us/editorial-team`,
                "memberOf": orgRef(),
            },

            // 6. BreadcrumbList — Home → Explainers → Term
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": `${SITE_URL}/`,
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Explainers",
                        "item": `${SITE_URL}/explainers`,
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": term.term,
                        "item": pageUrl,
                    },
                ],
            },
        ],
    };
}
