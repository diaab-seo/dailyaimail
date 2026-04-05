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
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
        mentions: z.array(z.string()).optional().default([]),
        about: z.array(z.object({
            name: z.string(),
            url: z.string(),
            type: z.string(),
            sameAs: z.string().optional(),
        })).optional(),
        citations: z.array(z.object({
            name: z.string(),
            url: z.string(),
            type: z.string().optional().default('CreativeWork'),
        })).optional(),
    }),
});

const explainers = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/explainers' }),
    schema: z.object({
        term: z.string(),
        abbreviation: z.string().optional(),
        slug: z.string(),
        category: z.enum([
            'foundation-models',
            'training',
            'inference',
            'agents',
            'safety-alignment',
            'architecture',
            'data',
            'applications',
        ]),
        definition: z.string(),
        featuredImage: z.string().optional(),
        dateAdded: z.string(),
        lastUpdated: z.string().optional(),
        relatedTerms: z.array(z.string()).optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
    }),
});

const statistics = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/statistics' }),
    schema: z.object({
        headline: z.string(),
        excerpt: z.string(),
        date: z.string(),
        isoDate: z.string(),
        updatedAt: z.string().optional(),
        author: z.string(),
        authorUrl: z.string().optional(),
        image: z.string(),
        imageWidth: z.number(),
        imageHeight: z.number(),
        imageCaption: z.string().optional(),
        imageAlt: z.string(),
        keywords: z.array(z.string()),
        topic: z.string(),
        entity: z.string(),
        dataUpdated: z.string(),
        sources: z.array(z.object({
            name: z.string(),
            url: z.string(),
        })),
        keyStats: z.array(z.object({
            label: z.string(),
            value: z.string(),
            note: z.string().optional(),
        })),
        mentions: z.array(z.string()).optional(),
        citations: z.array(z.string()).optional(),
    }),
});

export const collections = { articles, explainers, statistics };
