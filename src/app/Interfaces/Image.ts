import { User } from "./User";

export interface Image{
    id : number,
    imageUrl : string,
    title : string,
    tags: string,
    price: Number,
    status : string
    user : User
}