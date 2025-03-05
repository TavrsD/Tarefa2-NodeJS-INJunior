import { PostsRepository } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"

interface GetPostUseCaseRequest {
    id: string
}

interface GetPostUseCaseResponse {
    post: Post
}

export class GetPostUseCase {

    constructor(private postsRepository: PostsRepository) {}

    async execute({id}:GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
       const post = await this.postsRepository.findById(id)
        
       if (!post) {
            throw new ResourceNotFound
       }
       return { post }
    }
}