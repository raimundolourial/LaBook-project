import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { IdGenerator } from '../services/IdGenerator'
import { UsersDatabase } from '../database/UsersDatabase'
import { TokenManager } from '../services/TokenManager'
import { HashManager } from '../services/HashManager'


export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UsersDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
        ))

userRouter.get("/", userController.getUsers)
userRouter.post("/", userController.signup)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)