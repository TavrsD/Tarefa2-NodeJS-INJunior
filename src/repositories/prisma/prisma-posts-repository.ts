import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PostsRepository } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository{

    async create(data: Prisma.PostUncheckedCreateInput){
        const dateTime = new Date()
       
        const post = await prisma.post.create({
            data: {
                ...data,
                created_at: dateTime
            }
        })
            return post
    }   
}