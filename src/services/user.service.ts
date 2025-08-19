import { Role, Users } from "../Db/schema";
import { CreateUserDto, UpdateUserDto, UserSelect } from "../types/user.type";
import { db } from "../utils/instance.db";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';




export default class UserServiceProvider {
    async findUserById(userId: number): Promise<UserSelect | null> {
        try {
            const targetUser = await db
                .select({
                    id: Users.id,
                    name: Users.username, // add other fields you want to select
                    email: Users.email,
                    role: Users.role,
                })
                .from(Users)
                .where(eq(Users.id, userId))
                .limit(1);
            return targetUser[0];
        } catch (error) {
            console.log("Service:Error finding user by ID:", error);
            return null;
        }
    };

    async fetchUserbyEmail(email: string): Promise<UserSelect | null> {
        try {
            const targetUser = await db.select({
                id: Users.id,
                name: Users.username,
                email: Users.email,
                role: Users.role,
            }).from(Users).where(eq(Users.email, email)).limit(1);
            return targetUser[0];
        } catch (error) {
            console.log("Service:Error finding user by Email:", error);
            return null;
        }
    };

    private async checkUserNameUsed(username: string): Promise<boolean> {
        try {
            const userWithSameName = await db.select({ id: Users.id, username: Users.username })
                .from(Users).where(eq(Users.username, username)).limit(1);
            return userWithSameName.length > 0;
        } catch (error) {
            console.log("Service:Error checking username usage:", error);
            return false;
        }
    }

    async createUser(userPaylaod: CreateUserDto): Promise<UserSelect | null> {
        try {

            // cehck if user name already exists :
            const isUserNameUsed = await this.checkUserNameUsed(userPaylaod.username);
            if (isUserNameUsed) {
                console.log("Service:Username already exists:", userPaylaod.username);
                return null; // or throw an error
            }

            // Ensure the role is of the correct type
            const hasedPassword = await this.hashedPassword(userPaylaod.password);
            const userToInsert = {
                ...userPaylaod,
                password: hasedPassword,
                role: userPaylaod.role as Role // Replace 'any' with 'Role' if you have the Role type imported
            };
            const result = await db.insert(Users).values(userToInsert).returning({
                id: Users.id,
                name: Users.username,
                email: Users.email,
                role: Users.role,
            });
            return result[0];
        } catch (error) {
            console.log("Service:Error creating user:", error);
            return null;
        }
    }

    private async hashedPassword(password: string): Promise<string> {
        // 1. Generate a salt
        const saltRounds = 10; // Try an integer 10-12
        const salt = await bcrypt.genSalt(saltRounds);
        // 2. Hash the password using the salt
        const hashedPassword: string = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async updateUserInfo(userId: number, userPayload: UpdateUserDto): Promise<UserSelect | null> {
        try {
            // Ensure the role is of the correct type if present
            const payloadToUpdate = {
                ...userPayload,
                ...(userPayload.role !== undefined ? { role: userPayload.role as Role } : {})
            } as UpdateUserDto

            const result = await db.update(Users).set(payloadToUpdate).where(eq(Users.id, userId)).returning({
                id: Users.id,
                name: Users.username,
                email: Users.email,
                role: Users.role,
            });
            return result[0];
        } catch (error) {
            console.log("Service:Error updating user info:", error);
            return null;
        }
    };
};