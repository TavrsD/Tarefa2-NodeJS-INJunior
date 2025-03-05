import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error"
import { GetAllPostsUseCase } from "@/use-cases/get-all-posts-use-case"
import { FastifyRequest, FastifyReply } from "fastify"

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const getAllPostsUseCase = new GetAllPostsUseCase(prismaPostsRepository)
        
        const posts = await getAllPostsUseCase.execute()

        return reply.status(200).send({ posts })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}