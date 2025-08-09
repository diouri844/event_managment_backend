import { Context } from "hono";
import { db } from "../utils/instance.db";
import { Users } from "../Db/schema";

export function ping(c: Context) {
    return c.json({
        message: 'Hello, World!',
        timestamp: new Date().toISOString(),
        status: 'success',
    })
};

export async function test(c: Context) {
    try {
        // try to hit the database : 
        const result = await db.select().from(Users);
        return c.json({
            data: result,
            message: 'Test endpoint',
            timestamp: new Date().toISOString(),
            status: 'success',
        })
    } catch (error) {
        return c.json({
            message: 'An error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString(),
            status: 'error',
        })
    }

}