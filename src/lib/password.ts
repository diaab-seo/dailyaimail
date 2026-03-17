/**
 * src/lib/password.ts
 * PBKDF2 password hashing using Web Crypto API.
 * Works in Cloudflare Workers (no Node.js crypto needed).
 */

function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex: string): Uint8Array {
    const arr = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        arr[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return arr;
}

export async function hashPassword(
    password: string,
    existingSalt?: string
): Promise<{ hash: string; salt: string }> {
    const saltBytes = existingSalt
        ? hexToBytes(existingSalt)
        : crypto.getRandomValues(new Uint8Array(16));

    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const bits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations: 100_000 },
        keyMaterial,
        256
    );

    return {
        hash: bytesToHex(new Uint8Array(bits)),
        salt: bytesToHex(saltBytes),
    };
}

export async function verifyPassword(
    password: string,
    storedHash: string,
    storedSalt: string
): Promise<boolean> {
    const { hash } = await hashPassword(password, storedSalt);
    // Constant-time comparison to prevent timing attacks
    if (hash.length !== storedHash.length) return false;
    let diff = 0;
    for (let i = 0; i < hash.length; i++) {
        diff |= hash.charCodeAt(i) ^ storedHash.charCodeAt(i);
    }
    return diff === 0;
}