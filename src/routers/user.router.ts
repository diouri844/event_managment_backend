import { Hono } from "hono";
import { createUser, getUserByEmail, getUserById, listUsers, ping, updateUser } from "../controllers/user.controller";


const userRouter = new Hono()

// test the user end point :
userRouter.get('/test', ping);
// fetch users by pagination authentocation required :
userRouter.get('/list', listUsers);
// login user :
// register user :
userRouter.post('/register', createUser);
// update user information by given id : 
userRouter.put('/:id', updateUser);
// fetch user by id :
userRouter.get('/:id', getUserById);
// fetch user by email :
userRouter.get('/fetch/:email', getUserByEmail);


export default userRouter;