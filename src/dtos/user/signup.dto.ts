import z from 'zod'
import { USER_ROLES } from '../../services/TokenManager'

export interface SignupInputDTO{
    name:string,
    email:string,
    password:string,
    role: USER_ROLES,
    createdAt: string
}

export interface SignupOutputDTO{
    message: string,
    token: string
}

export const SignupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4),
    role:z.string().optional(),
    createdAt: z.string().optional(),

}).transform(data => data as SignupInputDTO)