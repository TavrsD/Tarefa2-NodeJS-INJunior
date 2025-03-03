import fastify from "fastify";

import { userRoutes } from "./http/controllers/users/routes";
import { postRoutes } from "./http/controllers/posts/routes";

export const app  = fastify()

app.register(userRoutes)
app.register(postRoutes)
