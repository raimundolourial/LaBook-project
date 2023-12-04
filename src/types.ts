import { USER_ROLES } from "./services/TokenManager";

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role:USER_ROLES,
    created_at: string
}




export interface PostDB {
    id: string,
    creator_id:string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}