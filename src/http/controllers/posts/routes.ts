import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./get-all";
import { deletePost } from "./delete";
import { get } from "./get";
import { getByUser } from "./get-by-user";
import { update } from "./update";
import { verifyJWT } from "@/http/middleware/verify-jwt";

export function postRoutes (app: FastifyInstance) {
    app.post('/posts',{onRequest: [verifyJWT]}, create)

    app.get('/posts', getAll)
    app.get ('/posts/:id', get)
    app.get ('/user-posts/:userId', getByUser)
    
    app.delete ('/posts/:id',{onRequest: [verifyJWT]}, deletePost)
    
    app.patch('/posts/:id', update)
}