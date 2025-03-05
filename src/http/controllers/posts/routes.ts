import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./get-all";
import { deletePost } from "./delete";
import { get } from "./get";

export function postRoutes (app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts', getAll)
    app.get ('/posts/:id', get)
    
    app.delete ('/posts/:id', deletePost)
    
}