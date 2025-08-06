import { Context } from "hono";

export function ping(c: Context) {
    return c.json({
        message: 'Hello, World!',
        timestamp: new Date().toISOString(),
        status: 'success',
    })
};

export function test(c: Context) {
    return c.json({
        message: 'Test endpoint',
        timestamp: new Date().toISOString(),
        status: 'success',
    })
}