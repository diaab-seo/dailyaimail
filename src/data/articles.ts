import { getCollection } from 'astro:content';

export type Article = {
  slug: string;
  tag: string;
  tags: string[];
  headline: string;
  excerpt: string;
  body: string;
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
  mentions: { name: string; url: string; type: string; sameAs?: string }[];
  about: { name: string; url: string; type: string; sameAs?: string }[];
  citations: { name: string; url: string; type: string }[];
};

async function fetchArticles(): Promise<Article[]> {
  const entries = await getCollection('articles');
  return entries.map((e) => ({
    slug: e.id,
    tag: e.data.tag,
    tags: [...new Set([e.data.tag, ...(e.data.tags ?? [])])],
    headline: e.data.headline,
    excerpt: e.data.excerpt,
    body: e.body ?? '',
    date: e.data.date,
    isoDate: e.data.isoDate,
    modifiedDate: e.data.modifiedDate ?? e.data.isoDate,
    author: e.data.author,
    authorUrl: e.data.authorUrl ?? '',
    readingTime: e.data.readingTime,
    image: e.data.image,
    imageWidth: e.data.imageWidth,
    imageHeight: e.data.imageHeight,
    imageCaption: e.data.imageCaption,
    keywords: e.data.keywords ?? [e.data.tag],
    articleSection: e.data.articleSection ?? [e.data.tag],
    mentions: e.data.mentions ?? [],
    about: e.data.about ?? [],
    citations: e.data.citations ?? [],
  }));
}

export async function getArticles(): Promise<Article[]> { return fetchArticles(); }
export async function getAllCategories(): Promise<string[]> {
  const a = await fetchArticles();
  const allTags = a.flatMap(x => x.tags);
  return [...new Set(allTags)];
}
export async function getArticlesByCategory(tag: string): Promise<Article[]> {
  const a = await fetchArticles();
  return a.filter(x => x.tags.includes(tag));
}
export async function getArticleBySlug(slug: string): Promise<Article | undefined> { const a = await fetchArticles(); return a.find(x => x.slug === slug); }
export async function getLatestArticles(count = 3): Promise<Article[]> { const a = await fetchArticles(); return [...a].sort((x, y) => new Date(y.isoDate).getTime() - new Date(x.isoDate).getTime()).slice(0, count); }

/** Converts a tag to a URL-safe slug. Used for /topics/ paths. */
export function topicToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

/** Alias kept for backward compatibility with existing imports */
export const categoryToSlug = topicToSlug;

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

export function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^\s*[-*+]\s/gm, '')
    .replace(/^\s*\d+\.\s/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Extracts image URLs from Markdown content. */
export function extractImages(md: string): string[] {
  const images: string[] = [];
  // Standard Markdown images: ![alt](url)
  const mdRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = mdRegex.exec(md)) !== null) {
    if (match[1]) images.push(match[1]);
  }
  // HTML images: <img src="url" ...>
  const htmlRegex = /<img.*?src=["'](.*?)["'].*?>/g;
  while ((match = htmlRegex.exec(md)) !== null) {
    if (match[1]) images.push(match[1]);
  }
  return [...new Set(images)];
}