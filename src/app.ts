import fastify from "fastify";

import { userRoutes } from "./http/controllers/users/routes";

export const app  = fastify()

app.get('/hello', (request, reply) => {
    return { message: 'Hello World'}
})
app.register(userRoutes)