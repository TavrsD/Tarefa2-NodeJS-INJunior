import { PostsRepository } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"

interface GetPostByUserUseCaseRequest {
    userId: string
}

interface GetPostByUserUseCaseResponse {
    posts: Post[]
}

export class GetPostByUserUseCase {

    constructor(private postsRepository: PostsRepository) {}

    async execute({userId}:GetPostByUserUseCaseRequest): Promise<GetPostByUserUseCaseResponse> {
       const posts = await this.postsRepository.findByUserId(userId)
        
       if (!posts || posts.length === 0) {
            throw new ResourceNotFound
       }
       return { posts }
    }
}