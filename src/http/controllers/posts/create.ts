
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { CreatePostUseCase } from "@/use-cases/create-post-use-case"
import { UserNotFound } from "@/use-cases/errors/user-not-found-error"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        title: z.string(),
        content: z.string(),
        userId: z.string().uuid()
    })

    const {title, content, userId} = createBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository)
        
        await createPostUseCase.execute({
            title,
            content,
            userId
        })
    } catch (err) {
        if (err instanceof UserNotFound) {
            return reply.status(401).send({message: err.message})
        }
        throw err
    }
    return reply.status(201).send('Post created successfully')
}
