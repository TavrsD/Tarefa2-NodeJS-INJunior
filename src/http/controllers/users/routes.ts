import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./get-all";

export function userRoutes (app: FastifyInstance) {
    app.post('/users', register)
    app.get('/users', getAll)
}