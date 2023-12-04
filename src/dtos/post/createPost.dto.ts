import z from 'zod'

export interface createPostInputDto {

    // id: string,
    // creatorId: string,
    content: string,
    // likes: number,
    // dislikes: number,
    // created_at: string,
    // updated_at: string,
    token:string

}

export interface createPostOutputDto {
    message: string,
    post: {
        // id: string,
        //creatorId: string,
        content: string,
        likes: number,
        dislikes: number,
        created_at: string,
        updated_at: string,
        
    }
}

export const createPostSchema = z.object({
    // id:z.string().min(1),
    //creatorId:z.string().min(1),
    content:z.string(),
    // likes:z.number(),
    // dislikes:z.number(),
    // created_at: z.string(),
    // updated_at: z.string(),
    token:z.string()


}).transform(data=> data as createPostInputDto)

