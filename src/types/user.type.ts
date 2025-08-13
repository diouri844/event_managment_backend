
export type UserSelect = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export type User = {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
};


export type CreateUserDto = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserDto = Partial<CreateUserDto>;