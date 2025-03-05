import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { DeleteUserUseCase } from "@/use-cases/delete-user-use-case"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error"
import { FastifyRequest, FastifyReply } from "fastify"


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {    
        const userId = request.user.sub;   
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