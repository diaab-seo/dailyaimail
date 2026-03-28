globalThis.process ??= {};
globalThis.process.env ??= {};
import { g as getArticles, a as getAllCategories, b as getArticlesByCategory, d as topicToSlug } from "./articles_CSfOZ2Bv.mjs";
const GET = async () => {
  const articles = await getArticles();
  const SITE_URL = "https://dailyaimail.news";
  const sorted = [...articles].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  let urls = sorted.map((a) => `
  <url>
    <loc>${SITE_URL}/articles/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Daily AI Mail</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${a.isoDate}T00:00:00+00:00</news:publication_date>
      <news:title>${a.headline.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</news:title>
      <news:keywords>${a.keywords.join(", ")}</news:keywords>
    </news:news>
    <lastmod>${a.modifiedDate ?? a.isoDate}T00:00:00+00:00</lastmod>
  </url>`).join("");
  const totalNewsPages = Math.ceil(articles.length / 12);
  for (let p = 2; p <= totalNewsPages; p++) {
    urls += `
  <url>
    <loc>${SITE_URL}/news/${p}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>`;
  }
  const categories = await getAllCategories();
  for (const tag of categories) {
    const topicArticles = await getArticlesByCategory(tag);
    const topicPages = Math.ceil(topicArticles.length / 12);
    const slug = topicToSlug(tag);
    for (let p = 2; p <= topicPages; p++) {
      urls += `
  <url>
    <loc>${SITE_URL}/topics/${slug}/${p}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>`;
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
