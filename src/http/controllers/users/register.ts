
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error"
import { RegisterUseCase } from "@/use-cases/register-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        photo: z.string(),
        password: z.string()
    })

    const {name, email, photo, password} = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        
        await registerUseCase.execute({
            name,
            email,
            photo,
            password
        })
    } catch (err) {
        if (err instanceof UserAlreadyExists) {
            return reply.status(409).send({message: err.message})
        }
        throw err
    }
    return reply.status(201).send('User created successfully')
}