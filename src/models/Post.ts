import { PostDB } from "../types"
export interface Creator{
    
        id: string,
        name:string
    
}
export interface PostModel {
    id: string,
    content: string,
    likes:number,
    dislikes:number,
    createdAt: string,
    updatedAt: string,
    creator: Creator
   
  }

export class Post {

    constructor(
    private id: string,
    private creator_id:string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private created_at: string,
    private updated_at: string
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setlikes(value: number): void {
        this.likes = value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getCreatorId(): string {
        return this.creator_id
    }

    public setCreatorId(value: string): void {
        this.creator_id = value
    }

    public getCreatedAt(): string {
        return this.created_at
    }

    public setCreatedAt(value: string): void {
        this.created_at = value
    }

    public getUpdateAt(): string {
        return this.updated_at
    }

    public setUpdateAt(value: string): void {
        this.updated_at = value
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creator_id,
            content: this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at
           
        }
    }

    // para facilitar nossa vida, temos o método que gera um ProductModel
    public toBusinessModel(creatorId:string,creatorName:string): PostModel {
       const postCreator:Creator = {
        id :creatorId,
        name: creatorName
       }
        return {
            id: this.id,
            content: this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            createdAt: this.created_at,
            updatedAt: this.updated_at,
            creator:postCreator
                
            }
           
        }
    }
