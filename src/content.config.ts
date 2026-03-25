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

export const collections = { articles };