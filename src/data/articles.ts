import { getCollection } from 'astro:content';

// ── Public type ───────────────────────────────────────────────────────────────
// Kept identical to the original so no other files need to change their imports.
export type Article = {
  slug: string;
  tag: string;
  headline: string;
  excerpt: string;
  body: string;   // raw markdown body
  date: string;
  isoDate: string;
  modifiedDate: string;
  author: string;
  authorUrl: string;
  readingTime: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageCaption?: string;
  keywords: string[];
  articleSection: string[];
};

// ── Collection → Article adapter ─────────────────────────────────────────────
async function fetchArticles(): Promise<Article[]> {
  const entries = await getCollection('articles');
  return entries.map((e) => ({
    slug: e.id,
    tag: e.data.tag,
    headline: e.data.headline,
    excerpt: e.data.excerpt,
    body: e.body,
    date: e.data.date,
    isoDate: e.data.isoDate,
    modifiedDate: e.data.modifiedDate ?? e.data.isoDate,
    author: e.data.author,
    authorUrl: e.data.authorUrl ?? 'https://interactiveseo.digital',
    readingTime: e.data.readingTime,
    image: e.data.image,
    imageWidth: e.data.imageWidth,
    imageHeight: e.data.imageHeight,
    imageCaption: e.data.imageCaption,
    keywords: e.data.keywords ?? [e.data.tag],
    articleSection: e.data.articleSection ?? [e.data.tag],
  }));
}

// ── Async helpers (used in .astro frontmatter blocks) ────────────────────────

export async function getArticles(): Promise<Article[]> {
  return fetchArticles();
}

export async function getAllCategories(): Promise<string[]> {
  const all = await fetchArticles();
  return [...new Set(all.map((a) => a.tag))];
}

export async function getArticlesByCategory(tag: string): Promise<Article[]> {
  const all = await fetchArticles();
  return all.filter((a) => a.tag === tag);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const all = await fetchArticles();
  return all.find((a) => a.slug === slug);
}

export async function getLatestArticles(count = 3): Promise<Article[]> {
  const all = await fetchArticles();
  return [...all]
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
    .slice(0, count);
}

// ── Pure helpers (no async needed) ───────────────────────────────────────────

export function categoryToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

export function tagColor(tag: string): string {
  const map: Record<string, string> = {
    'Anthropic': 'var(--tag-anthropic)',
    'Google AI': 'var(--tag-google)',
    'OpenAI': 'var(--tag-openai)',
    'Meta AI': 'var(--tag-meta)',
    'Tools & Apps': 'var(--tag-tools)',
    'Policy & Ethics': 'var(--tag-policy)',
  };
  return map[tag] ?? 'var(--tag-default)';
}

// ── Markdown → plain text (for articleBody in schema) ────────────────────────
export function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, '')        // headings
    .replace(/\*\*(.+?)\*\*/g, '$1')    // bold
    .replace(/\*(.+?)\*/g, '$1')        // italic
    .replace(/`{1,3}[^`]*`{1,3}/g, '')  // code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/^\s*[-*+]\s/gm, '')       // list bullets
    .replace(/^\s*\d+\.\s/gm, '')       // numbered lists
    .replace(/\n{3,}/g, '\n\n')         // extra blank lines
    .trim();
}