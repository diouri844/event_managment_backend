import { Users } from "../Db/schema";
import { UserSelect } from "../types/user.type";
import { db } from "../utils/instance.db";
import { eq } from "drizzle-orm";





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

};