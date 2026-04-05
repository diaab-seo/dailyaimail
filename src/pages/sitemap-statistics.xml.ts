import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toSchemaDate } from '../lib/dateUtils';

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

export const GET: APIRoute = async () => {
  const entries = await getCollection('statistics');
  const SITE = 'https://dailyaimail.news';
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.data.isoDate).getTime() - new Date(a.data.isoDate).getTime()
  );
  const latestLastmod = sortedEntries.length > 0
    ? toSchemaDate(sortedEntries[0].data.updatedAt ?? sortedEntries[0].data.isoDate)
    : undefined;

  const hubUrl = `
    <url>
      <loc>${SITE}/statistics</loc>
      ${latestLastmod ? `<lastmod>${latestLastmod}</lastmod>` : ''}
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;

  const urls = sortedEntries
    .map((entry) => {
      const modifiedDate = toSchemaDate(entry.data.updatedAt ?? entry.data.isoDate);
      return `
    <url>
      <loc>${SITE}/statistics/${escapeXml(entry.id)}</loc>
      <lastmod>${modifiedDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${hubUrl}${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
