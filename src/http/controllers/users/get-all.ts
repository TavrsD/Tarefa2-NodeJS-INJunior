import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error"
import { GetAllUsersUseCase } from "@/use-cases/get-all-users-use-case"
import { FastifyRequest, FastifyReply } from "fastify"

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository)
        
        const users = await getAllUsersUseCase.execute()

        return reply.status(200).send({ users })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}