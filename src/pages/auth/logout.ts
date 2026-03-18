export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { destroySession } from '../../lib/auth';

export const POST: APIRoute = async ({ cookies }) => {
    const kv = (env as any).SESSION as KVNamespace;
    await destroySession(kv, cookies);
    return new Response(null, { status: 302, headers: { Location: '/' } });
};