import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./get-all";
import { deleteUser } from "./delete";

export function userRoutes (app: FastifyInstance) {
    app.post('/users', register)
    
    app.get('/users', getAll)

    app.delete ('/users/:userId', deleteUser)


}