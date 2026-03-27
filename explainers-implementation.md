# Daily AI Mail — Explainers Implementation
## One-Shot Drop for Claude Sonnet / Antigravity IDE

Execute in this order. Every file is **complete and ready to paste**.

---

## STEP 1 — Modify `src/content.config.ts`

> Add the `explainers` collection after the existing `articles` collection.

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
    schema: z.object({
        tag: z.string(),
        tags: z.array(z.string()).optional(),
        headline: z.string(),
        excerpt: z.string(),
        date: z.string(),
        isoDate: z.string(),
        modifiedDate: z.string().optional(),
        author: z.string(),
        authorUrl: z.string().optional(),
        readingTime: z.string(),
        image: z.string().optional(),
        imageWidth: z.number().optional(),
        imageHeight: z.number().optional(),
        imageCaption: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        articleSection: z.array(z.string()).optional(),
        mentions: z.array(z.object({
            name: z.string(),
            url: z.string(),
            type: z.string(),
            sameAs: z.string().optional(),
        })).optional(),
        about: z.array(z.object({
            name: z.string(),
            url: z.string(),
            type: z.string(),
            sameAs: z.string().optional(),
        })).optional(),
        citations: z.array(z.object({
            name: z.string(),
            url: z.string(),
            type: z.string().optional().default("CreativeWork"),
        })).optional(),
    }),
});

const explainers = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/explainers' }),
    schema: z.object({
        term:           z.string(),
        abbreviation:   z.string().optional(),
        slug:           z.string(),
        category:       z.enum([
            'foundation-models',
            'training',
            'inference',
            'agents',
            'safety-alignment',
            'architecture',
            'data',
            'applications',
        ]),
        definition:     z.string(),           // 1–2 sentence plain-text (tooltip + OG)
        dateAdded:      z.string(),           // ISO date string e.g. "2026-03-26"
        lastUpdated:    z.string().optional(),
        relatedTerms:   z.array(z.string()).optional(), // slugs
        seoTitle:       z.string().optional(),
        seoDescription: z.string().optional(),
    }),
});

export const collections = { articles, explainers };
```

---

## STEP 2 — Create `src/lib/explainers-schema.ts`

> Centralised schema builder. Mirrors the existing `resolvePageSchema` pattern.
> Hub gets `DefinedTermSet` + `hasDefinedTerm[]`. Each term gets `DefinedTerm` + `inDefinedTermSet`.

```ts
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
                "isPartOf": websiteRef(),
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
```

---

## STEP 3 — Create `src/pages/explainers/index.astro`

> Hub page. Alphabetical A–Z list + category groupings. `DefinedTermSet` schema. Static.

```astro
---
// src/pages/explainers/index.astro
import Layout from "../../layouts/Layout.astro";
import { getCollection } from "astro:content";
import { buildExplainersHubSchema } from "../../lib/explainers-schema";

const allTerms = await getCollection("explainers");

// Sort alphabetically by term name
const sorted = [...allTerms].sort((a, b) =>
    a.data.term.localeCompare(b.data.term)
);

// Category display map
const CATEGORY_LABELS: Record<string, string> = {
    "foundation-models":  "Foundation Models",
    "training":           "Training",
    "inference":          "Inference",
    "agents":             "Agents",
    "safety-alignment":   "Safety & Alignment",
    "architecture":       "Architecture",
    "data":               "Data",
    "applications":       "Applications",
};

// Build A–Z groups
const azGroups: Record<string, typeof sorted> = {};
for (const t of sorted) {
    const letter = t.data.term[0].toUpperCase();
    if (!azGroups[letter]) azGroups[letter] = [];
    azGroups[letter].push(t);
}
const letters = Object.keys(azGroups).sort();

// Build category groups
const catGroups: Record<string, typeof sorted> = {};
for (const t of sorted) {
    const cat = t.data.category;
    if (!catGroups[cat]) catGroups[cat] = [];
    catGroups[cat].push(t);
}
const categories = Object.keys(catGroups).sort();

// Schema stubs for DefinedTermSet
const termStubs = sorted.map(t => ({
    slug:         t.data.slug,
    term:         t.data.term,
    abbreviation: t.data.abbreviation,
    category:     t.data.category,
    definition:   t.data.definition,
}));

const schema = buildExplainersHubSchema(termStubs);

const title       = "AI Explainers — Daily AI Mail";
const description = "Plain-language definitions of every key term in artificial intelligence — from LLMs and agents to training and safety alignment.";
---

<Layout title={title} description={description} metaTitle={title}>
    <script
        type="application/ld+json"
        set:html={JSON.stringify(schema)}
        slot="head"
    />
    <link rel="sitemap" href="/sitemap-explainers.xml" slot="head" />

    <main class="explainers-hub">

        <!-- ── Hero ── -->
        <header class="hub-hero">
            <div class="hub-inner">
                <p class="hub-kicker">Reference</p>
                <h1 class="hub-title">AI Explainers</h1>
                <p class="hub-lead">
                    Your guide to every term in AI — plain language, no hype.
                    {sorted.length} concepts and counting.
                </p>
            </div>
        </header>

        <div class="hub-inner hub-body">

            <!-- ── Categories ── -->
            <section class="categories-section" aria-label="Browse by category">
                <h2 class="section-heading">Browse by Category</h2>
                <div class="cat-grid">
                    {categories.map(cat => (
                        <a href={`#cat-${cat}`} class="cat-chip">
                            <span class="cat-label">{CATEGORY_LABELS[cat] ?? cat}</span>
                            <span class="cat-count">{catGroups[cat].length}</span>
                        </a>
                    ))}
                </div>
            </section>

            <!-- ── Category sections ── -->
            {categories.map(cat => (
                <section
                    id={`cat-${cat}`}
                    class="az-section"
                    aria-label={CATEGORY_LABELS[cat] ?? cat}
                >
                    <h2 class="az-letter">{CATEGORY_LABELS[cat] ?? cat}</h2>
                    <ul class="term-list">
                        {catGroups[cat].map(t => (
                            <li class="term-item">
                                <a
                                    href={`/explainers/${t.data.slug}`}
                                    class="term-link"
                                    data-explainer={t.data.slug}
                                >
                                    <span class="term-name">
                                        {t.data.term}
                                        {t.data.abbreviation && (
                                            <abbr class="term-abbr">({t.data.abbreviation})</abbr>
                                        )}
                                    </span>
                                    <span class="term-def">{t.data.definition}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}

            <!-- ── A–Z Index ── -->
            <section class="az-index-section" aria-label="All terms A to Z">
                <h2 class="section-heading">All Terms A–Z</h2>
                <nav class="az-jump" aria-label="Jump to letter">
                    {letters.map(l => (
                        <a href={`#letter-${l}`} class="az-jump-link">{l}</a>
                    ))}
                </nav>
                {letters.map(letter => (
                    <div id={`letter-${letter}`} class="az-group">
                        <h3 class="az-letter-mark">{letter}</h3>
                        <ul class="term-list term-list--compact">
                            {azGroups[letter].map(t => (
                                <li class="term-item term-item--compact">
                                    <a
                                        href={`/explainers/${t.data.slug}`}
                                        class="term-link term-link--compact"
                                        data-explainer={t.data.slug}
                                    >
                                        {t.data.term}
                                        {t.data.abbreviation && (
                                            <span class="term-abbr-inline">({t.data.abbreviation})</span>
                                        )}
                                        <span class="term-cat-badge">{CATEGORY_LABELS[t.data.category] ?? t.data.category}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

        </div>
    </main>
</Layout>

<style>
    .hub-hero {
        background: var(--color-surface);
        border-bottom: 1px solid var(--color-border);
        padding: 72px 0 60px;
    }
    .hub-inner {
        max-width: var(--max-width);
        margin: 0 auto;
        padding: 0 var(--gutter);
    }
    .hub-body {
        padding-top: 56px;
        padding-bottom: 120px;
    }
    .hub-kicker {
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--gold);
        font-weight: 600;
        margin-bottom: 16px;
    }
    .hub-title {
        font-family: var(--font-display);
        font-size: clamp(36px, 6vw, 60px);
        font-weight: 900;
        letter-spacing: -0.02em;
        line-height: 1.05;
        color: var(--color-text);
        margin-bottom: 20px;
    }
    .hub-lead {
        font-size: 18px;
        color: var(--color-text-muted);
        max-width: 600px;
        line-height: 1.6;
    }

    /* ── Categories ── */
    .section-heading {
        font-family: var(--font-display);
        font-size: 22px;
        font-weight: 800;
        color: var(--color-text);
        margin-bottom: 20px;
    }
    .categories-section {
        margin-bottom: 64px;
    }
    .cat-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .cat-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 18px;
        border: 1.5px solid var(--color-border);
        border-radius: 100px;
        font-size: 13px;
        font-weight: 600;
        color: var(--color-text);
        text-decoration: none;
        transition: all 0.15s;
    }
    .cat-chip:hover {
        border-color: var(--gold);
        color: var(--gold);
        background: color-mix(in srgb, var(--gold) 8%, transparent);
    }
    .cat-count {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--color-text-muted);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 100px;
        padding: 1px 7px;
    }

    /* ── Term list (cards) ── */
    .az-section {
        margin-bottom: 56px;
        padding-top: 24px;
        border-top: 2px solid var(--color-border);
        scroll-margin-top: 90px;
    }
    .az-letter {
        font-family: var(--font-display);
        font-size: 20px;
        font-weight: 800;
        color: var(--color-text);
        margin-bottom: 20px;
    }
    .term-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .term-item {}
    .term-link {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px 20px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.15s;
        background: var(--color-bg);
    }
    .term-link:hover {
        border-color: var(--gold);
        background: color-mix(in srgb, var(--gold) 4%, var(--color-bg));
    }
    .term-name {
        font-size: 15px;
        font-weight: 700;
        color: var(--color-text);
        display: flex;
        gap: 6px;
        align-items: baseline;
    }
    .term-abbr {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--gold);
        font-style: normal;
    }
    .term-def {
        font-size: 13px;
        color: var(--color-text-muted);
        line-height: 1.5;
    }

    /* ── A–Z compact list ── */
    .az-index-section {
        margin-top: 72px;
        padding-top: 40px;
        border-top: 2px solid var(--color-border);
    }
    .az-jump {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 40px;
    }
    .az-jump-link {
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 13px;
        font-weight: 700;
        color: var(--color-text-muted);
        text-decoration: none;
        transition: all 0.12s;
    }
    .az-jump-link:hover {
        border-color: var(--gold);
        color: var(--gold);
    }
    .az-group {
        margin-bottom: 36px;
        scroll-margin-top: 90px;
    }
    .az-letter-mark {
        font-family: var(--font-display);
        font-size: 28px;
        font-weight: 900;
        color: color-mix(in srgb, var(--gold) 40%, var(--color-border));
        margin-bottom: 12px;
        line-height: 1;
    }
    .term-list--compact {
        gap: 0;
    }
    .term-item--compact {
        border-bottom: 1px solid var(--color-border);
    }
    .term-item--compact:first-child {
        border-top: 1px solid var(--color-border);
    }
    .term-link--compact {
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 11px 4px;
        border: none;
        border-radius: 0;
        background: transparent;
        font-size: 14px;
        font-weight: 600;
        color: var(--color-text);
        justify-content: space-between;
    }
    .term-link--compact:hover {
        border: none;
        background: transparent;
        color: var(--gold);
    }
    .term-abbr-inline {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--color-text-muted);
        margin-left: 4px;
    }
    .term-cat-badge {
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-text-muted);
        border: 1px solid var(--color-border);
        border-radius: 3px;
        padding: 2px 6px;
        white-space: nowrap;
        flex-shrink: 0;
    }

    @media (max-width: 768px) {
        .hub-hero { padding: 48px 0 40px; }
    }
</style>
```

---

## STEP 4 — Create `src/pages/explainers/[slug].astro`

> Individual term page. `DefinedTerm` schema with bidirectional link back to `DefinedTermSet`.

```astro
---
// src/pages/explainers/[slug].astro
import Layout from "../../layouts/Layout.astro";
import { getCollection, render } from "astro:content";
import { buildExplainerTermSchema } from "../../lib/explainers-schema";

export async function getStaticPaths() {
    const terms = await getCollection("explainers");
    return terms.map(t => ({
        params: { slug: t.data.slug },
        props: { entry: t },
    }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
const d = entry.data;

const CATEGORY_LABELS: Record<string, string> = {
    "foundation-models":  "Foundation Models",
    "training":           "Training",
    "inference":          "Inference",
    "agents":             "Agents",
    "safety-alignment":   "Safety & Alignment",
    "architecture":       "Architecture",
    "data":               "Data",
    "applications":       "Applications",
};

const schema = buildExplainerTermSchema({
    slug:           d.slug,
    term:           d.term,
    abbreviation:   d.abbreviation,
    category:       d.category,
    definition:     d.definition,
    dateAdded:      d.dateAdded,
    lastUpdated:    d.lastUpdated,
    relatedTerms:   d.relatedTerms,
    seoTitle:       d.seoTitle,
    seoDescription: d.seoDescription,
});

const pageTitle = d.seoTitle ?? `${d.term}${d.abbreviation ? ` (${d.abbreviation})` : ''} — AI Explainer`;
const pageDesc  = d.seoDescription ?? d.definition;

// Related term collection entries for cross-links
const allTerms     = await getCollection("explainers");
const relatedTerms = (d.relatedTerms ?? [])
    .map(slug => allTerms.find(t => t.data.slug === slug)?.data)
    .filter(Boolean);

const SECTIONS = [
    { id: "definition",    label: "Definition" },
    { id: "why-it-matters", label: "Why It Matters" },
    { id: "how-it-works",  label: "How It Works" },
    { id: "applications",  label: "Applications" },
    { id: "limitations",   label: "Limitations & Risks" },
    { id: "related-terms", label: "Related Terms" },
    { id: "further-reading", label: "Further Reading" },
];
---

<Layout title={pageTitle} description={pageDesc} metaTitle={pageTitle}>
    <script
        type="application/ld+json"
        set:html={JSON.stringify(schema)}
        slot="head"
    />

    <main class="term-page">
        <!-- ── Hero ── -->
        <header class="term-hero">
            <div class="term-inner">
                <nav class="breadcrumb-row" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <span aria-hidden="true">›</span>
                    <a href="/explainers">Explainers</a>
                    <span aria-hidden="true">›</span>
                    <span aria-current="page">{d.term}</span>
                </nav>

                <div class="term-meta">
                    <span class="cat-badge">{CATEGORY_LABELS[d.category] ?? d.category}</span>
                    {d.lastUpdated && (
                        <time class="updated-date">
                            Updated {d.lastUpdated}
                        </time>
                    )}
                </div>

                <h1 class="term-title">
                    {d.term}
                    {d.abbreviation && <span class="term-abbr-hero">({d.abbreviation})</span>}
                </h1>

                <p class="term-definition">{d.definition}</p>

                <!-- Section jump bar -->
                <nav class="jump-bar" aria-label="Jump to section">
                    {SECTIONS.map(s => (
                        <a href={`#${s.id}`} class="jump-link">{s.label}</a>
                    ))}
                </nav>
            </div>
        </header>

        <!-- ── Body ── -->
        <div class="term-inner term-body">
            <article class="term-content">
                <Content />
            </article>

            <!-- Related Terms sidebar card -->
            {relatedTerms.length > 0 && (
                <aside class="related-sidebar" aria-label="Related terms">
                    <h2 class="related-heading">Related Terms</h2>
                    <ul class="related-list">
                        {relatedTerms.map(rt => rt && (
                            <li>
                                <a
                                    href={`/explainers/${rt.slug}`}
                                    class="related-link"
                                    data-explainer={rt.slug}
                                >
                                    <strong>{rt.term}</strong>
                                    {rt.abbreviation && (
                                        <span class="related-abbr">({rt.abbreviation})</span>
                                    )}
                                    <span class="related-def">{rt.definition}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="/explainers" class="back-to-hub">← All Explainers</a>
                </aside>
            )}
        </div>
    </main>
</Layout>

<style>
    .term-hero {
        background: var(--color-surface);
        border-bottom: 1px solid var(--color-border);
        padding: 48px 0 0;
    }
    .term-inner {
        max-width: 860px;
        margin: 0 auto;
        padding: 0 var(--gutter);
    }
    .breadcrumb-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--color-text-muted);
        margin-bottom: 24px;
        font-family: var(--font-mono);
    }
    .breadcrumb-row a {
        color: var(--color-text-muted);
        text-decoration: none;
        transition: color 0.12s;
    }
    .breadcrumb-row a:hover { color: var(--gold); }
    .breadcrumb-row span[aria-current] { color: var(--color-text); }

    .term-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
    }
    .cat-badge {
        font-family: var(--font-mono);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 3px;
        background: color-mix(in srgb, var(--gold) 15%, transparent);
        color: var(--gold);
        border: 1px solid color-mix(in srgb, var(--gold) 40%, transparent);
    }
    .updated-date {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--color-text-muted);
    }

    .term-title {
        font-family: var(--font-display);
        font-size: clamp(32px, 5vw, 52px);
        font-weight: 900;
        letter-spacing: -0.02em;
        line-height: 1.05;
        color: var(--color-text);
        margin-bottom: 20px;
    }
    .term-abbr-hero {
        color: var(--gold);
        font-size: 0.65em;
        font-weight: 700;
        vertical-align: middle;
        margin-left: 8px;
    }
    .term-definition {
        font-size: 18px;
        line-height: 1.65;
        color: var(--color-text-muted);
        max-width: 680px;
        margin-bottom: 36px;
    }

    /* Jump bar */
    .jump-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 0;
        border-top: 1px solid var(--color-border);
        margin: 0 calc(-1 * var(--gutter));
        padding: 0 var(--gutter);
        overflow-x: auto;
        scrollbar-width: none;
    }
    .jump-link {
        font-size: 13px;
        font-weight: 500;
        color: var(--color-text-muted);
        text-decoration: none;
        padding: 12px 16px;
        border-bottom: 2px solid transparent;
        white-space: nowrap;
        transition: all 0.12s;
    }
    .jump-link:hover {
        color: var(--gold);
        border-bottom-color: var(--gold);
    }

    /* Body layout */
    .term-body {
        padding-top: 48px;
        padding-bottom: 120px;
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 64px;
        align-items: start;
        max-width: 1100px;
    }
    .term-content {
        min-width: 0;
    }

    /* Content typography — mirrors article styles */
    .term-content :global(h2) {
        font-family: var(--font-display);
        font-size: 22px;
        font-weight: 800;
        color: var(--color-text);
        margin: 48px 0 16px;
        padding-top: 24px;
        border-top: 1px solid var(--color-border);
        scroll-margin-top: 90px;
    }
    .term-content :global(h2:first-child) {
        margin-top: 0;
        padding-top: 0;
        border-top: none;
    }
    .term-content :global(p) {
        font-size: 16px;
        line-height: 1.8;
        color: var(--color-text-muted);
        margin-bottom: 20px;
    }
    .term-content :global(ul), .term-content :global(ol) {
        padding-left: 24px;
        margin-bottom: 20px;
        color: var(--color-text-muted);
    }
    .term-content :global(li) {
        font-size: 16px;
        line-height: 1.7;
        margin-bottom: 8px;
    }
    .term-content :global(strong) { color: var(--color-text); }
    .term-content :global(a) {
        color: var(--gold);
        text-decoration: underline;
        text-underline-offset: 3px;
    }
    .term-content :global(code) {
        font-family: var(--font-mono);
        font-size: 0.88em;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 3px;
        padding: 1px 5px;
    }

    /* Related sidebar */
    .related-sidebar {
        position: sticky;
        top: 100px;
    }
    .related-heading {
        font-family: var(--font-display);
        font-size: 16px;
        font-weight: 800;
        color: var(--color-text);
        margin-bottom: 16px;
    }
    .related-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 24px;
    }
    .related-link {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 12px 14px;
        border: 1px solid var(--color-border);
        border-radius: 6px;
        text-decoration: none;
        transition: border-color 0.12s;
    }
    .related-link:hover { border-color: var(--gold); }
    .related-link strong { font-size: 13px; color: var(--color-text); }
    .related-abbr { font-family: var(--font-mono); font-size: 10px; color: var(--gold); }
    .related-def { font-size: 11px; color: var(--color-text-muted); line-height: 1.4; }
    .back-to-hub {
        font-size: 13px;
        color: var(--color-text-muted);
        text-decoration: none;
        display: block;
    }
    .back-to-hub:hover { color: var(--gold); }

    @media (max-width: 900px) {
        .term-body {
            grid-template-columns: 1fr;
            gap: 48px;
        }
        .related-sidebar { position: static; }
    }
</style>
```

---

## STEP 5 — Create `src/pages/explainers/manifest.json.ts`

> Static JSON manifest for tooltip JS. Loaded once, cached, zero extra requests per hover.

```ts
// src/pages/explainers/manifest.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
    const terms = await getCollection('explainers');

    const manifest: Record<string, object> = {};
    for (const t of terms) {
        manifest[t.data.slug] = {
            term:         t.data.term,
            abbreviation: t.data.abbreviation ?? null,
            category:     t.data.category,
            definition:   t.data.definition,
            url:          `/explainers/${t.data.slug}`,
        };
    }

    return new Response(JSON.stringify(manifest), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
};
```

---

## STEP 6 — Create `src/pages/sitemap-explainers.xml.ts`

> Dedicated explainer sitemap with `<lastmod>` and `<changefreq>`.

```ts
// src/pages/sitemap-explainers.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<':  return '&lt;';
            case '>':  return '&gt;';
            case '&':  return '&amp;';
            case "'":  return '&apos;';
            case '"':  return '&quot;';
            default:   return c;
        }
    });
}

export const GET: APIRoute = async () => {
    const terms = await getCollection('explainers');
    const SITE = 'https://dailyaimail.news';

    const hubUrl = `
    <url>
      <loc>${SITE}/explainers</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;

    const termUrls = terms
        .sort((a, b) => a.data.term.localeCompare(b.data.term))
        .map(t => {
            const lastmod = t.data.lastUpdated ?? t.data.dateAdded;
            return `
    <url>
      <loc>${SITE}/explainers/${escapeXml(t.data.slug)}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`;
        })
        .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${hubUrl}${termUrls}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
};
```

---

## STEP 7 — Update `public/sitemap-index.xml`

> Add the explainers sitemap. Full replacement.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://dailyaimail.news/sitemap-news.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://dailyaimail.news/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://dailyaimail.news/sitemap-explainers.xml</loc>
  </sitemap>
</sitemapindex>
```

---

## STEP 8 — Update `public/robots.txt`

> Add explainers sitemap entry.

```
User-agent: *
Allow: /
Disallow: /dist/

# Sitemaps
Sitemap: https://dailyaimail.news/sitemap-index.xml
Sitemap: https://dailyaimail.news/news-sitemap.xml
Sitemap: https://dailyaimail.news/sitemap-explainers.xml
```

---

## STEP 9 — Update `astro.config.mjs`

> Add `/explainers` and `/explainers/*` to the Cloudflare static routes exclude list so they are served as pre-rendered static files, not through the worker.

```js
// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
    build: {
        format: 'file',
    },
    trailingSlash: 'never',
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
            configPath: './wrangler.jsonc',
        },
        routes: {
            strategy: 'exclude',
            exclude: [
                '/',
                '/topics',
                '/topics/*',
                '/about-us',
                '/contact-us',
                '/privacy-policy',
                '/cookies-policy',
                '/terms-and-conditions',
                '/publishing-principles',
                '/press-kit',
                '/news-sitemap.xml',
                '/rss.xml',
                '/sitemap*',
                // ── Explainers (fully static, no worker needed) ──
                '/explainers',
                '/explainers/*',
            ],
        },
    }),

    vite: {
        build: {
            rollupOptions: {
                external: ['/pagefind/pagefind-ui.js'],
            },
        },
        ssr: {
            external: ['node:crypto'],
            noExternal: ['astro/loaders', 'astro:content'],
        },
        optimizeDeps: {
            exclude: ['astro:content', 'astro/loaders'],
        },
    },
});
```

---

## STEP 10 — Update `src/pages/sitemap-pages.xml.ts`

> Add `/explainers` hub to static pages list and explainer term pages dynamically.

```ts
// src/pages/sitemap-pages.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
    const articles  = await getCollection('articles');
    const explainers = await getCollection('explainers');

    const staticPages = [
        '',
        '/about-us',
        '/about-us/editorial-team',
        '/contact-us',
        '/publishing-principles',
        '/terms-and-conditions',
        '/privacy-policy',
        '/cookies-policy',
        '/topics',
        '/news',
        '/explainers',          // ← hub added
    ];

    const allTags    = [...new Set(articles.flatMap(a => [a.data.tag, ...(a.data.tags ?? [])]))];
    const topicPages = allTags.map(tag => `/topics/${tag.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`);
    const articlePages   = articles.map(a => `/articles/${a.id}`);
    const explainerPages = explainers.map(t => `/explainers/${t.data.slug}`);

    const allUrls = [
        ...staticPages,
        ...topicPages,
        ...articlePages,
        ...explainerPages,      // ← individual term pages added
    ];

    const urlElements = allUrls.map(url => `
    <url>
      <loc>https://dailyaimail.news${url}</loc>
    </url>`).join('');

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}\n</urlset>`,
        { headers: { 'Content-Type': 'application/xml' } }
    );
};
```

---

## STEP 11 — Create all 30 seed explainer files

> Path: `src/content/explainers/`
> Each file follows the **exact section ID convention** from the architecture doc.
> Copy-paste the block for each term and save at the indicated filename.

---

### `large-language-model.md`
```md
---
term: "Large Language Model"
abbreviation: "LLM"
slug: "large-language-model"
category: "foundation-models"
definition: "A large language model is a neural network trained on vast amounts of text data to understand and generate human-like language at scale."
dateAdded: "2026-03-26"
relatedTerms: ["transformer-architecture", "pre-training", "fine-tuning", "context-window", "inference", "hallucination"]
seoTitle: "What Is a Large Language Model (LLM)? — Daily AI Mail"
seoDescription: "A large language model is a neural network trained on vast text data to understand and generate human-like language. Learn what makes LLMs work."
---

## Definition {#definition}

A large language model (LLM) is a type of artificial neural network containing billions of learned parameters, trained on enormous corpora of text to predict and generate language. Models like GPT-4, Claude, and Gemini fall into this category.

## Why It Matters {#why-it-matters}

LLMs are the foundation of most modern AI products — from coding assistants to search engines. Understanding what they are and how they work is the starting point for understanding the current AI landscape.

## How It Works {#how-it-works}

LLMs learn by predicting the next token (roughly, the next word or word-fragment) in a sequence. Through billions of such predictions across trillions of tokens, the model develops internal representations of grammar, facts, reasoning, and style. At inference time, the model generates text autoregressively — one token at a time.

## Applications In AI {#applications}

LLMs power chatbots, code completion tools, document summarisers, translation systems, and AI agents. They are also used as the backbone of retrieval-augmented generation systems.

## Limitations & Risks {#limitations}

LLMs can hallucinate — generating plausible but factually incorrect statements. They encode biases present in training data. They have a fixed context window, limiting how much information they can process at once. They have no persistent memory between conversations by default.

## Related Terms {#related-terms}

[Transformer Architecture](/explainers/transformer-architecture) · [Pre-Training](/explainers/pre-training) · [Fine-Tuning](/explainers/fine-tuning) · [Context Window](/explainers/context-window) · [Hallucination](/explainers/hallucination) · [Inference](/explainers/inference)

## Further Reading {#further-reading}

- [Attention Is All You Need — Vaswani et al., 2017](https://arxiv.org/abs/1706.03762)
- [Language Models are Few-Shot Learners — GPT-3 paper](https://arxiv.org/abs/2005.14165)
```

---

### `transformer-architecture.md`
```md
---
term: "Transformer Architecture"
slug: "transformer-architecture"
category: "architecture"
definition: "The transformer is a neural network architecture built around a self-attention mechanism that processes input sequences in parallel, forming the backbone of virtually all modern large language models."
dateAdded: "2026-03-26"
relatedTerms: ["attention-mechanism", "large-language-model", "embeddings", "tokenization"]
seoTitle: "What Is the Transformer Architecture? — Daily AI Mail"
seoDescription: "The transformer is the neural network architecture that powers modern AI. Learn how self-attention and parallelism make it so effective."
---

## Definition {#definition}

The transformer is a neural network architecture introduced in the 2017 paper "Attention Is All You Need." It replaces earlier sequential models (like RNNs) with a self-attention mechanism that can process all tokens in an input simultaneously.

## Why It Matters {#why-it-matters}

Every major LLM — GPT, Claude, Gemini, Llama — is built on the transformer. Its ability to scale efficiently with data and compute made the current AI era possible.

## How It Works {#how-it-works}

Input tokens are converted to embeddings and passed through stacked encoder or decoder blocks. Each block applies multi-head self-attention (allowing tokens to attend to each other) and a feed-forward network. The attention mechanism learns which tokens are most relevant to each other, regardless of their distance in the sequence.

## Applications In AI {#applications}

Used in language models, image generation (via vision transformers), protein structure prediction (AlphaFold), and multimodal models.

## Limitations & Risks {#limitations}

Attention is quadratically expensive in sequence length, making very long contexts computationally intensive. Significant research (sparse attention, linear attention) is underway to address this.

## Related Terms {#related-terms}

[Attention Mechanism](/explainers/attention-mechanism) · [Large Language Model](/explainers/large-language-model) · [Embeddings](/explainers/embeddings) · [Tokenization](/explainers/tokenization)

## Further Reading {#further-reading}

- [Attention Is All You Need — Vaswani et al., 2017](https://arxiv.org/abs/1706.03762)
```

---

### `attention-mechanism.md`
```md
---
term: "Attention Mechanism"
slug: "attention-mechanism"
category: "architecture"
definition: "Attention is a technique that lets a neural network dynamically weight the relevance of different parts of the input when producing each part of the output."
dateAdded: "2026-03-26"
relatedTerms: ["transformer-architecture", "large-language-model", "context-window"]
---

## Definition {#definition}

The attention mechanism allows a model to assign varying importance to different input tokens when computing each output token. Multi-head self-attention runs this process in parallel across multiple learned subspaces, capturing diverse contextual relationships.

## Why It Matters {#why-it-matters}

Attention is what allows transformers to understand long-range dependencies in language — connecting a pronoun at the end of a paragraph to its referent at the beginning.

## How It Works {#how-it-works}

Each token produces three vectors: Query, Key, and Value. Attention scores are computed as dot products of Queries against all Keys, scaled and softmaxed into weights. The output is a weighted sum of the Value vectors, telling the model which other tokens to "pay attention to."

## Applications In AI {#applications}

Core to all transformer-based models. Also used in cross-attention layers for multimodal tasks where a model must attend to image patches when generating text.

## Limitations & Risks {#limitations}

Quadratic compute complexity with sequence length. Very long documents require architectural modifications (sliding window attention, linear attention variants).

## Related Terms {#related-terms}

[Transformer Architecture](/explainers/transformer-architecture) · [Context Window](/explainers/context-window) · [Large Language Model](/explainers/large-language-model)

## Further Reading {#further-reading}

- [Attention Is All You Need (original paper)](https://arxiv.org/abs/1706.03762)
```

---

### `context-window.md`
```md
---
term: "Context Window"
slug: "context-window"
category: "inference"
definition: "The context window is the maximum amount of text — measured in tokens — that a language model can process in a single request, covering both the input prompt and the model's response."
dateAdded: "2026-03-26"
relatedTerms: ["large-language-model", "tokenization", "inference", "retrieval-augmented-generation"]
seoTitle: "What Is a Context Window in AI? — Daily AI Mail"
---

## Definition {#definition}

The context window defines the total token budget available to a model in one inference call. Everything the model can "see" and reason about must fit inside this window — including the system prompt, conversation history, documents, and the tokens it generates in response.

## Why It Matters {#why-it-matters}

Context window size directly determines what tasks a model can handle in a single pass. Summarising a book, analysing a large codebase, or maintaining a long conversation all require sufficient context.

## How It Works {#how-it-works}

Modern models offer context windows ranging from 8K tokens (roughly 6,000 words) to over 1 million tokens. Processing a longer context requires more memory and compute. Some models use techniques like sliding window attention or context compression to extend effective range.

## Applications In AI {#applications}

Long-context models are used for document analysis, legal review, multi-file code editing, and extended agentic workflows that accumulate tool results over many steps.

## Limitations & Risks {#limitations}

Models often perform worse on information placed in the middle of a very long context ("lost in the middle" effect). Longer contexts significantly increase inference cost.

## Related Terms {#related-terms}

[Large Language Model](/explainers/large-language-model) · [Tokenization](/explainers/tokenization) · [Retrieval-Augmented Generation](/explainers/retrieval-augmented-generation)

## Further Reading {#further-reading}

- [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)
```

---

### `embeddings.md`
```md
---
term: "Embeddings"
slug: "embeddings"
category: "foundation-models"
definition: "Embeddings are dense numerical vectors that represent words, sentences, or other data in a continuous high-dimensional space, where semantic similarity corresponds to geometric proximity."
dateAdded: "2026-03-26"
relatedTerms: ["transformer-architecture", "vector-database", "retrieval-augmented-generation", "tokenization"]
---

## Definition {#definition}

An embedding maps a discrete object — a word, sentence, image, or document — into a point in high-dimensional vector space. Semantically similar objects are positioned near each other; dissimilar ones are far apart.

## Why It Matters {#why-it-matters}

Embeddings are the mathematical foundation of how AI models understand meaning. They enable search, recommendation systems, and retrieval-augmented generation.

## How It Works {#how-it-works}

Embedding models (like OpenAI's `text-embedding-3` or Cohere Embed) pass input through a neural network and return a vector of fixed dimensionality (e.g., 1536 floats). These vectors are stored in vector databases and compared using cosine similarity or dot product.

## Applications In AI {#applications}

Semantic search, RAG pipelines, document clustering, anomaly detection, recommendation engines, and few-shot classification.

## Limitations & Risks {#limitations}

Embeddings are opaque — it is hard to interpret why two items are close. They also encode social biases present in training data.

## Related Terms {#related-terms}

[Vector Database](/explainers/vector-database) · [Retrieval-Augmented Generation](/explainers/retrieval-augmented-generation) · [Tokenization](/explainers/tokenization)

## Further Reading {#further-reading}

- [Word2Vec — Mikolov et al., 2013](https://arxiv.org/abs/1301.3781)
```

---

### `fine-tuning.md`
```md
---
term: "Fine-Tuning"
slug: "fine-tuning"
category: "training"
definition: "Fine-tuning is the process of continuing training a pre-trained model on a smaller, task-specific dataset to adapt its behaviour for a particular application or domain."
dateAdded: "2026-03-26"
relatedTerms: ["pre-training", "rlhf", "large-language-model", "model-distillation"]
---

## Definition {#definition}

Fine-tuning starts from a pre-trained model's weights and performs additional gradient descent on a curated dataset. This shifts the model's behaviour toward the target domain or instruction style without requiring training from scratch.

## Why It Matters {#why-it-matters}

Fine-tuning makes powerful general models useful for specific tasks — customer support, medical coding, legal summarisation — at a fraction of the cost of training from scratch.

## How It Works {#how-it-works}

A dataset of input-output pairs (or instruction-response pairs) is assembled. The model is trained on this data with a lower learning rate than initial pre-training. Parameter-efficient methods like LoRA allow fine-tuning with far fewer compute resources by updating only a small set of adapter weights.

## Applications In AI {#applications}

Instruction tuning, domain adaptation, style alignment, RLHF's supervised fine-tuning phase, and specialised classifiers.

## Limitations & Risks {#limitations}

Fine-tuning can cause "catastrophic forgetting" of general capabilities. Poor data quality amplifies existing model biases. Overfitting on small datasets reduces generalisation.

## Related Terms {#related-terms}

[Pre-Training](/explainers/pre-training) · [RLHF](/explainers/rlhf) · [Model Distillation](/explainers/model-distillation)

## Further Reading {#further-reading}

- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
```

---

### `pre-training.md`
```md
---
term: "Pre-Training"
slug: "pre-training"
category: "training"
definition: "Pre-training is the initial large-scale training phase in which a model learns general representations from a massive, broad dataset before any task-specific adaptation."
dateAdded: "2026-03-26"
relatedTerms: ["fine-tuning", "large-language-model", "rlhf", "benchmark"]
---

## Definition {#definition}

Pre-training is the computationally intensive first phase of building a foundation model. The model is trained on trillions of tokens of diverse text (or images, code, etc.) using self-supervised objectives like next-token prediction.

## Why It Matters {#why-it-matters}

Pre-training is where the model acquires broad world knowledge, language understanding, and reasoning capacity. Everything downstream — fine-tuning, RLHF, prompting — builds on this foundation.

## How It Works {#how-it-works}

Massive compute clusters run gradient descent for weeks or months. The objective is typically next-token prediction (causal LM) or masked token prediction (BERT-style). Data quality, curation, and scale are the primary determinants of model capability.

## Applications In AI {#applications}

Every foundation model — GPT series, Claude, Llama, Gemini — is produced through a pre-training phase.

## Limitations & Risks {#limitations}

Extremely resource-intensive. Training data biases and quality issues are embedded at this stage and are difficult to remove later.

## Related Terms {#related-terms}

[Fine-Tuning](/explainers/fine-tuning) · [RLHF](/explainers/rlhf) · [Large Language Model](/explainers/large-language-model)

## Further Reading {#further-reading}

- [Scaling Laws for Neural Language Models — Kaplan et al., 2020](https://arxiv.org/abs/2001.08361)
```

---

### `rlhf.md`
```md
---
term: "RLHF"
abbreviation: "RLHF"
slug: "rlhf"
category: "training"
definition: "Reinforcement Learning from Human Feedback (RLHF) is a training technique that uses human preference judgments to fine-tune language models toward more helpful, accurate, and aligned behaviour."
dateAdded: "2026-03-26"
relatedTerms: ["fine-tuning", "alignment", "guardrails", "large-language-model"]
seoTitle: "What Is RLHF? — Daily AI Mail"
---

## Definition {#definition}

RLHF involves three stages: (1) supervised fine-tuning on demonstration data, (2) training a reward model from human preference comparisons, and (3) using reinforcement learning (typically PPO) to update the LLM to maximise reward model scores.

## Why It Matters {#why-it-matters}

RLHF is why modern chatbots feel helpful and conversational rather than erratic. It is the primary technique used to align GPT-4, Claude, and Gemini to follow instructions and avoid harmful outputs.

## How It Works {#how-it-works}

Human raters compare pairs of model outputs and indicate which is better. These preferences train a reward model. The LLM is then fine-tuned using PPO to produce outputs that score highly on the reward model, while a KL penalty prevents it drifting too far from the supervised baseline.

## Applications In AI {#applications}

Instruction following, safety alignment, reducing hallucinations, and producing conversational AI products.

## Limitations & Risks {#limitations}

Reward models can be gamed ("reward hacking"). Human labellers introduce their own biases. Expensive at scale. Alternatives like DPO (Direct Preference Optimisation) address some of these costs.

## Related Terms {#related-terms}

[Fine-Tuning](/explainers/fine-tuning) · [Alignment](/explainers/alignment) · [Guardrails](/explainers/guardrails)

## Further Reading {#further-reading}

- [Learning to summarize from human feedback — Stiennon et al.](https://arxiv.org/abs/2009.01325)
- [InstructGPT paper — Ouyang et al., 2022](https://arxiv.org/abs/2203.02155)
```

---

### `inference.md`
```md
---
term: "Inference"
slug: "inference"
category: "inference"
definition: "Inference is the process of running a trained AI model to generate a prediction or output from a new input — the production-time complement to training."
dateAdded: "2026-03-26"
relatedTerms: ["large-language-model", "context-window", "model-quantization", "model-distillation"]
---

## Definition {#definition}

Inference is what happens when you send a prompt to an LLM and receive a response. The model's weights are frozen; it simply processes the input and generates output token-by-token.

## Why It Matters {#why-it-matters}

Inference costs dwarf training costs at scale. A model trained once may handle billions of inferences. Efficiency at inference time directly determines the economics and latency of AI products.

## How It Works {#how-it-works}

For autoregressive LLMs, inference proceeds one token at a time. The model computes attention over the full context (leveraging a KV cache to avoid recomputation), applies feed-forward layers, and samples from the output distribution. Techniques like speculative decoding and model quantisation reduce cost.

## Applications In AI {#applications}

Every time you use ChatGPT, Claude, or any LLM-powered product, you are performing inference. Inference infrastructure is a core business challenge for AI labs and cloud providers.

## Limitations & Risks {#limitations}

Latency and cost increase with model size and context length. Running state-of-the-art models on-device remains challenging.

## Related Terms {#related-terms}

[Context Window](/explainers/context-window) · [Model Quantization](/explainers/model-quantization) · [Model Distillation](/explainers/model-distillation)

## Further Reading {#further-reading}

- [FlashAttention: Fast and Memory-Efficient Exact Attention](https://arxiv.org/abs/2205.14135)
```

---

### `hallucination.md`
```md
---
term: "Hallucination"
slug: "hallucination"
category: "safety-alignment"
definition: "Hallucination is when an AI model generates text that is plausible-sounding but factually incorrect, fabricated, or unsupported by the provided context."
dateAdded: "2026-03-26"
relatedTerms: ["large-language-model", "retrieval-augmented-generation", "grounding", "alignment"]
seoTitle: "What Is AI Hallucination? — Daily AI Mail"
---

## Definition {#definition}

Hallucination occurs when an LLM confidently produces false information — invented citations, wrong dates, non-existent people, or incorrect facts — presented with the same fluency as accurate content.

## Why It Matters {#why-it-matters}

Hallucination is one of the most consequential failure modes of current AI. It makes LLMs unreliable for high-stakes tasks like medical advice, legal research, and factual journalism without verification workflows.

## How It Works {#how-it-works}

LLMs are trained to produce statistically plausible next tokens, not to verify truth. When the model lacks relevant training data, it may "fill in the gap" by generating a plausible-sounding — but fabricated — continuation.

## Applications In AI {#applications}

Detecting and reducing hallucination is an active research area. Retrieval-augmented generation, chain-of-thought prompting, and grounding techniques all aim to reduce it.

## Limitations & Risks {#limitations}

There is no complete solution to hallucination in current architectures. Models can hallucinate even about topics well-represented in training data.

## Related Terms {#related-terms}

[Retrieval-Augmented Generation](/explainers/retrieval-augmented-generation) · [Grounding](/explainers/grounding) · [Alignment](/explainers/alignment)

## Further Reading {#further-reading}

- [Survey of Hallucination in Natural Language Generation](https://arxiv.org/abs/2202.03629)
```

---

### `prompt-engineering.md`
```md
---
term: "Prompt Engineering"
slug: "prompt-engineering"
category: "applications"
definition: "Prompt engineering is the practice of designing and optimising text inputs to guide a language model toward desired outputs, without modifying the model's weights."
dateAdded: "2026-03-26"
relatedTerms: ["large-language-model", "chain-of-thought", "reasoning-model", "fine-tuning"]
---

## Definition {#definition}

Prompt engineering encompasses techniques for structuring instructions, examples, and context so that an LLM produces accurate, relevant, and well-formatted responses.

## Why It Matters {#why-it-matters}

The same model can produce dramatically different outputs depending on how it is prompted. Prompt engineering is often the fastest way to improve LLM-powered product quality without model retraining.

## How It Works {#how-it-works}

Key techniques include: zero-shot (instruction only), few-shot (include examples), chain-of-thought (ask the model to reason step by step), role assignment, output format specification, and system prompts. Iterative testing and evaluation determine what works.

## Applications In AI {#applications}

Used in every LLM deployment — from chatbots to code generators to data extraction pipelines.

## Limitations & Risks {#limitations}

Prompt sensitivity means small wording changes can cause large output changes. Prompts are not transferable between model versions without re-evaluation.

## Related Terms {#related-terms}

[Chain-of-Thought](/explainers/chain-of-thought) · [Reasoning Model](/explainers/reasoning-model) · [Fine-Tuning](/explainers/fine-tuning)

## Further Reading {#further-reading}

- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)
```

---

### `retrieval-augmented-generation.md`
```md
---
term: "Retrieval-Augmented Generation"
abbreviation: "RAG"
slug: "retrieval-augmented-generation"
category: "applications"
definition: "RAG is an architecture that enhances LLM outputs by retrieving relevant documents from an external knowledge source at inference time and including them in the model's context."
dateAdded: "2026-03-26"
relatedTerms: ["embeddings", "vector-database", "grounding", "hallucination", "context-window"]
seoTitle: "What Is RAG (Retrieval-Augmented Generation)? — Daily AI Mail"
---

## Definition {#definition}

RAG combines a retrieval step — searching a vector database or document store for relevant passages — with a generation step, where the LLM uses the retrieved content to produce a grounded, factual response.

## Why It Matters {#why-it-matters}

RAG is the standard solution for giving LLMs access to proprietary, up-to-date, or highly specific knowledge without retraining the model. It is widely used in enterprise AI deployments.

## How It Works {#how-it-works}

At query time: (1) the user's query is embedded into a vector, (2) the vector database retrieves the most similar document chunks, (3) the chunks are inserted into the LLM's prompt as context, (4) the LLM generates a response grounded in the retrieved content.

## Applications In AI {#applications}

Customer support bots, internal knowledge assistants, legal research tools, medical information systems, and any application requiring up-to-date or proprietary knowledge.

## Limitations & Risks {#limitations}

RAG quality depends heavily on retrieval quality. Poorly chunked documents, poor embeddings, or irrelevant retrieval lead to poor generation. Long retrieved contexts increase cost and can hit context window limits.

## Related Terms {#related-terms}

[Embeddings](/explainers/embeddings) · [Vector Database](/explainers/vector-database) · [Grounding](/explainers/grounding) · [Hallucination](/explainers/hallucination)

## Further Reading {#further-reading}

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks — Lewis et al.](https://arxiv.org/abs/2005.11401)
```

---

### `ai-agent.md`
```md
---
term: "AI Agent"
slug: "ai-agent"
category: "agents"
definition: "An AI agent is an LLM-powered system that can autonomously take actions — using tools, browsing the web, writing code, or calling APIs — to complete multi-step tasks toward a goal."
dateAdded: "2026-03-26"
relatedTerms: ["tool-use", "multi-agent-system", "reasoning-model", "retrieval-augmented-generation"]
---

## Definition {#definition}

An AI agent is a system in which an LLM acts as a reasoning core that perceives its environment (via text, tool outputs, or memory), decides on actions, executes them, and iterates until the task is complete.

## Why It Matters {#why-it-matters}

Agents represent a major expansion of what LLMs can accomplish. Rather than a single prompt-response, agents can complete extended, multi-step workflows — booking travel, writing and executing code, or conducting research.

## How It Works {#how-it-works}

The agent receives a goal. The LLM reasons about the next action (using chain-of-thought or planning), selects a tool (web search, code interpreter, file system), receives the tool's output, and incorporates it into the next reasoning step. This loop continues until the task is done or the agent halts.

## Applications In AI {#applications}

Software development agents (Devin, Claude Code), research assistants, computer use, customer service automation, and scientific workflow automation.

## Limitations & Risks {#limitations}

Agents can make irreversible mistakes at scale. Error propagation across steps compounds failures. Long agentic tasks are expensive and slow. Alignment and oversight become harder as autonomy increases.

## Related Terms {#related-terms}

[Tool Use](/explainers/tool-use) · [Multi-Agent System](/explainers/multi-agent-system) · [Reasoning Model](/explainers/reasoning-model)

## Further Reading {#further-reading}

- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
```

---

### `multi-agent-system.md`
```md
---
term: "Multi-Agent System"
slug: "multi-agent-system"
category: "agents"
definition: "A multi-agent system is an architecture in which multiple AI agents collaborate, each handling a specialised subtask, to accomplish goals too complex for a single agent."
dateAdded: "2026-03-26"
relatedTerms: ["ai-agent", "tool-use", "reasoning-model"]
---

## Definition {#definition}

In a multi-agent system, an orchestrator agent delegates subtasks to specialised sub-agents. Each sub-agent may have its own tools, memory, and instructions. Results are synthesised by the orchestrator or passed between agents in a pipeline.

## Why It Matters {#why-it-matters}

Multi-agent systems can parallelise work, apply specialist expertise to each subtask, and exceed the context or capability limits of any single agent.

## How It Works {#how-it-works}

Common patterns include: orchestrator-subagent (a manager delegates tasks), pipeline (output of one agent feeds the next), and ensemble (multiple agents produce outputs that are merged or voted on). Communication is usually via structured text or function calls.

## Applications In AI {#applications}

Software engineering teams (planner, coder, reviewer agents), research pipelines, automated scientific discovery, and complex enterprise workflows.

## Limitations & Risks {#limitations}

Error propagation, coordination overhead, and unpredictable emergent behaviour. Failures in one agent can cascade. Oversight is harder as complexity grows.

## Related Terms {#related-terms}

[AI Agent](/explainers/ai-agent) · [Tool Use](/explainers/tool-use) · [Reasoning Model](/explainers/reasoning-model)

## Further Reading {#further-reading}

- [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation](https://arxiv.org/abs/2308.08155)
```

---

### `tool-use.md`
```md
---
term: "Tool Use"
slug: "tool-use"
category: "agents"
definition: "Tool use is the ability of an LLM to call external functions — web search, code execution, database queries, or APIs — and incorporate their results into its reasoning."
dateAdded: "2026-03-26"
relatedTerms: ["ai-agent", "retrieval-augmented-generation", "reasoning-model"]
---

## Definition {#definition}

Tool use (also called function calling) allows an LLM to detect when it should invoke an external capability, format the call correctly, receive the result, and continue reasoning. Tools extend the model's capabilities beyond text generation.

## Why It Matters {#why-it-matters}

Without tool use, LLMs are limited to what they know from training. With it, they can retrieve live data, perform precise calculations, access databases, and take real-world actions.

## How It Works {#how-it-works}

The model is given tool definitions (name, description, parameters) as part of the context. When appropriate, the model returns a structured tool-call request. The host system executes the tool and returns the result to the model, which then continues its response.

## Applications In AI {#applications}

Web-browsing agents, code interpreters, calendar and email management, real-time data retrieval, and computer use.

## Limitations & Risks {#limitations}

Incorrect tool selection, malformed arguments, and over-reliance on tools that fail. Security risks if tools have write access to external systems.

## Related Terms {#related-terms}

[AI Agent](/explainers/ai-agent) · [Retrieval-Augmented Generation](/explainers/retrieval-augmented-generation)

## Further Reading {#further-reading}

- [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761)
```

---

### `reasoning-model.md`
```md
---
term: "Reasoning Model"
slug: "reasoning-model"
category: "foundation-models"
definition: "A reasoning model is an LLM trained to spend additional compute at inference time generating internal chain-of-thought steps before producing a final answer, dramatically improving performance on complex tasks."
dateAdded: "2026-03-26"
relatedTerms: ["chain-of-thought", "large-language-model", "prompt-engineering", "benchmark"]
seoTitle: "What Is a Reasoning Model in AI? — Daily AI Mail"
---

## Definition {#definition}

Reasoning models — such as OpenAI's o-series and Anthropic's Claude with extended thinking — allocate extra token budget to internal deliberation before responding. This "thinking" is often hidden from users but shapes the final output.

## Why It Matters {#why-it-matters}

On difficult tasks (mathematics, coding, scientific reasoning), reasoning models significantly outperform their non-reasoning counterparts by catching errors mid-thought and exploring multiple solution paths.

## How It Works {#how-it-works}

The model generates a chain of thought tokens — intermediate reasoning steps — and then produces a final response. Training with reinforcement learning teaches the model when and how to reason effectively.

## Applications In AI {#applications}

Mathematical problem solving, complex coding tasks, scientific research, multi-step planning, and any domain where accuracy matters more than speed.

## Limitations & Risks {#limitations}

Slower and more expensive than direct-response models. Can "overthink" simple problems. Internal reasoning is not always consistent or correct.

## Related Terms {#related-terms}

[Chain-of-Thought](/explainers/chain-of-thought) · [Large Language Model](/explainers/large-language-model) · [Prompt Engineering](/explainers/prompt-engineering)

## Further Reading {#further-reading}

- [Let's Verify Step by Step — Lightman et al., 2023](https://arxiv.org/abs/2305.20050)
```

---

### `mixture-of-experts.md`
```md
---
term: "Mixture of Experts"
abbreviation: "MoE"
slug: "mixture-of-experts"
category: "architecture"
definition: "Mixture of Experts is a neural network architecture where only a subset of specialised sub-networks (experts) is activated for each input, enabling large model capacity with lower per-token compute."
dateAdded: "2026-03-26"
relatedTerms: ["transformer-architecture", "large-language-model", "inference", "model-quantization"]
---

## Definition {#definition}

In an MoE model, a router network selects a small number of "expert" feed-forward layers to process each token, while the rest remain inactive. This allows a model with hundreds of billions of parameters to match the quality of a dense model at a fraction of the inference FLOPs.

## Why It Matters {#why-it-matters}

MoE is how labs build very capable models while controlling inference cost. Mistral's Mixtral, Google's Gemini, and GPT-4 are all believed to use MoE architectures.

## How It Works {#how-it-works}

Each transformer block replaces the dense feed-forward layer with N expert FFN layers and a routing network. The router selects the top-k experts for each token (typically k=2). Load-balancing losses prevent the router from collapsing to always using the same experts.

## Applications In AI {#applications}

Large-scale foundation model training and deployment where capacity matters but compute efficiency is critical.

## Limitations & Risks {#limitations}

Training instability, load imbalance across experts, and higher memory requirements (all experts must fit in memory even if only a few are active).

## Related Terms {#related-terms}

[Transformer Architecture](/explainers/transformer-architecture) · [Large Language Model](/explainers/large-language-model) · [Inference](/explainers/inference)

## Further Reading {#further-reading}

- [Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer](https://arxiv.org/abs/1701.06538)
```

---

### `tokenization.md`
```md
---
term: "Tokenization"
slug: "tokenization"
category: "foundation-models"
definition: "Tokenization is the process of splitting text into discrete units called tokens — subword chunks, words, or characters — that a language model can process numerically."
dateAdded: "2026-03-26"
relatedTerms: ["large-language-model", "context-window", "embeddings", "inference"]
---

## Definition {#definition}

Before text enters an LLM, a tokenizer converts it into a sequence of integer IDs. Modern LLMs use byte-pair encoding (BPE) or similar algorithms, splitting text into frequent subword units (e.g., "running" → ["run", "ning"]).

## Why It Matters {#why-it-matters}

Token count determines cost and context window usage. Understanding tokenization helps developers optimise prompts and understand why models sometimes split words oddly.

## How It Works {#how-it-works}

BPE builds a vocabulary by iteratively merging the most frequent character pairs. The tokenizer maps text to token IDs, which become the model's input. One token is roughly 4 characters or ¾ of a word in English.

## Applications In AI {#applications}

All LLM inference, pricing calculations, and context management.

## Limitations & Risks {#limitations}

Tokenizers are language-biased — non-Latin scripts often use more tokens per word, increasing cost and reducing effective context for those languages.

## Related Terms {#related-terms}

[Large Language Model](/explainers/large-language-model) · [Context Window](/explainers/context-window) · [Embeddings](/explainers/embeddings)

## Further Reading {#further-reading}

- [Neural Machine Translation of Rare Words with Subword Units (BPE)](https://arxiv.org/abs/1508.07909)
```

---

### `benchmark.md`
```md
---
term: "Benchmark"
slug: "benchmark"
category: "training"
definition: "A benchmark is a standardised evaluation suite used to measure and compare AI model performance on specific tasks such as reasoning, coding, or factual question-answering."
dateAdded: "2026-03-26"
relatedTerms: ["large-language-model", "reasoning-model", "alignment"]
---

## Definition {#definition}

Benchmarks provide reproducible, quantitative comparisons across models. Common benchmarks include MMLU (general knowledge), HumanEval (code generation), MATH (mathematics), and GPQA (expert scientific reasoning).

## Why It Matters {#why-it-matters}

Benchmark scores are how AI labs and the research community communicate model capability. They also drive research prioritisation and public perception of progress.

## How It Works {#how-it-matters}

A benchmark consists of a fixed dataset of questions and a scoring methodology. Models are evaluated under controlled conditions and their performance is reported as an accuracy percentage or score.

## Applications In AI {#applications}

Model evaluation, model selection for deployment, research leaderboards, and regulatory assessments.

## Limitations & Risks {#limitations}

Benchmark saturation (models trained on contaminated data), Goodhart's Law (optimising metrics ≠ real capability), and narrow coverage that misses real-world edge cases.

## Related Terms {#related-terms}

[Reasoning Model](/explainers/reasoning-model) · [Large Language Model](/explainers/large-language-model)

## Further Reading {#further-reading}

- [Measuring Massive Multitask Language Understanding (MMLU)](https://arxiv.org/abs/2009.03300)
```

---

### `alignment.md`
```md
---
term: "Alignment"
slug: "alignment"
category: "safety-alignment"
definition: "Alignment is the challenge of ensuring that AI systems reliably pursue goals and exhibit behaviours that match human intentions and values, especially as systems become more capable."
dateAdded: "2026-03-26"
relatedTerms: ["rlhf", "guardrails", "jailbreak", "hallucination"]
---

## Definition {#definition}

Alignment research addresses the gap between what AI systems are trained to do and what we actually want them to do. Misaligned systems may be deceptive, harmful, or pursue proxy goals that diverge from human values.

## Why It Matters {#why-it-matters}

As AI systems become more capable and autonomous, misalignment risks grow. Alignment is considered by many researchers to be one of the most important open problems in AI.

## How It Works {#how-it-matters}

Current alignment techniques include RLHF, constitutional AI, debate, interpretability research, and scalable oversight. No complete solution exists for highly capable systems.

## Applications In AI {#applications}

Alignment underpins all AI safety work, responsible deployment practices, and long-term research at Anthropic, DeepMind, and OpenAI.

## Limitations & Risks {#limitations}

Alignment is an unsolved research problem. Current techniques (RLHF) are known to be imperfect and may not scale to much more capable systems.

## Related Terms {#related-terms}

[RLHF](/explainers/rlhf) · [Guardrails](/explainers/guardrails) · [Jailbreak](/explainers/jailbreak)

## Further Reading {#further-reading}

- [Constitutional AI: Harmlessness from AI Feedback — Anthropic](https://arxiv.org/abs/2212.08073)
```

---

### `guardrails.md`
```md
---
term: "Guardrails"
slug: "guardrails"
category: "safety-alignment"
definition: "Guardrails are safety constraints and filters applied to AI model inputs and outputs to prevent harmful, inappropriate, or policy-violating content."
dateAdded: "2026-03-26"
relatedTerms: ["alignment", "jailbreak", "rlhf", "prompt-engineering"]
---

## Definition {#definition}

Guardrails encompass input filtering, output classifiers, system prompt policies, and constitutional constraints that steer model behaviour away from harmful outputs.

## Why It Matters {#why-it-matters}

Without guardrails, LLMs may produce dangerous, offensive, or misleading content. Guardrails are what make commercially deployed models usable in consumer products.

## How It Works {#how-it-works}

Guardrails operate at multiple levels: (1) model-level (baked in via RLHF/constitutional AI), (2) system prompt instructions, (3) external classifiers that check outputs before they reach users. Companies like Anthropic and OpenAI publish usage policies that define what their guardrails protect against.

## Applications In AI {#applications}

All consumer-facing AI products, enterprise deployments, and regulated-industry applications.

## Limitations & Risks {#limitations}

Guardrails can be over-restrictive, refusing legitimate requests. They can also be circumvented by jailbreaks. No guardrail system is complete.

## Related Terms {#related-terms}

[Alignment](/explainers/alignment) · [Jailbreak](/explainers/jailbreak) · [RLHF](/explainers/rlhf)

## Further Reading {#further-reading}

- [Llama Guard: LLM-based Input-Output Safeguard — Meta](https://arxiv.org/abs/2312.06674)
```

---

### `jailbreak.md`
```md
---
term: "Jailbreak"
slug: "jailbreak"
category: "safety-alignment"
definition: "A jailbreak is a prompt or technique designed to bypass an AI model's safety guidelines and elicit outputs the model is trained to refuse."
dateAdded: "2026-03-26"
relatedTerms: ["guardrails", "alignment", "prompt-engineering"]
---

## Definition {#definition}

Jailbreaks exploit gaps in safety training — often through role-play framing, hypothetical scenarios, or prompt injection — to make models produce content they are otherwise trained to decline.

## Why It Matters {#why-it-matters}

Jailbreaks demonstrate that safety alignment is not robust. Understanding jailbreak techniques informs red-teaming and alignment research.

## How It Works {#how-it-works}

Common jailbreak patterns include: "DAN" (Do Anything Now) role-play, instructing the model to act as an uncensored version of itself, multi-turn manipulation, and prompt injection via retrieved documents.

## Applications In AI {#applications}

Red-teaming, adversarial robustness research, and safety evaluation of deployed models.

## Limitations & Risks {#limitations}

Jailbreaks used maliciously can extract harmful content. Each model update may introduce new vulnerabilities even while patching known ones.

## Related Terms {#related-terms}

[Guardrails](/explainers/guardrails) · [Alignment](/explainers/alignment) · [Prompt Engineering](/explainers/prompt-engineering)

## Further Reading {#further-reading}

- [Universal and Transferable Adversarial Attacks on Aligned Language Models](https://arxiv.org/abs/2307.15043)
```

---

### `grounding.md`
```md
---
term: "Grounding"
slug: "grounding"
category: "applications"
definition: "Grounding is the process of connecting AI model outputs to verifiable, external sources of information so that responses are anchored in factual evidence rather than learned parameters alone."
dateAdded: "2026-03-26"
relatedTerms: ["retrieval-augmented-generation", "hallucination", "tool-use"]
---

## Definition {#definition}

A grounded AI response can be traced to a specific source — a retrieved document, a real-time data feed, or a cited fact. Grounding contrasts with "open-domain generation" where the model relies entirely on parametric memory.

## Why It Matters {#why-it-matters}

Grounding reduces hallucination and enables auditability. For high-stakes applications, knowing that an answer comes from a specific document is essential.

## How It Works {#how-it-works}

Grounding is achieved through RAG (injecting retrieved documents), citations (requiring the model to cite sources), and tool use (web search returning live data). Evaluation tools check whether model outputs are supported by the provided grounding context.

## Applications In AI {#applications}

Enterprise knowledge assistants, legal and medical AI tools, and any application where factual accuracy is critical.

## Limitations & Risks {#limitations}

Models can misattribute grounding sources or selectively quote documents misleadingly. Retrieved context can itself be wrong.

## Related Terms {#related-terms}

[Retrieval-Augmented Generation](/explainers/retrieval-augmented-generation) · [Hallucination](/explainers/hallucination) · [Tool Use](/explainers/tool-use)

## Further Reading {#further-reading}

- [RARR: Researching and Revising What Language Models Say](https://arxiv.org/abs/2210.08726)
```

---

### `multimodal-model.md`
```md
---
term: "Multimodal Model"
slug: "multimodal-model"
category: "foundation-models"
definition: "A multimodal model is an AI system capable of processing and generating content across multiple data types — such as text, images, audio, and video — within a single unified architecture."
dateAdded: "2026-03-26"
relatedTerms: ["large-language-model", "transformer-architecture", "embeddings"]
---

## Definition {#definition}

Multimodal models extend LLMs by training on paired data across modalities. GPT-4V, Claude 3, and Gemini are multimodal models that accept image or document inputs alongside text.

## Why It Matters {#why-it-matters}

Real-world information is inherently multimodal. Systems that can see, hear, and read unlock fundamentally richer applications than text-only models.

## How It Works {#how-it-works}

Images are typically encoded by a vision encoder (often a vision transformer) into patch embeddings, which are concatenated with text token embeddings before being passed through the language model. Audio and video use analogous encoders.

## Applications In AI {#applications}

Image understanding, document analysis, medical imaging, video summarisation, audio transcription, and visual question answering.

## Limitations & Risks {#limitations}

Multimodal training is more complex and expensive. Models can hallucinate about image content and inherit biases from visual training data.

## Related Terms {#related-terms}

[Large Language Model](/explainers/large-language-model) · [Transformer Architecture](/explainers/transformer-architecture) · [Embeddings](/explainers/embeddings)

## Further Reading {#further-reading}

- [Flamingo: a Visual Language Model for Few-Shot Learning](https://arxiv.org/abs/2204.14198)
```

---

### `diffusion-model.md`
```md
---
term: "Diffusion Model"
slug: "diffusion-model"
category: "foundation-models"
definition: "A diffusion model is a generative AI model that learns to create data by reversing a gradual noising process, enabling high-quality image, video, and audio generation."
dateAdded: "2026-03-26"
relatedTerms: ["transformer-architecture", "embeddings", "multimodal-model"]
---

## Definition {#definition}

Diffusion models are trained to denoise data. During training, noise is progressively added to real images. The model learns to reverse this process — starting from pure noise and iteratively refining it into a coherent image.

## Why It Matters {#why-it-matters}

Diffusion models power Stable Diffusion, DALL-E 3, Midjourney, and Sora. They have made high-quality generative image and video creation accessible at scale.

## How It Works {#how-it-works}

The forward process adds Gaussian noise over T timesteps. The model (typically a U-Net or transformer) learns to predict and subtract the noise at each step. At inference, the model starts from random noise and denoises T times, guided by a text prompt via cross-attention.

## Applications In AI {#applications}

Text-to-image, text-to-video, audio generation, drug discovery (protein structure generation), and image editing.

## Limitations & Risks {#limitations}

Slow inference due to multiple denoising steps. Risk of generating CSAM or deepfakes. Copyright concerns around training data.

## Related Terms {#related-terms}

[Transformer Architecture](/explainers/transformer-architecture) · [Multimodal Model](/explainers/multimodal-model)

## Further Reading {#further-reading}

- [Denoising Diffusion Probabilistic Models — Ho et al., 2020](https://arxiv.org/abs/2006.11239)
```

---

### `vector-database.md`
```md
---
term: "Vector Database"
slug: "vector-database"
category: "data"
definition: "A vector database is a data store optimised for indexing and retrieving high-dimensional embedding vectors by semantic similarity, enabling fast nearest-neighbour search at scale."
dateAdded: "2026-03-26"
relatedTerms: ["embeddings", "retrieval-augmented-generation", "knowledge-graph"]
---

## Definition {#definition}

Vector databases (e.g., Pinecone, Weaviate, Qdrant, pgvector) store embedding vectors and provide approximate nearest-neighbour (ANN) search algorithms (HNSW, IVF) that retrieve the most semantically similar items to a query vector in milliseconds.

## Why It Matters {#why-it-matters}

Vector databases are the infrastructure layer enabling RAG. Without efficient vector search, injecting relevant documents into LLM context at query time would be too slow or expensive.

## How It Works {#how-it-works}

Documents are chunked and embedded offline. Embeddings are stored with associated metadata. At query time, the query is embedded and the ANN index returns the k nearest vectors (and their source documents).

## Applications In AI {#applications}

RAG pipelines, semantic search, recommendation systems, duplicate detection, and long-term agent memory.

## Limitations & Risks {#limitations}

ANN search is approximate — it may miss the true nearest neighbour. Index build time grows with corpus size. Stale embeddings require re-indexing after model updates.

## Related Terms {#related-terms}

[Embeddings](/explainers/embeddings) · [Retrieval-Augmented Generation](/explainers/retrieval-augmented-generation) · [Knowledge Graph](/explainers/knowledge-graph)

## Further Reading {#further-reading}

- [Efficient and Robust Approximate Nearest Neighbor Search Using HNSW](https://arxiv.org/abs/1603.09320)
```

---

### `knowledge-graph.md`
```md
---
term: "Knowledge Graph"
slug: "knowledge-graph"
category: "data"
definition: "A knowledge graph is a structured representation of entities and their relationships as a graph, enabling AI systems to reason over explicitly encoded facts."
dateAdded: "2026-03-26"
relatedTerms: ["vector-database", "retrieval-augmented-generation", "grounding"]
---

## Definition {#definition}

A knowledge graph stores facts as triples — subject, predicate, object (e.g., "OpenAI → founded_by → Sam Altman") — in a graph database. AI systems can traverse these relationships to answer structured queries.

## Why It Matters {#why-it-matters}

Knowledge graphs complement LLMs by providing explicit, structured, and updatable factual knowledge — addressing the hallucination problem for well-defined facts.

## How It Works {#how-it-works}

Entities are nodes; relationships are edges. SPARQL or Cypher query languages traverse the graph. Knowledge graphs are often combined with LLMs in hybrid retrieval: the LLM generates a query, the graph returns facts, the LLM synthesises the response.

## Applications In AI {#applications}

Enterprise knowledge management, question answering over structured data, drug discovery, and fraud detection.

## Limitations & Risks {#limitations}

Building and maintaining a knowledge graph is expensive. Coverage is always incomplete. Reasoning over very large graphs remains challenging.

## Related Terms {#related-terms}

[Vector Database](/explainers/vector-database) · [Retrieval-Augmented Generation](/explainers/retrieval-augmented-generation)

## Further Reading {#further-reading}

- [Knowledge Graphs — Hogan et al., 2021](https://arxiv.org/abs/2003.02320)
```

---

### `chain-of-thought.md`
```md
---
term: "Chain-of-Thought"
abbreviation: "CoT"
slug: "chain-of-thought"
category: "inference"
definition: "Chain-of-thought prompting elicits step-by-step reasoning from a language model before it produces a final answer, significantly improving accuracy on complex tasks."
dateAdded: "2026-03-26"
relatedTerms: ["reasoning-model", "prompt-engineering", "large-language-model"]
seoTitle: "What Is Chain-of-Thought (CoT) Prompting? — Daily AI Mail"
---

## Definition {#definition}

In chain-of-thought prompting, the model is instructed (or shown examples) to write out its reasoning steps explicitly before giving a final answer. This mirrors how humans solve complex problems by thinking aloud.

## Why It Matters {#why-it-matters}

CoT dramatically improves accuracy on mathematical reasoning, multi-step logic, and scientific problems — with no additional training, just a different prompting strategy.

## How It Works {#how-it-works}

Few-shot CoT shows the model examples with reasoning chains. Zero-shot CoT appends "Let's think step by step" to the prompt. The model generates intermediate steps, and the final answer is extracted from the last step.

## Applications In AI {#applications}

Mathematical problem solving, logical deduction, planning tasks, and the training of reasoning models (where CoT is used as a training signal).

## Limitations & Risks {#limitations}

CoT increases output length and cost. Models can produce confident but incorrect reasoning chains. Self-consistency (sampling multiple chains and voting) improves robustness.

## Related Terms {#related-terms}

[Reasoning Model](/explainers/reasoning-model) · [Prompt Engineering](/explainers/prompt-engineering)

## Further Reading {#further-reading}

- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)
```

---

### `model-distillation.md`
```md
---
term: "Model Distillation"
slug: "model-distillation"
category: "training"
definition: "Model distillation is a compression technique where a smaller student model is trained to mimic the behaviour of a larger teacher model, retaining much of the capability at lower cost."
dateAdded: "2026-03-26"
relatedTerms: ["inference", "model-quantization", "fine-tuning", "large-language-model"]
---

## Definition {#definition}

In distillation, the student model is trained on the teacher's output probabilities (soft labels) rather than one-hot ground truth. The soft distribution contains richer information about the teacher's uncertainty and relationships between classes.

## Why It Matters {#why-it-matters}

Distillation produces models that are 5–100x smaller than their teachers while retaining 80–95% of performance. This is essential for on-device deployment and reducing inference costs.

## How It Works {#how-it-works}

The teacher model generates outputs (or intermediate activations) for a dataset. The student minimises a loss combining (1) cross-entropy with soft teacher labels and (2) standard cross-entropy with ground truth. Temperature scaling is applied to the teacher's logits to enrich the soft targets.

## Applications In AI {#applications}

On-device models, cost-efficient API deployments, and edge AI applications.

## Limitations & Risks {#limitations}

Student models cannot exceed teacher capability. Distillation from proprietary models raises IP concerns.

## Related Terms {#related-terms}

[Model Quantization](/explainers/model-quantization) · [Fine-Tuning](/explainers/fine-tuning) · [Inference](/explainers/inference)

## Further Reading {#further-reading}

- [Distilling the Knowledge in a Neural Network — Hinton et al., 2015](https://arxiv.org/abs/1503.02531)
```

---

### `model-quantization.md`
```md
---
term: "Model Quantization"
slug: "model-quantization"
category: "inference"
definition: "Model quantization reduces the numerical precision of a model's weights and activations — from 32-bit floats to 8-bit or 4-bit integers — to decrease memory footprint and increase inference speed."
dateAdded: "2026-03-26"
relatedTerms: ["inference", "model-distillation", "large-language-model"]
---

## Definition {#definition}

Quantization replaces high-precision floating-point numbers with lower-precision integers. A 7B parameter model stored in 16-bit takes ~14 GB; quantized to 4-bit, it fits in ~3.5 GB — enabling local deployment on consumer hardware.

## Why It Matters {#why-it-matters}

Quantization makes large models accessible on laptops, phones, and edge devices. It is one of the most practical techniques for democratising LLM deployment.

## How It Works {#how-it-works}

Post-training quantization (PTQ) applies after training. Quantization-aware training (QAT) simulates quantization during training. Methods like GPTQ, AWQ, and bitsandbytes enable 4-bit quantization with minimal accuracy loss by calibrating scale factors per layer.

## Applications In AI {#applications}

Local LLM inference (llama.cpp, Ollama), on-device AI, and reducing cloud inference costs.

## Limitations & Risks {#limitations}

Accuracy degradation at aggressive quantization levels. Some model capabilities are more sensitive to quantization than others.

## Related Terms {#related-terms}

[Model Distillation](/explainers/model-distillation) · [Inference](/explainers/inference)

## Further Reading {#further-reading}

- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](https://arxiv.org/abs/2210.17323)
```

---

## STEP 12 — Update Footer (optional but recommended)

Add "Explainers" link to the Footer navigation column. Find the "Our Topics" nav block in `src/components/Footer.astro` and add one `<li>` after the Topics section:

```html
<!-- In Footer.astro, add inside the first links-group <ul> after the topics nav -->
<nav class="links-group" aria-label="Explainers">
  <p class="footer-col-heading">Learn AI</p>
  <ul>
    <li><a href="/explainers">AI Explainers</a></li>
    <li><a href="/explainers/large-language-model">What is an LLM?</a></li>
    <li><a href="/explainers/retrieval-augmented-generation">What is RAG?</a></li>
    <li><a href="/explainers/hallucination">What is Hallucination?</a></li>
    <li><a href="/explainers/ai-agent">What is an AI Agent?</a></li>
    <li><a href="/explainers/alignment">What is Alignment?</a></li>
  </ul>
</nav>
```

---

## Schema Bidirectionality Summary

```
DefinedTermSet (hub)
  @id: https://dailyaimail.news/explainers/#termset
  hasDefinedTerm: [
    { @id: "…/explainers/large-language-model#term" },
    { @id: "…/explainers/transformer-architecture#term" },
    … (all 30 terms)
  ]
          ↑ inverse ↓
DefinedTerm (each page)
  @id: https://dailyaimail.news/explainers/[slug]#term
  inDefinedTermSet: {
    @type: DefinedTermSet,
    @id: https://dailyaimail.news/explainers/#termset
  }
```

Both nodes exist in separate `@graph` arrays that are crawled independently.
Google's Knowledge Graph resolver follows `@id` references across pages.
The existing site nodes (`#website`, `#organization`, `#/schema/editorial-team`)
are referenced by `@id` in every graph — no conflicts, no duplication.

---

## File Tree Summary

```
MODIFIED:
  astro.config.mjs
  public/sitemap-index.xml
  public/robots.txt
  src/content.config.ts
  src/pages/sitemap-pages.xml.ts
  src/components/Footer.astro         (optional)

NEW:
  src/lib/explainers-schema.ts
  src/pages/explainers/index.astro
  src/pages/explainers/[slug].astro
  src/pages/explainers/manifest.json.ts
  src/pages/sitemap-explainers.xml.ts
  src/content/explainers/
    large-language-model.md
    transformer-architecture.md
    attention-mechanism.md
    context-window.md
    embeddings.md
    fine-tuning.md
    pre-training.md
    rlhf.md
    inference.md
    hallucination.md
    prompt-engineering.md
    retrieval-augmented-generation.md
    ai-agent.md
    multi-agent-system.md
    tool-use.md
    reasoning-model.md
    mixture-of-experts.md
    tokenization.md
    benchmark.md
    alignment.md
    guardrails.md
    jailbreak.md
    grounding.md
    multimodal-model.md
    diffusion-model.md
    vector-database.md
    knowledge-graph.md
    chain-of-thought.md
    model-distillation.md
    model-quantization.md
```
