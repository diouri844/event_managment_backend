import { Hono } from 'hono'
import userRouter from './routers/user.router';
import eventRouter from './routers/event.router';
const app = new Hono()

app.route('/user', userRouter);
app.route('/event', eventRouter);
export default app
