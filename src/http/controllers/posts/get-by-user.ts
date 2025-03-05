import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error"
import { GetPostByUserUseCase } from "@/use-cases/get-posts-by-user-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function getByUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = getParamsSchema.parse(request.params)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const getPostByUserUseCase = new GetPostByUserUseCase(prismaPostsRepository)
        
        const posts = await getPostByUserUseCase.execute({
            userId
        })

        return reply.status(200).send({ posts })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}