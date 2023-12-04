import { PostDatabase } from "../database/PostDatabase"
import { UsersDatabase } from "../database/UsersDatabase"
import { createPostInputDto } from "../dtos/post/createPost.dto"
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto"
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto"
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dot"
import { LikeDislikeInputDTO, LikeDislikeOutputDTO } from "../dtos/post/likeDislike.dto"
import { BadRequestError } from "../error/BadRequestError"
import { NotfoundError } from "../error/NotFoundError"
import { Creator, Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDB } from "../types"

export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
        private idGenerator:IdGenerator,
        private tokenManager: TokenManager
      ) {}
    
    public creatPost = async (input:createPostInputDto)=>{
     
        const {content, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(payload===null){
            throw new BadRequestError("token inválido")
        }

        const id = this.idGenerator.generator()
        const newPost = new Post(id,payload.id,content,0,0,new Date().toISOString(),'')

        const newPostDB : PostDB ={
           id:newPost.getId(),
           creator_id:newPost.getCreatorId(),
           content:newPost.getContent(),
           likes:newPost.getLikes(),
           dislikes:newPost.getDislikes(),
           created_at:newPost.getCreatedAt(),
           updated_at:newPost.getUpdateAt()
        }

        // const postDatabase= new PostDatabase()
        this.postDatabase.addPost(newPostDB)

        const response = {
            message: "Cadastro realizado com sucesso",
            user: newPost
        }

        return response
    }
    public getPost = async (input:GetPostInputDTO):Promise<GetPostOutputDTO>=>{
        const {q, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(payload===null){
            throw new BadRequestError("token inválido")
        }
        console.log(q)
        const  postsDb = await this.postDatabase.getPosts(q)
        console.log(postsDb)
        const posts = postsDb.map((postDB:any )=>{
            
            const post = new Post(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
              )
              
        
              return post.toBusinessModel(postDB.creator_id,postDB.name)
        })

       

        const output: GetPostOutputDTO = posts

        return output
    }

    public editPost = async(input:EditPostInputDTO):Promise<EditPostOutputDTO>=>{
        const {id,content,dateUpdate, token}=input
        const payload= this.tokenManager.getPayload(token)
        
        if(payload===null){
            throw new BadRequestError("token inválido")
        }
        // const postUpdate = await this.postDatabase.findPostById(id)
      
        input.dateUpdate = new Date().toISOString()
        
        await this.postDatabase.editPost(input)

        const response = {
            message: "Post Editado com sucesso",
         
        }

        return response

    }

    public deletePost = async(input:DeletePostInputDTO):Promise<DeletePostOutputDTO>=>{
        const {id,token}=input
        const payload = this.tokenManager.getPayload(token)
        if(payload===null){
            throw new BadRequestError('token inválido')
        }
        const postDelete =  await this.postDatabase.findPostById(id)
           
        if(!postDelete){
            throw new NotfoundError('Id não encontrado')
        }else{
            await this.postDatabase.deletePost(input)
        }

        const response = {
            message:"Post Deletado com sucesso"
        }
        return response
    }

    public likeDislike = async(input:LikeDislikeInputDTO):Promise<LikeDislikeOutputDTO>=>{
        const {id,like,token}=input
        const payload= this.tokenManager.getPayload(token)
        if(payload===null){
            throw new BadRequestError('token inválido')
        }
        const postDB = await this.postDatabase.findPostById(id)
      console.log(input,'business')
      console.log(postDB)
        if (!postDB) {
            throw new NotfoundError("'id' não encontrado")
          }

          await this.postDatabase.likeDislike(postDB,like)

        //   const post = new Post(
        //     postDB.id,
        //     postDB.creator_id,
        //     postDB.content,
        //     postDB.likes,
        //     postDB.dislikes,
        //     postDB.created_at,
        //     postDB.updated_at
        //   )

      
        const response = {
            message: "ok",
         
         }

        return response

    }
}