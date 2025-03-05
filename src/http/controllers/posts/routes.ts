import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./get-all";
import { deletePost } from "./delete";

export function postRoutes (app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts', getAll)
    
    app.delete ('/posts/:id', deletePost)
    
}