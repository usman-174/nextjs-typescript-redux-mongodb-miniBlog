import dbConnect from '@/util/mongodb'
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect'
import {Post} from '@/models/post';
import { IPost } from '@/interfaces/post';


   dbConnect()
export default nextConnect()
.put(async(req:NextApiRequest,res:NextApiResponse)=>{
    if (!req.body) {
        const result  = {error : 'Invalid Argument'}
        return res.json(result)
    }
    const {id} = req.query 
   let post :IPost= await Post.findById(id) 
   post.title = req.body.title
   post.description = req.body.description
  await post.save()
  const posts = await Post.find({})
    return res.json({posts})
    
})