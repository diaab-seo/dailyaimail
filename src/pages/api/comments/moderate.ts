export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSession, requireAdmin } from '../../lib/auth';
import { approveComment, rejectComment, deleteComment } from '../../lib/db';

export const POST: APIRoute = async ({ request, cookies }) => {
    const db = (env as any).DB as D1Database;
    const kv = (env as any).SESSIONS as KVNamespace;

    const user = await getSession(kv, cookies);
    const denied = requireAdmin(user);
    if (denied) return denied;

    const form = await request.formData();
    const action = form.get('action') as string;
    const commentId = parseInt(form.get('commentId') as string);

    if (!action || isNaN(commentId)) return new Response(null, { status: 400 });

    if (action === 'approve') await approveComment(db, commentId, user!.id);
    if (action === 'reject') await rejectComment(db, commentId, user!.id);
    if (action === 'delete') await deleteComment(db, commentId);

    return new Response(null, { status: 302, headers: { Location: '/admin/comments' } });
};