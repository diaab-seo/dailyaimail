import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
    schema: z.object({
        tag: z.string(),
        tags: z.array(z.string()).optional(), // additional display topics beyond primary tag
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
            type: z.string(), // Schema.org @type e.g. "Organization", "Person", "Thing"
            sameAs: z.string().optional(), // Wikipedia or Wikidata URL
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
        featuredImage:  z.string().optional(), // e.g. "/images/explainers/what-is-llm.png"
        dateAdded:      z.string(),           // ISO date string e.g. "2026-03-26"
        lastUpdated:    z.string().optional(),
        relatedTerms:   z.array(z.string()).optional(), // slugs
        seoTitle:       z.string().optional(),
        seoDescription: z.string().optional(),
    }),
});

export const collections = { articles, explainers };