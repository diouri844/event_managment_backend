import { Context } from "hono";


export function ping(c: Context) {
    return c.json({
        message: 'event service up and running!',
        timestamp: new Date().toISOString(),
        status: 'success',
    });
}

export async function listEvents(c: Context) { };
export async function createEvent(c: Context) { };
export async function updateEvent(c: Context) { };
export async function deleteEvent(c: Context) { };
export async function getEventById(c: Context) { };
export async function registerForEvent(c: Context) { };
export async function getRegistrations(c: Context) { };
export async function cancelRegistration(c: Context) { };
export async function getEventTickets(c: Context) { };



