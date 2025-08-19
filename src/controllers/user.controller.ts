

import { Context } from "hono"

import { Users } from "../Db/schema";
import UserServiceProvider from "../services/user.service";
import { CreateUserDto, UpdateUserDto, UserSelect } from "../types/user.type";


export function ping(c: Context) {
    return c.json({
        message: 'user service up and running!',
        timestamp: new Date().toISOString(),
        status: 'success',
    });
};

// setting up a service instance : 
const userService = new UserServiceProvider();

// fetch user list : 
export async function listUsers(c: Context) {
    try {
        const userList: any = [];
        // time to return same data : 
        return c.json({
            message: 'Users fetched successfully',
            data: userList,
            status: 'success'
        });
    } catch (error) {
        console.log("Controller:Error fetching user list:", error);
        return c.json({
            message: 'Error fetching user list',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
};


// fetch a use rbu given id : 
export async function getUserById(c: Context) {
    try {
        const userId = parseInt(c.req.param('id') as string);
        if (isNaN(userId)) {
            return c.json({
                message: 'Invalid user ID',
                status: 'error'
            }, 400);
        }
        const user = await userService.findUserById(userId);
        if (!user) {
            return c.json({
                message: 'User not found',
                status: 'error'
            }, 404);
        }
        return c.json({
            message: 'User fetched successfully',
            data: user,
            status: 'success'
        });
    } catch (error) {
        console.log("Controller:Error fetching user by ID:", error);
        return c.json({
            message: 'Error fetching user by ID',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
};


// fecth user information by given email : 
export async function getUserByEmail(c: Context) {
    try {
        const email = c.req.param('email');
        if (!email) {
            return c.json({
                message: 'Email is required',
                status: 'error'
            }, 400);
        }
        const user = await userService.fetchUserbyEmail(email);
        if (!user) {
            return c.json({
                message: 'User not found',
                status: 'error'
            }, 404);
        }
        return c.json({
            message: 'User fetched successfully',
            data: user,
            status: 'success'
        });
    } catch (error) {
        console.log("Controller:Error fetching user by Email:", error);
        return c.json({
            message: 'Error fetching user by Email',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
};


// create new user : 
export async function createUser(c: Context) {
    try {
        const userPayload: CreateUserDto = await c.req.json() as CreateUserDto;
        // call the service provider : 
        const createdUser: UserSelect | null = await userService.createUser(userPayload);
        // test returned data : 
        if (!createdUser) {
            return c.json({
                message: 'Error creating user',
                status: 'error',
                data: null
            });
        }
        // time to return the data :
        return c.json({
            message: 'User created successfully',
            data: createdUser,
            status: 'success'
        });
    } catch (error) {
        console.log("Controller:Error creating user:", error);
        return c.json({
            message: 'Error creating user',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
}


// update exesting user info : 
export async function updateUser(c: Context) {
    try {
        const userId = parseInt(c.req.param('id') as string);
        if (isNaN(userId)) {
            return c.json({
                message: 'Invalid user ID',
                status: 'error'
            }, 400);
        }
        const userPayload: UpdateUserDto = await c.req.json() as UpdateUserDto;
        // call the service provider : 
        const updatedUser: UserSelect | null = await userService.updateUserInfo(userId, userPayload);
        if (!updatedUser) {
            return c.json({
                message: 'Error updating user',
                status: 'error',
                data: null
            });
        }
        // time to return the data :
        return c.json({
            message: 'User updated successfully',
            data: updatedUser,
            status: 'success'
        });
    } catch (error) {
        console.log("Controller:Error updating user:", error);
        return c.json({
            message: 'Error updating user',
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 'error'
        });
    }
}