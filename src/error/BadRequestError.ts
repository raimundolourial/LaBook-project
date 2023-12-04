import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError{
    constructor(
        message:string = 'Requisição invalida'
    ){
        super(404,message)
    }
}