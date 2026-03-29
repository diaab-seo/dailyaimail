import type { APIRoute } from 'astro';
import { getArticles } from '../data/articles';

export const prerender = true;

export const GET: APIRoute = async () => {
    const articles = await getArticles();
    const SITE_URL = 'https://dailyaimail.news';

    const sorted = [...articles].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

    const urls = sorted.map(a => {
        const pubDate = new Date(a.isoDate);
        if (isNaN(pubDate.getTime())) return null;

        const modDate = new Date(a.modifiedDate || a.isoDate);
        const lastmod = !isNaN(modDate.getTime()) ? modDate.toISOString() : pubDate.toISOString();

        return `
  <url>
    <loc>${SITE_URL}/articles/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Daily AI Mail</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${a.headline.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      <news:keywords>${a.keywords.join(', ')}</news:keywords>
    </news:news>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    }).filter(Boolean).join('');

    // Main collection URLs
    urls += `
  <url>
    <loc>${SITE_URL}/news/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/topics/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

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