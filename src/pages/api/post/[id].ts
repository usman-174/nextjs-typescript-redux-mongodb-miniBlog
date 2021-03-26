import dbConnect from '@/util/mongodb'
import { IPost } from '@/interfaces/post'
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect'
import {Post} from '@/models/post';


   dbConnect()
export default nextConnect().get(async(req:NextApiRequest,res:NextApiResponse)=>{
    const {id} = req.query
    const post = await Post.findById(id)
    if(!post) return res.json({message: 'Post not available'})
    
    return res.status(200).json({post})
    
})
