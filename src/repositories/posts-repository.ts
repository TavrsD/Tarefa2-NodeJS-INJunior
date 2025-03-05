import { Prisma, Post } from "@prisma/client";

export interface PostUpdateInput {
    title?: string
    content?: string
}

export interface PostsRepository {
    create(data:Prisma.PostUncheckedCreateInput): Promise<Post>
    findAll():Promise<Post[]>
    delete(id:string): Promise<Post | null>
    findById(id:string): Promise<Post | null>
    findByUserId(userId:string): Promise<Post[]>
    update(id: string, data:PostUpdateInput): Promise<Post | null>
    
}