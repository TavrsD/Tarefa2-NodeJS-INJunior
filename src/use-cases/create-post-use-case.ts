import { PostsRepository } from "@/repositories/posts-repository"

interface CreatePostUseCaseRequest {
    title: string
    content: string
    userId: string
}

export class CreatePostUseCase {

    constructor(private postsRepository: PostsRepository) {}

    async execute({title, content, userId}:CreatePostUseCaseRequest) {
    
        const post = await this.postsRepository.create({
            title,
            content,
            userId,
            created_at: ""
        })
        return { post }
    }
}