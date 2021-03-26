import { IUSER } from '@/interfaces/user'
import { Document } from "mongoose";

export interface IPost extends Document {
    title :string
    description:string
    creator : IUSER
    createdAt: Date|string
}