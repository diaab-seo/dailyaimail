import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles');
  
  const staticPages = [
    '',
    '/about-us',
    '/about-us/editorial-team',
    '/contact-us',
    '/publishing-principles',
    '/terms-and-conditions',
    '/privacy-policy',
    '/cookies-policy',
    '/topics',
    '/news'
  ];

  const allTags = [...new Set(articles.flatMap(a => [a.data.tag, ...(a.data.tags ?? [])]))];
  const topicPages = allTags.map(tag => `/topics/${tag.toLowerCase().replace(/\\s+/g, '-').replace(/&/g, 'and')}`);

  const articlePages = articles.map(a => `/articles/${a.id}`);

  const allUrls = [
    ...staticPages,
    ...topicPages,
    ...articlePages
  ];

  const urlElements = allUrls.map(url => `
    <url>
      <loc>https://dailyaimail.news${url}</loc>
    </url>`).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}\n</urlset>`,
    {
      headers: { 'Content-Type': 'application/xml' }
    }
  );
}
