import { FastifyInstance } from "fastify";
import { create } from "./create";

export function postRoutes (app: FastifyInstance) {
    app.post('/posts', create)
}