import { DeletePostInputDTO } from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { LikeDislikeInputDTO } from "../dtos/post/likeDislike.dto";
import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDataBase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POST: string = "posts";
    public static  TABLE_LIKES: string = "likes_dislikes"

    public async addPost(newPost: PostDB){
        await BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPost);
    } 

    public async getPosts(q:string|undefined):Promise<any>{

        if(q){
        //     const result: PostDB[] = await BaseDatabase
        // .connection(PostDatabase.TABLE_POST)
        // .where("id", "LIKE", `%${q}%`)

        const result = await BaseDatabase.connection(PostDatabase.TABLE_POST).select('users.id', 'users.name', 'posts.*').from('users') .innerJoin('posts', 'users.id', 'posts.creator_id')

      return result

    } else {
      const result =  await BaseDatabase.connection(PostDatabase.TABLE_POST).select('users.id', 'users.name', 'posts.*').from('users') .innerJoin('posts', 'users.id', 'posts.creator_id')
      return result
    }
        }

        public async findPostById(
          id: string
        ): Promise<PostDB | undefined> {
          const [postDB]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .where({ id })
      
          return postDB
        }

        public async editPost(input:EditPostInputDTO):Promise<void>{
          const {id, content, dateUpdate}=input
           await BaseDatabase.connection(PostDatabase.TABLE_POST).where('id',id).update({content:`${content}`})
        }

        public async deletePost(input:DeletePostInputDTO):Promise<void>{
          const {id}=input
          await BaseDatabase.connection(PostDatabase.TABLE_POST).where('id',id).del()
        }

        public async likeDislike(input:PostDB, like:boolean):Promise<void>{
          const {id,
            creator_id,
            content,
            likes, 
            dislikes,
            created_at, 
            updated_at}=input
            const likeDB = {
              user_id:creator_id,
             post_id: id,
              like: likes
            } 

            const [likesExist] = await BaseDatabase.connection(PostDatabase.TABLE_LIKES).where('user_id',creator_id)
            console.log(likesExist)
            if(!likesExist){
              if(like){
                likeDB.like=1
              await BaseDatabase.connection(PostDatabase.TABLE_LIKES).insert(likeDB);
              await BaseDatabase.connection(PostDatabase.TABLE_POST).where('id',id).update({likes:1,dislikes:0})
              }else{
                likeDB.like=0
                await BaseDatabase.connection(PostDatabase.TABLE_LIKES).insert(likeDB);
                await BaseDatabase.connection(PostDatabase.TABLE_POST).where('id',id).update({likes:0,dislikes:1})
              }
            }else{
            
          if(like){
                   if(!likes){
                    
                    await BaseDatabase.connection(PostDatabase.TABLE_LIKES).where('user_id',creator_id).update({like:1})
                    await BaseDatabase.connection(PostDatabase.TABLE_POST).where('id',id).update({likes:1,dislikes:0})
                   }else{
                    await BaseDatabase.connection(PostDatabase.TABLE_LIKES).where('user_id',creator_id).del()
                    await BaseDatabase.connection(PostDatabase.TABLE_POST).where('id',id).update({likes:0})
                   }
                  }else{
                    if(likes){
                      await BaseDatabase.connection(PostDatabase.TABLE_LIKES).where('user_id',creator_id).update({like:0})
                      await BaseDatabase.connection(PostDatabase.TABLE_POST).where('id',id).update({dislikes:1,likes:0})
                    }else{
                      await BaseDatabase.connection(PostDatabase.TABLE_LIKES).where('user_id',creator_id).del()
                      await BaseDatabase.connection(PostDatabase.TABLE_POST).where('id',id).update({dislikes:0})
                    }
           
          }
        }
        }

    }
