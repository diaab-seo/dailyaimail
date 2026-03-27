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
