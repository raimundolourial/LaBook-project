import z from 'zod'

export interface LikeDislikeInputDTO{
    id:string,
    like:boolean
    token:string
}

export interface LikeDislikeOutputDTO{
    message:string
}

export const LikeDislikeSchema = z.object({
    id:z.string(),
    like:z.boolean(),
    token:z.string()
}).transform(data=>data as LikeDislikeInputDTO)