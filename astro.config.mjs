// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
            configPath: './wrangler.jsonc',
        },
        // Only route SSR pages through the CF worker runtime.
        // Static pages (topics, homepage, category, legal pages) are served
        // directly and don't need the worker runner resolving astro:content.
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
                '/news-sitemap.xml',
                '/sitemap*',
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
