/**
 * src/pages/auth/google.ts
 * OAuth endpoint to handle Google Sign-In poster responses.
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from "cloudflare:workers";
import { createSession, type SessionUser } from "../../lib/auth";
import { getUserByEmail, getUserById, createUser, updateLastLogin, makeInitials, getUserByUsername } from "../../lib/db";
import { hashPassword } from "../../lib/password";

const CLIENT_ID = "211980990853-n9806238qr51qtn69h914ed1nbv5a8m0.apps.googleusercontent.com";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    try {
        const formData = await request.formData();
        const credential = formData.get('credential');
        
        if (!credential || typeof credential !== 'string') {
            return new Response('Missing Google token credential', { status: 400 });
        }

        // Verify token against Google's tokeninfo endpoint
        const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        if (!res.ok) {
            return new Response('Invalid Google token', { status: 401 });
        }
        
        const payload: any = await res.json();
        
        if (payload.aud !== CLIENT_ID) {
            return new Response('Token audience mismatch', { status: 401 });
        }

        const email = payload.email.toLowerCase();
        const name = payload.name || email.split('@')[0];
        const emailVerified = payload.email_verified === "true" || payload.email_verified === true;

        if (!emailVerified) {
            return new Response('Email not verified by Google', { status: 400 });
        }

        const db = (env as any).DB as D1Database;
        const kv = (env as any).SESSION as KVNamespace;

        let dbUser = await getUserByEmail(db, email);

        if (!dbUser) {
            // Generate a random password for users signing in via Google
            const randomPass = crypto.randomUUID();
            const { hash, salt } = await hashPassword(randomPass);
            
            // Generate a unique username
            let baseUsername = email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase();
            let username = baseUsername;
            let suffix = 1;
            while (await getUserByUsername(db, username)) {
                username = `${baseUsername}${suffix}`;
                suffix++;
            }
            
            const initials = makeInitials(name);
            
            const newId = await createUser(db, {
                email,
                username,
                password_hash: hash,
                password_salt: salt,
                display_name: name,
                avatar_initials: initials
            });
            
            dbUser = await getUserById(db, newId);
        }
        
        if (!dbUser) {
             return new Response('Failed to create user', { status: 500 });
        }
        
        const sessionUser: SessionUser = {
            id: dbUser.id,
            email: dbUser.email,
            username: dbUser.username,
            displayName: dbUser.display_name,
            avatarInitials: dbUser.avatar_initials,
            role: dbUser.role,
        };

        const ip = request.headers.get("CF-Connecting-IP") ?? undefined;
        const ua = request.headers.get("User-Agent") ?? undefined;
        
        await createSession(kv, cookies, sessionUser, { ip, ua });
        await updateLastLogin(db, sessionUser.id);
        
        return redirect("/");
    } catch (e: any) {
        return new Response('Internal Server Error: ' + e.message, { status: 500 });
    }
};
