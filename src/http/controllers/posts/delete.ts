import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { DeletePostUseCase } from "@/use-cases/delete-post-use-case"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const deleteParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = deleteParamsSchema.parse(request.params)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const deletePostUseCase = new DeletePostUseCase(prismaPostsRepository)
        const post = await deletePostUseCase.execute({
            id
        })

        return reply.status(204).send({ post })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}