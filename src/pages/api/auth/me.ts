import { User } from "@/models/User"
import dbConnect from "@/util/mongodb"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
dbConnect()
export default nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // await User.findByIdAndDelete('605b27af69cfad2a18156592')
      const token = req.cookies.token
      if (!token) return res.json({ isAuth: false })
      const { id }: any = jwt.verify(token, "SECRET")
      const exists = await User.findById(id).select("-password")
      if (!exists) return res.json({ isAuth: false })
      res.json({ isAuth: true, user: exists })
    } catch (error) {
      console.log(error)
    }
  }
)
