// db/schema.ts
import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';


export enum Role {
    USER = 'user',
    ORGNAIZER = 'organizer',
    ATTENDEE = 'attendee',
}
export enum EventStatus {
    UPCOMING = 'upcoming',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}
export enum RegistrationStatus {
    WAITLISTED = 'waitlisted',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
}

export enum TicketType {
    GENERAL = 'general',
    VIP = 'vip',
    FREE = 'free',
    GROUP = 'group',
}

// user Table : 
export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    role: text('role').$type<Role>().default(Role.USER).notNull(),
    createdAt: text('created_at').default(new Date().toISOString()),
    updatedAt: text('updated_at').default(new Date().toISOString())
});

// Event table : 

export const Events = pgTable('events', {
    id: serial('id').primaryKey(),
    title: text('name').notNull(),
    description: text('description').notNull(),
    date: text('date').notNull(),
    location: text('location').notNull(),
    organizerId: serial('organizer_id')
        .references(() => Users.id)
        .notNull(),
    startTime: text('start_time').notNull(), // ISO 8601 format
    endTime: text('end_time').notNull(), // ISO 8601 format
    capacity: serial('capacity').notNull(),
    isRecurring: boolean('is_recurring').default(false),
    createdAt: text('created_at').default(new Date().toISOString()),
    updatedAt: text('updated_at').default(new Date().toISOString())
});

// user registratiotn to a event : 

export const EventRegistrations = pgTable('event_registrations', {
    id: serial('id').primaryKey(),
    userId: serial('user_id')
        .references(() => Users.id)
        .notNull(),
    eventId: serial('event_id')
        .references(() => Events.id)
        .notNull(),
    qrCode: text('qr_code'),
    status: text("status").$type<RegistrationStatus>().default(RegistrationStatus.WAITLISTED).notNull(),
    registrationDate: text('registration_date').default(new Date().toISOString()),
});


// ticket table : 
export const Tickets = pgTable('tickets', {
    id: serial('id').primaryKey(),
    eventId: serial('event_id')
        .references(() => Events.id)
        .notNull(),
    userId: serial('user_id')
        .references(() => Users.id)
        .notNull(),
    ticketType: text('ticket_type').$type<TicketType>().default(TicketType.GENERAL).notNull(), // e.g., 'general', 'VIP'
    currency: text('currency').notNull(), // e.g., 'USD', 'EUR'
    quantity: serial('quantity').notNull(), // Number of tickets purchased
    price: text('price').notNull(), // Store as string for currency
    purchaseDate: text('purchase_date').default(new Date().toISOString()),
});


