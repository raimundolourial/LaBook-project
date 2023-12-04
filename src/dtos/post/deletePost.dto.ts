import z from 'zod'

export interface DeletePostInputDTO{
    id:string
    token:string
}

export interface DeletePostOutputDTO{
    message:string
}

export const DeletePostSchema = z.object({
    id:z.string(),
    token:z.string()

}).transform(data=> data as DeletePostInputDTO)
