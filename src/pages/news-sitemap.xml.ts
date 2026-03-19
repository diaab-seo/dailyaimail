import type { APIRoute } from 'astro';
import { getArticles } from '../data/articles';

export const GET: APIRoute = async () => {
    const articles = await getArticles();
    const SITE_URL = 'https://dailyaimail.news';

    const sorted = [...articles].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

    const urls = sorted.map(a => `
  <url>
    <loc>${SITE_URL}/articles/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Daily AI Mail</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${a.isoDate}T00:00:00+00:00</news:publication_date>
      <news:title>${a.headline.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      <news:keywords>${a.keywords.join(', ')}</news:keywords>
    </news:news>
    <lastmod>${a.modifiedDate ?? a.isoDate}T00:00:00+00:00</lastmod>
  </url>`).join('');

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