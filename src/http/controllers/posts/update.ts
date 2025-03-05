import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error"
import { UpdatePostUseCase } from "@/use-cases/update-post-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.string().uuid()
    })

    const updateBodySchema = z.object({
        title: z.string().optional(),
        content: z.string().optional()
    })

    const { id } = updateParamsSchema.parse(request.params)
    const { title, content } = updateBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const updatePostUseCase = new UpdatePostUseCase(prismaPostsRepository)
        const post = await updatePostUseCase.execute({
            id,
            data: {
                title,
                content
            }
        })

        return reply.status(200).send({ post })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}