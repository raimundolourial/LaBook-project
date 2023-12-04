import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDataBase";

export class UsersDatabase extends BaseDatabase {
    public static TABLE_USER: string = "users";

    public async getUsers(): Promise<UserDB[]> {
        ///Perguntar porque Q na tipagem de results não posso passar undefined tbm ;
        const results: UserDB[] = await BaseDatabase.connection(
          UsersDatabase.TABLE_USER
        );
          console.log(results);
        return results;
      }

      public async findUsers(
        q: string | undefined
      ): Promise<UserDB[]> {
        let usersDB
    
        if (q) {
          const result: UserDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USER)
            .where("name", "LIKE", `%${q}%`)
    
          usersDB = result
        } else {
          const result: UserDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USER)
    
          usersDB = result
        }
    
        return usersDB
      }

      public async findUserById(id: string) {
        const [ userDB ]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USER)
            .where({ id })

        return userDB
    }

    public async findUserByEmail(email: string) {
      const [ userDB ]: UserDB[] | undefined[] = await BaseDatabase
          .connection(UsersDatabase.TABLE_USER)
          .where({ email })

      return userDB
  }

      public async signup(newUserDB:UserDB){
        await BaseDatabase.connection(UsersDatabase.TABLE_USER).insert(newUserDB)
      }


}