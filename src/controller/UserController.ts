import { Request, Response } from "express";
import { UsersDatabase } from "../database/UsersDatabase";
import { User } from "../models/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../error/BaseError";
import { GetUsersSchema } from "../dtos/user/getUsers.dto";
import { ZodError } from "zod";
import { SignupSchema } from "../dtos/user/signup.dto";
import { LoginSchema } from "../dtos/user/login.dto";

export class UserController {

  constructor(
    private userBusiness:UserBusiness
    ){}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const input = GetUsersSchema.parse({
        q:req.query.q
      })
     
      const response = await this.userBusiness.getUsers(input)

      res.status(200).send(response);

    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
      }
    }
  public login = async(req:Request, res:Response) =>{
    try{
const input = LoginSchema.parse({
  email:req.body.email,
  password:req.body.password
})

const response = await this.userBusiness.login(input)
res.status(200).send(response)
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

  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse( {
       
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role:"",
        createdAt: ""

      })

      const response = await this.userBusiness.signup(input)
      res.status(201).send(response)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }


  }
}