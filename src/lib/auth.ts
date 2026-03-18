/**
 * src/lib/auth.ts
 * Session management via Cloudflare KV.
 * Session token → stored in HttpOnly cookie, value stored in KV with 30d TTL.
 */

import type { AstroCookies } from 'astro';

export const SESSION_COOKIE = 'dai_session';
export const SESSION_TTL_SEC = 60 * 60 * 24 * 30;  // 30 days

export type SessionUser = {
    id: number;
    email: string;
    username: string;
    displayName: string;
    avatarInitials: string;
    role: 'reader' | 'admin';
};

/** Generate a cryptographically random session token */
export function generateToken(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Write session to KV and set the cookie */
export async function createSession(
    kv: KVNamespace,
    cookies: AstroCookies,
    user: SessionUser,
    meta: { ip?: string; ua?: string } = {}
): Promise<string> {
    const token = generateToken();
    const payload = JSON.stringify({ user, ip: meta.ip, ua: meta.ua, created: Date.now() });

    await kv.put(`session:${token}`, payload, { expirationTtl: SESSION_TTL_SEC });

    cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: SESSION_TTL_SEC,
        path: '/',
    });

    return token;
}

/** Read and validate session from cookie */
export async function getSession(
    kv: KVNamespace,
    cookies: AstroCookies
): Promise<SessionUser | null> {
    const token = cookies.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const raw = await kv.get(`session:${token}`);
    if (!raw) return null;

    try {
        const data = JSON.parse(raw);
        return data.user as SessionUser;
    } catch {
        return null;
    }
}

/** Destroy session */
export async function destroySession(
    kv: KVNamespace,
    cookies: AstroCookies
): Promise<void> {
    const token = cookies.get(SESSION_COOKIE)?.value;
    if (token) await kv.delete(`session:${token}`);

    cookies.delete(SESSION_COOKIE, { path: '/' });
}

/** Require auth — redirect if not logged in */
export function requireAuth(user: SessionUser | null, redirectTo = '/auth/login'): Response | null {
    if (!user) {
        return new Response(null, { status: 302, headers: { Location: redirectTo } });
    }
    return null;
}

/** Require admin role */
export function requireAdmin(user: SessionUser | null): Response | null {
    if (!user || user.role !== 'admin') {
        return new Response(null, { status: 302, headers: { Location: '/' } });
    }
    return null;
}