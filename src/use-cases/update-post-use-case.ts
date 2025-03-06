import { PostsRepository, PostUpdateInput } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"
import { Unauthorized } from "./errors/unauthorized-error"

interface UpdatePostUseCaseRequest {
    id: string
    userId: string
    data: PostUpdateInput
}

interface UpdatePostUseCaseResponse {
    post: Post
}

export class UpdatePostUseCase {

    constructor(private PostsRepository: PostsRepository) {}

    async execute({ id, userId, data }:UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
       const post = await this.PostsRepository.findById(id)
       if (!post) {
            throw new ResourceNotFound
       }

        if (post.userId !== userId) {
            throw new Unauthorized()
       }

       const postUpdated = await this.PostsRepository.update(id, data)
       if (!postUpdated) {
            throw new ResourceNotFound()
       }

       return { post:postUpdated }
    }
}