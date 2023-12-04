import { BaseError } from "./BaseError";

export class NotfoundError extends BaseError{
constructor(
message:string = 'Recurso não encontrado'
){
super(404,message)
}
}