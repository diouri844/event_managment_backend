import { Hono } from "hono";



const eventRouter = new Hono();

import { ping, listEvents, createEvent, updateEvent, deleteEvent, getEventById } from "../controllers/event.controller"

// add api endpoints to the event router

eventRouter.get('/ping', ping)
eventRouter.get('/list', listEvents)
eventRouter.post('/create', createEvent)
eventRouter.put('/update/:id', updateEvent)
eventRouter.delete('/delete/:id', deleteEvent)
eventRouter.get('/:id', getEventById);


export default eventRouter;