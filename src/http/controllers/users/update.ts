import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error"
import { UpdateUserUseCase } from "@/use-cases/update-user-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    try {

        const updateBodySchema = z.object({
            name: z.string().optional(),
            photo: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string().optional()
        })
    
        const { name, photo, email, password } = updateBodySchema.parse(request.body)
        const userId = request.user.sub


        const prismaUsersRepository = new PrismaUsersRepository()
        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)
       
        const { user } = await updateUserUseCase.execute({
            userId,
            data: {
                name,
                photo,
                email,
                password
            }
        })

        return reply.status(200).send({ 
            user: {
                ...user,
                password:undefined
            }
         })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}