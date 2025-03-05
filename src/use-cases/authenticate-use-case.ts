import { UsersRepository } from "@/repositories/users-repository"
import { compare } from "bcryptjs"
import { User } from "@prisma/client"
import { InvalidCredentials } from "./errors/invalid-credentials-error"

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {

    constructor(private usersRepository: UsersRepository) {}

    async execute({email, password}:AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentials()
        }
        
        const doesPasswordMatches = await compare(password, user.password) 
        
        if (!doesPasswordMatches) {
            throw new InvalidCredentials()
        }
    
        return { user }
    }
}