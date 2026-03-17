/**
 * src/pages/api/me.ts
 * SSR endpoint — returns the current session user as JSON (or null).
 * The Navbar fetches this client-side so the static Navbar component can
 * show the logged-in state without needing to be server-rendered itself.
 *
 * Response: { user: SessionUser } | { user: null }
 * Cache-Control: private, max-age=10 — fast but short so logout reflects quickly.
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSession } from '../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
  const kv = (env as any).SESSIONS as KVNamespace | undefined;

  if (!kv) {
    // KV not available (local dev without wrangler) — return null user silently
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  }

  const user = await getSession(kv, cookies);

  return new Response(JSON.stringify({ user: user ?? null }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Private so CDN won't share sessions between users.
      // max-age=10 means logout reflects within ~10 seconds on next navigation.
      'Cache-Control': 'private, max-age=10',
    },
  });
};
