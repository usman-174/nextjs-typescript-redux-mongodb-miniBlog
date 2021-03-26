import { Document } from "mongoose";

export interface IUSER extends Document {
    username :string
    email:string
    password:string | undefined
    origin : 'LOCAL'|'GOOGLE'|'FACEBOOK'
    googleId : string|undefined
}