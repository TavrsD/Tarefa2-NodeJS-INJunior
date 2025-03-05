import { PostsRepository } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"
import { Unauthorized } from "./errors/unauthorized-error"

interface DeletePostUseCaseRequest {
    id: string
    userId: string
}

interface DeletePostUseCaseResponse {
    post: Post
}

export class DeletePostUseCase {

    constructor(private postsRepository: PostsRepository) {}

    async execute({ id, userId }:DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
       const post = await this.postsRepository.findById(id)

       if (!post) {
            throw new ResourceNotFound
       }

       if (post.userId !== userId) {
            throw new Unauthorized()
       }

       await this.postsRepository.delete(id)
       
       return { post }
    }
}