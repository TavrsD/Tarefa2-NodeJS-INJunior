import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./get-all";
import { deleteUser } from "./delete";
import { get } from "./get";
import { update } from "./update";
import { authenticate } from "./authenticate";
import { verifyJWT } from "@/http/middleware/verify-jwt";
import { refresh } from "./refresh";

export function userRoutes (app: FastifyInstance) {
    app.post('/users', register)
    app.post('/authenticate', authenticate)
    
    app.get('/users', getAll)
    app.get ('/users/:userId', get)

    app.delete ('/users/:userId', deleteUser)

    app.patch('/profile',{onRequest: [verifyJWT]}, update)
    app.patch('/token/refresh', refresh)

}
