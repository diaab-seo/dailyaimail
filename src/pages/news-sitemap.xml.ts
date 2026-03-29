import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

/**
 * Google News Sitemap
 *
 * Requirements:
 * 1. Only include articles from the last 2 days (48 hours).
 * 2. At most 1,000 URLs (though Google says up to 50,000, 1k is a recommended common limit).
 * 3. Use news-specific tags (<news:news>, <news:publication>, etc.).
 */
export const GET: APIRoute = async () => {
    const articles = await getCollection('articles');
    const SITE_URL = 'https://dailyaimail.news';

    // 1. Calculate time threshold (48 hours ago)
    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    // 2. Filter articles: Last 48 hours only
    const recentArticles = articles.filter(e => {
        const dateStr = e.data.isoDate || e.data.date;
        if (!dateStr) return false;
        const pubDate = new Date(dateStr);
        return pubDate >= fortyEightHoursAgo;
    });

    // 3. Sort by date descending
    const sorted = recentArticles.sort((a, b) => {
        const dateA = new Date(a.data.isoDate || a.data.date);
        const dateB = new Date(b.data.isoDate || b.data.date);
        return dateB.getTime() - dateA.getTime();
    });

    const urls = sorted.map(e => {
        const pubDate = new Date(e.data.isoDate || e.data.date);
        if (isNaN(pubDate.getTime())) return null;

        const modDate = new Date(e.data.modifiedDate || e.data.isoDate || e.data.date);
        const lastmod = !isNaN(modDate.getTime()) ? modDate.toISOString() : pubDate.toISOString();

        return `
  <url>
    <loc>${SITE_URL}/articles/${e.id}</loc>
    <news:news>
      <news:publication>
        <news:name>Daily AI Mail</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${escapeXml(e.data.headline)}</news:title>
      <news:keywords>${escapeXml((e.data.keywords || [e.data.tag]).join(', '))}</news:keywords>
    </news:news>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    }).filter(Boolean).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
};

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}