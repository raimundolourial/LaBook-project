import z from 'zod'
import { PostModel } from '../../models/Post'

export interface GetPostInputDTO{
    q:string,
    token:string
}

export type GetPostOutputDTO = PostModel []

export const GetPostShema = z.object({
        q:z.string().optional(),
        token:z.string().min(1)
}).transform(data => data  as GetPostInputDTO)