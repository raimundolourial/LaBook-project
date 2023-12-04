import { UsersDatabase } from "../database/UsersDatabase";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/user/getUsers.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../error/BadRequestError";
import { NotfoundError } from "../error/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload, USER_ROLES } from "../services/TokenManager";
import { UserDB } from "../types";

export class UserBusiness {
    constructor(
        private userDatabase: UsersDatabase,
        private idGenerator : IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
        
    ){}
    public getUsers = async(input:GetUsersInputDTO):Promise<GetUsersOutputDTO>=>{
       const {q}= input
        
       const usersDB = await this.userDatabase.findUsers(q);
  
        const users = usersDB.map(
          (userDB) => {const user = new User(
            userDB.id, 
            userDB.name, 
            userDB.email, 
            userDB.password, 
            userDB.role, 
            userDB.created_at)
        

        // console.log('users do business', users)

        return user.toBusinessModel()
    })

    const output: GetUsersOutputDTO = users
    return output
}


    public signup = async(input:SignupInputDTO):Promise<SignupOutputDTO>=>{
        const {name,email,password}=input;
        const id = this.idGenerator.generator()
        const hashedPassword = await this.hashManager.hash(password)


//falta implementar as vericações com o badrequest
        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
           USER_ROLES.NORMAL, 
            new Date().toISOString()
            );
 
        const newUserDB : UserDB ={
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
    
}

        await this.userDatabase.signup(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
    }

    // criação do token string a partir do payload
    const token = this.tokenManager.createToken(tokenPayload)

        const response:SignupOutputDTO = {
            message: "Cadastro realizado com sucesso",
           token:token
        }

        return response
    
    }

    public login = async (input:LoginInputDTO):Promise <LoginOutputDTO> =>{
        const {email,password} = input
        const userDB = await this.userDatabase.findUserByEmail(email)

        if(!userDB){
            throw new NotfoundError("'email' não encontrado")
        }

        const hashedPassword = userDB.password

		// o serviço hashManager analisa o password do body (plaintext) e o hash
		const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)
console.log(isPasswordCorrect)
		// validamos o resultado
		if (!isPasswordCorrect) {
      throw new BadRequestError("'email' ou 'password' incorretos")
    }


       const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      )
  
      // modelagem do payload do token
      const tokenPayload: TokenPayload = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole()
      }
  
      // criação do token
      const token = this.tokenManager.createToken(tokenPayload)
  
      const output: LoginOutputDTO = {
        message: "Login realizado com sucesso",
        token: token
      }
  
     return output
    }
}