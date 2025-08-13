import { Context } from "hono";
import { Events } from "../Db/schema";
import EventServiceProvider from "../services/event.service";
import { CreateVentDto, UpdateEventDto } from "../types/event.type";


export function ping(c: Context) {
    return c.json({
        message: 'event service up and running!',
        timestamp: new Date().toISOString(),
        status: 'success',
    });
}
const eventService = new EventServiceProvider();

export async function listEvents(c: Context) {
    try {
        // time to extract the pagination info from the context : 
        const page = c.req.query('page') ? parseInt(c.req.query('page') as string) : 1;
        const limit = c.req.query('limit') ? parseInt(c.req.query('limit') as string) : 10;
        // call the service provider to et the needed dat : 
        const paginationOption = {
            limit: limit,
            offset: (page - 1) * limit
        };


        const eventList: typeof Events.$inferSelect[] | null = await eventService.getAllEvents(paginationOption);
        if (!eventList) {
            return c.json({
                message: 'No events found',
                status: 'error',
                data: []
            });
        }
        // time to return the data : 
        return c.json({
            message: 'Events fetched successfully',
            data: eventList,
            page,
            limit,
            status: 'success'
        });
    } catch (error) {
        return c.json({
            message: 'Error fetching events',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
};
export async function createEvent(c: Context) {
    try {
        // extract the event payload from the request body
        const eventPayload = await c.req.json() as CreateVentDto;
        // call the service provider to create new event : 
        const createdEvent: typeof Events.$inferInsert | null = await eventService.createEvent(eventPayload);
        // time to return the data :
        if (!createdEvent) {
            return c.json({
                message: 'Error creating event',
                status: 'error',
                data: null
            });
        }
        return c.json({
            message: 'Event created successfully',
            data: createdEvent,
            status: 'success'
        });
    } catch (error) {
        return c.json({
            message: 'Error creating event',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        })
    }
};
export async function updateEvent(c: Context) {
    try {
        // extract the event ID from the request parameters
        const eventId = parseInt(c.req.param('id'));
        // extract the updated event payload from the request body
        const updatedEventPayload = await c.req.json() as UpdateEventDto;
        // call the service provider to update the event :
        const updatedEvent: typeof Events.$inferSelect | null = await eventService.updateEvent(eventId, updatedEventPayload);
        // time to return the data :
        if (!updatedEvent) {
            return c.json({
                message: 'Error updating event',
                status: 'error',
                data: null
            });
        }
        return c.json({
            message: 'Event updated successfully',
            data: updatedEvent,
            status: 'success'
        });
    } catch (error) {
        return c.json({
            message: 'Error updating event',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
};
export async function deleteEvent(c: Context) {
    try {
        // extract the event id form the request parameters
        const eventId = c.req.param('id');
        // call the service provider to delete the event :
        const deletedEvent: typeof Events.$inferSelect | null = await eventService.deleteEvent(parseInt(eventId));
        if (!deletedEvent) {
            return c.json({
                message: 'Error deleting event',
                status: 'error',
                data: null
            });
        }
        // time to return the data :
        return c.json({
            message: 'Event deleted successfully',
            data: deletedEvent,
            status: 'success'
        });
    } catch (error) {
        return c.json({
            message: 'Error deleting event',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
};
export async function getEventById(c: Context) {
    try {
        // exyrat the event id from the req parameters : 
        const eventId = c.req.param('id');
        // call the service provider to get the event by ID :
        const event: typeof Events.$inferSelect | null = await eventService.getEventById(parseInt(eventId));
        // time to return the data :
        if (!event) {
            return c.json({
                message: 'Event not found',
                status: 'error',
                data: null
            });
        }
        return c.json({
            message: 'Event fetched successfully',
            data: event,
            status: 'success'
        });
    } catch (error) {
        return c.json({
            message: 'Error fetching event by ID',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
};

// to compleate later : 
export async function registerForEvent(c: Context) { };
export async function getRegistrations(c: Context) { };
export async function cancelRegistration(c: Context) { };
export async function getEventTickets(c: Context) { };



