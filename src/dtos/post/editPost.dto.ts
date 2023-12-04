import z from 'zod'

export interface EditPostInputDTO {
    id: string
    content:string
    dateUpdate:string
    token:string
}

export interface EditPostOutputDTO {
    message:string,
   
}

    export const EditPostSchema = z.object({
        id:z.string(),
        content:z.string(),
        dateUpdate: z.string().optional(),
        token:z.string()
        
    
    
    }).transform(data=> data as EditPostInputDTO)
