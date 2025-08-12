
// import the db instance 
import { CreateVentDto, IEvent, UpdateEventDto } from '../types/event.type';
import { db } from '../utils/instance.db';
import { Events } from '../Db/schema';
import { eq } from 'drizzle-orm';


export default class EventServiceProvider {
    async createEvent(eventData: CreateVentDto): Promise<typeof Events.$inferInsert | null> {
        try {
            const result = await db.insert(Events).values(eventData).returning();
            return result[0];
        } catch (error) {
            console.error('Service:Error creating event:', error);
            return null;
        }
    };
    async getEventById(eventId: number): Promise<typeof Events.$inferSelect | null> {
        try {
            const result = await db.select().from(Events)
                .where(eq(Events.id, eventId)).limit(1);
            return result[0];
        } catch (error) {
            console.error('Service:Error fetching event by id :', error);
            return null;
        }
    }
    async getAllEvents(paginationOption: any): Promise<typeof Events.$inferSelect[] | null> {
        try {
            const { limit, offset } = paginationOption;
            const result = await db.select().from(Events).limit(limit).offset(offset);
            return result;
        } catch (error) {
            console.error('Service:Error fetching event list  :', error);
            return null
        }
    }
    async updateEvent(
        eventId: number,
        updatedData: UpdateEventDto): Promise<
            typeof Events.$inferSelect | null
        > {
        try {
            const result = await db.update(Events).set(updatedData).where(eq(Events.id, eventId)).returning();
            return result[0];
        } catch (error) {
            console.error('Service:Error updating  event by id   :', error);
            return null
        }
    }
    async deleteEvent(eventId: number): Promise<typeof Events.$inferSelect | null> {
        try {
            const result = await db.delete(Events).where(eq(Events.id, eventId)).returning();
            return result[0];
        } catch (error) {
            console.error('Service:Error deleting  event by id   :', error);
            return null
        }
    }
};