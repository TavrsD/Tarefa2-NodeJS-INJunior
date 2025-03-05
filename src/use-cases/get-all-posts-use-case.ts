import { PostsRepository } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found-error"

interface GetAllPostsUseCaseResponse {
    posts: Post []
}

export class GetAllPostsUseCase {

    constructor(private postsRepository: PostsRepository) {}

    async execute(): Promise<GetAllPostsUseCaseResponse> {
       const posts = await this.postsRepository.findAll()
        
       if (!posts) {
            throw new ResourceNotFound
       }
       return { posts }
    }
}