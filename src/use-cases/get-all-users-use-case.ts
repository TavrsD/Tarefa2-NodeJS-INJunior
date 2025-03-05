import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"

interface GetAllUsersUseCaseResponse {
    users: User []
}

export class GetAllUsersUseCase {

    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<GetAllUsersUseCaseResponse> {
       const users = await this.usersRepository.findAll()
        
       if (!users) {
            throw new ResourceNotFound
       }
       return { users }
    }
}