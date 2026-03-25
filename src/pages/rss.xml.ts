import type { APIRoute } from 'astro';
import { getLatestArticles } from '../data/articles';

export const prerender = true;

export const GET: APIRoute = async ({ request }) => {
  const articles = await getLatestArticles(100);
  const siteUrl = 'https://dailyaimail.news';
  const feedUrl = `${siteUrl}/rss.xml`;

  const items = articles.map(article => {
    const articleLink = `${siteUrl}/articles/${article.slug}`;
    const pubDate = new Date(article.isoDate).toUTCString();
    
    // Construct absolute image URL if available
    let mediaTags = '';
    if (article.image) {
      const imgUrl = article.image.startsWith('http') 
        ? article.image 
        : `${siteUrl}${article.image.startsWith('/') ? '' : '/'}${article.image}`;
      
      const imgFileName = article.image.split('/').pop() || 'image.jpg';

      mediaTags = `
                <media:thumbnail url="${imgUrl}" />
                <media:content url="${imgUrl}" medium="image">
                    <media:title type="html"><![CDATA[${imgFileName}]]></media:title>
                </media:content>`;
    }

    return `        <item>
            <title><![CDATA[${article.headline}]]></title>
            <link><![CDATA[${articleLink}]]></link>
            <description><![CDATA[${article.excerpt}]]></description>
            <pubDate>${pubDate}</pubDate>
            <dc:creator><![CDATA[${article.author}]]></dc:creator>
            <guid isPermaLink="false"><![CDATA[${articleLink}]]></guid>${mediaTags}
        </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xml:base="${siteUrl}"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:media="http://search.yahoo.com/mrss/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>Daily AI Mail</title>
        <link>${siteUrl}</link>
        <description>Your daily source for AI news, research and tools</description>
        <language>en</language>
        <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
    </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
