import { Hono } from 'hono'
import homeController from "./controllers/index";
const app = new Hono()

app.get('/', homeController.home.ping)
app.get('/test', homeController.home.test)
export default app
