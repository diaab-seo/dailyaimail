import { getCollection } from 'astro:content';

export async function getExplainerMap() {
  const explainers = await getCollection('explainers');
  const map = new Map<string, { slug: string, title: string, excerpt: string }>();
  for (const exp of explainers) {
    map.set(exp.data.term.toLowerCase(), {
      slug: exp.id || exp.data.slug,
      title: exp.data.term,
      excerpt: exp.data.definition
    });
  }
  return map;
}

export async function getExplainerList() {
  const explainers = await getCollection('explainers');
  return explainers.map(exp => ({
    slug: exp.id || exp.data.slug,
    title: exp.data.term,
    excerpt: exp.data.definition
  }));
}
