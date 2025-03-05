import { Prisma, Post } from "@prisma/client";

export interface PostsRepository {
    create(data:Prisma.PostUncheckedCreateInput): Promise<Post>
    findAll():Promise<Post[]>
    delete(id:string): Promise<Post | null>

}