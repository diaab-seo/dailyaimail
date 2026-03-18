export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSession } from '../../../lib/auth';
import { createComment } from '../../../lib/db';

export const POST: APIRoute = async ({ request, cookies }) => {
    const db = (env as any).DB as D1Database;
    const kv = (env as any).SESSION as KVNamespace;

    const user = await getSession(kv, cookies);
    if (!user) return new Response(null, { status: 302, headers: { Location: '/auth/login' } });

    const form = await request.formData();
    const articleSlug = (form.get('articleSlug') as string ?? '').trim();
    const body = (form.get('body') as string ?? '').trim();
    const ip = request.headers.get('CF-Connecting-IP') ?? undefined;

    if (!articleSlug || !body) return new Response(null, { status: 400 });
    if (body.length > 2000) {
        return new Response(null, { status: 302, headers: { Location: `/articles/${articleSlug}?err=toolong#comments` } });
    }

    await createComment(db, { article_slug: articleSlug, user_id: user.id, body, ip_address: ip });
    return new Response(null, { status: 302, headers: { Location: `/articles/${articleSlug}?commented=1#comments` } });
};