// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { EXPLAINER_TOOLTIP_CAP } from './src/lib/explainer-config.ts';
import { rehypeExplainerTooltips } from './src/lib/rehype-explainer-tooltips.ts';

function buildExplainerMap() {
    const explainersDir = path.join(process.cwd(), 'src/content/explainers');
    const map = new Map();
    if (!fs.existsSync(explainersDir)) return map;

    const files = fs.readdirSync(explainersDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    for (const file of files) {
        const content = fs.readFileSync(path.join(explainersDir, file), 'utf8');
        const parsed = matter(content);
        const title = parsed.data.term;
        const slug = parsed.data.slug || file.replace(/\.mdx?$/, '');
        if (title && slug) {
            map.set(title.toLowerCase(), { slug, title, excerpt: parsed.data.definition || '' });
        }
    }
    return map;
}

function explainerPluginFactory() {
    let explainerMap = null;
    return (tree, vfile) => {
        try {
            if (!explainerMap) {
                explainerMap = buildExplainerMap();
            }

            const frontmatter = vfile.data?.astro?.frontmatter || {};
            const articleTitle = frontmatter.headline || frontmatter.title || '';
            const plugin = rehypeExplainerTooltips({
                terms: explainerMap,
                tooltipCap: EXPLAINER_TOOLTIP_CAP,
                articleTitle,
            });

            plugin(tree, vfile);
            return tree;
        } catch (err) {
            console.error('[explainerPluginFactory] Error:', err);
            return tree;
        }
    };
}

export default defineConfig({
    integrations: [
        mdx({
            extendMarkdownConfig: true,
        }),
    ],
    build: {
        format: 'file',
    },
    markdown: {
        rehypePlugins: [explainerPluginFactory],
    },
    trailingSlash: 'never',
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
            configPath: './wrangler.jsonc',
        },
        routes: {
            strategy: 'exclude',
            exclude: [
                '/',
                '/topics',
                '/topics/*',
                '/about-us',
                '/contact-us',
                '/privacy-policy',
                '/cookies-policy',
                '/terms-and-conditions',
                '/publishing-principles',
                '/press-kit',
                '/rss.xml',
                '/newsletter',
                '/statistics',
                '/news/*',
                '/explainers',
                '/explainers/*',
                '/statistics/*',
            ],
        },
    }),

    vite: {
        build: {
            rollupOptions: {
                external: ['/pagefind/pagefind-ui.js'],
            },
        },
        ssr: {
            external: ['node:crypto'],
            noExternal: ['astro/loaders', 'astro:content'],
        },
        optimizeDeps: {
            exclude: ['astro:content', 'astro/loaders'],
        },
    },
});
