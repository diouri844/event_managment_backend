import { Hono } from "hono";
import { listUsers, loginUser, ping, registerUser } from "../services/user.service";


const userController = new Hono()

// test the user end point :
userController.get('/ping', ping);
// fetch users by pagination authentocation required :
userController.get('/', listUsers);
// login user :
userController.post('/login', loginUser);
// register user :
userController.post('/register', registerUser);

export default userController;