import dbConnect from '@/util/mongodb'
import { IPost } from '@/interfaces/post'
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect'
import {Post} from '@/models/post';


   dbConnect()
export default nextConnect().get(async(req:NextApiRequest,res:NextApiResponse)=>{
    const posts = await Post.find({}).populate('creator')
    if(!posts) return res.json({message: 'No posts fround.'})
        
    return res.status(200).json({posts})
    
})
