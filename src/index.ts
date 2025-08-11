import { Hono } from 'hono'
import userRouter from './routers/user.router';
const app = new Hono()

app.route('/user', userRouter)
export default app
