import { Request, Response } from "express";
import { Post } from "../models/Post";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../error/BaseError";
import { createPostSchema } from "../dtos/post/createPost.dto";
import { ZodError } from "zod";
import { GetPostShema } from "../dtos/post/getPost.dot";
import { EditPostSchema } from "../dtos/post/editPost.dto";
import { DeletePostSchema } from "../dtos/post/deletePost.dto";
import { LikeDislikeSchema } from "../dtos/post/likeDislike.dto";


export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ){}

    public creatPost = async (req: Request, res: Response) => {
        try {

            const input = createPostSchema.parse({
                // id: req.body.id,
                //creatorId: req.body.creatorId,
                content: req.body.content,
                // likes: req.body.likes,
                // dislikes: req.body.dislikes,
                // created_at: req.body.createdAt,
                // updated_at: req.body.updatedAt,
                token:req.headers.authorization
            })

            console.log('Controler', input)

           
            const response = await this.postBusiness.creatPost(input)
            // const response = await postBusiness.creatPost(input)
            res.status(201).send(response)
        }
        catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getPosts = async(req:Request, res: Response)=>{
        try{

           const input= GetPostShema.parse({
            q:req.query.q,
            token: req.headers.authorization
           })

           console.log(req.headers.authorization)

           
           
           const response = await this.postBusiness.getPost(input)

           res.status(200).send(response)

        }catch(error){
            console.log('Erro do catch', error)

            if (error instanceof ZodError) {
              res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
              res.status(error.statusCode).send(error.message)
            } else {
            res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req:Request, res:Response) => {
        try{
            const input = EditPostSchema.parse({
                id: req.query.id,
                content:req.body.content,
                dateUpdate: new Date().toISOString(),
                token: req.headers.authorization
            })

            console.log('controler',req.headers.authorization)
            const response = await this.postBusiness.editPost(input)
            res.status(201).send(response)

        }catch(error){
console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
              res.status(500).send("Erro inesperado")
              }
        }

    }

    public likeDislikePost = async (req:Request, res:Response) => {
        try{
            const input = LikeDislikeSchema.parse({
                id: req.query.id,
                like: req.body.like,
                token: req.headers.authorization
            })
             console.log(input)
            const response = await this.postBusiness.likeDislike(input)
            res.status(201).send(response)

        }catch(error){
console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
              res.status(500).send("Erro inesperado")
              }
        }

    }

    public deletePost = async (req:Request, res:Response) => {
        try{
            const input = DeletePostSchema.parse({
                id: req.query.id,
                token:req.headers.authorization
               
            })

           

            const response = await this.postBusiness.deletePost(input)
            res.status(201).send(response)

        }catch(error){

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
              res.status(500).send("Erro inesperado")
              }
        }

    }
}
