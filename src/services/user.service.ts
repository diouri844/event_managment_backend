import { Context } from "hono";

export function ping(c: Context) {
    return c.json({
        message: 'Hello, World!',
        timestamp: new Date().toISOString(),
        status: 'success',
    });
}

export async function listUsers(c: Context) { };

export async function loginUser(c: Context) { };

export async function registerUser(c: Context) { };
