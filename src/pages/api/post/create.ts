import dbConnect from '@/util/mongodb'
import { IPost } from '@/interfaces/post'
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect'
import {Post} from '@/models/post';


   dbConnect()
export default nextConnect()
.post(async(req:NextApiRequest,res:NextApiResponse)=>{
    if (!req.body) {
        const result  = {error : 'Invalid Argument'}
        return res.json(result)
    }
    const post :IPost= new Post({
        title: req.body.title,
        description : req.body.description,
        creator : req.body.user
    })
    await post.save()
    return res.json({post})
})