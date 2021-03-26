import { IPost } from "@/interfaces/post"
import mongoose, { Schema } from "mongoose"

const post: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  creator : {
    type: Schema.Types.ObjectId, ref: 'User'
  }
  
},{
    timestamps:true
})

export  const Post = mongoose?.models?.Post|| mongoose.model<IPost>('Post',post)