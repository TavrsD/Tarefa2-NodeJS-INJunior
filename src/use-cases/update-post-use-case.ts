import { PostsRepository, PostUpdateInput } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"

interface UpdatePostUseCaseRequest {
    id: string
    data: PostUpdateInput
}

interface UpdatePostUseCaseResponse {
    post: Post
}

export class UpdatePostUseCase {

    constructor(private PostsRepository: PostsRepository) {}

    async execute({ id, data }:UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
       const post = await this.PostsRepository.findById(id)
       if (!post) {
            throw new ResourceNotFound
       }


       const postUpdated = await this.PostsRepository.update(id, data)
       if (!postUpdated) {
            throw new ResourceNotFound()
       }

       return { post:postUpdated }
    }
}