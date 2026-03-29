import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles');
  
  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  
  const recentArticles = articles.filter(article => {
    const dateStr = article.data.isoDate || article.data.date;
    if (!dateStr) return false;
    const pubDate = new Date(dateStr);
    return pubDate >= fortyEightHoursAgo;
  });

  const urls = recentArticles
    .map(article => {
      const pubDate = new Date(article.data.isoDate);
      if (isNaN(pubDate.getTime())) return null;

      return `
    <url>
      <loc>https://dailyaimail.news/articles/${article.id}</loc>
      <news:news>
        <news:publication>
          <news:name>Daily AI Mail</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${pubDate.toISOString()}</news:publication_date>
        <news:title>${escapeXml(article.data.headline)}</news:title>
      </news:news>
    </url>`;
    })
    .filter(Boolean)
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls}\n</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml' }
    }
  );
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}
