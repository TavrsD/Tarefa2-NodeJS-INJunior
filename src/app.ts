import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { userRoutes } from "./http/controllers/users/routes";
import { postRoutes } from "./http/controllers/posts/routes";

export const app  = fastify()

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

app.register(userRoutes)
app.register(postRoutes)
