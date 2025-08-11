



export type IEvent = {
    id: number;
    title: string;
    description: string;
    date: string; // ISO 8601 format
    location: string;
    organizerId: number;
    startTime: string; // ISO 8601 format
    endTime: string; // ISO 8601 format
    capacity: number;
    isRecurring: boolean;
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
};

export type CreateVentDto = Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEventDto = Partial<CreateVentDto>;