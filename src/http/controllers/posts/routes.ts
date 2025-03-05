import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./get-all";
import { deletePost } from "./delete";
import { get } from "./get";
import { getByUser } from "./get-by-user";
import { update } from "./update";

export function postRoutes (app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts', getAll)
    app.get ('/posts/:id', get)
    app.get ('/user-posts/:userId', getByUser)
    
    app.delete ('/posts/:id', deletePost)
    
    app.patch('/posts/:id', update)
}