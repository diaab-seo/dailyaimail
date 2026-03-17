export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSession } from '../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
  const kv = (env as any).SESSIONS as KVNamespace;
  const user = await getSession(kv, cookies);

  return new Response(JSON.stringify(user ?? null), {
    headers: {
      'Content-Type': 'application/json',
      // Short cache — enough to avoid per-nav-render cost, short enough to reflect logout quickly
      'Cache-Control': 'private, max-age=10',
    },
  });
};
