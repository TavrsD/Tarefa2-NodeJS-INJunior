import { UsersRepository, UserUpdateInput } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"
import { compare, hash } from "bcryptjs"

interface UpdateUserUseCaseRequest {
    userId: string
    data: UserUpdateInput
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {

    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId, data }:UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
       const user = await this.usersRepository.findById(userId)
       if (!user) {
            throw new ResourceNotFound
       }

       if (data.password) {
            const isSamePasswort = await compare(data.password, user.password)
            if (isSamePasswort) {
                throw new Error('The password must be different from the current one')
            }   
        
            data.password = await hash(data.password, 6)

       }

       const userUpdated = await this.usersRepository.update(userId, data)
       if (!userUpdated) {
            throw new ResourceNotFound()
       }

       return { user:userUpdated }
    }
}