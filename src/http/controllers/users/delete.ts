import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { DeleteUserUseCase } from "@/use-cases/delete-user-use-case"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const deleteParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = deleteParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)
        const user = await deleteUserUseCase.execute({
            userId
        })

        return reply.status(204).send({ user })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}