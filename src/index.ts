import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: 'Hello, World!',
    timestamp: new Date().toISOString(),
    status: 'success',
  })
})

export default app
