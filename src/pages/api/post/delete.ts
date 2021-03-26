import dbConnect from '@/util/mongodb'
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect'
import {Post} from '@/models/post';


   dbConnect()
export default nextConnect().post(async(req:NextApiRequest,res:NextApiResponse)=>{
    const {id} = req.body

    const posts = await Post.findByIdAndRemove(id)
    if(!posts) return res.json({message: 'Process FAiled'})
        
    return res.status(200).json({success:true})
    
})
