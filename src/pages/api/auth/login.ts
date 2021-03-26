import dbConnect from "@/util/mongodb"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
import cookie from "cookie"
import { User } from "@/models/User"
dbConnect()
export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log("helo")
    try {
      if (!req.body) {
        const result = { error: "Invalid Argument" }
        return res.json(result)
      }
      const { username, password } = req.body
console.log(req.body);

      const user = await User.findOne({ username})
      
      
      if (!user) {
        return res.json({ error: "User dont exist" })
      }
      const isMatch = await compare(password, user.password)
      if (!isMatch) {
        return res.json({ error: "Invalid credentials" })
      }

      const token = jwt.sign({ id: user._id }, "SECRET")
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      )
      return res.json({ success: "LOGIN SUCCESS", user:{...user,password:undefined} })
    } catch (error) {
      console.log(error)
    }
  }
)
