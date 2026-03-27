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
