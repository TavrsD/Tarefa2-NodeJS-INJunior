import { PostsRepository } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"

interface DeletePostUseCaseRequest {
    id: string
    userId: string
}

interface DeletePostUseCaseResponse {
    post: Post
}

export class DeletePostUseCase {

    constructor(private postsRepository: PostsRepository) {}

    async execute({ id }:DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
       const post = await this.postsRepository.delete(id)
        
       if (!post) {
            throw new ResourceNotFound
       }
       return { post }
    }
}