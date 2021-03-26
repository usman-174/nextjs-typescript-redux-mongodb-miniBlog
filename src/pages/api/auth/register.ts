import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
import cookie from "cookie"
import dbConnect from "@/util/mongodb"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
dbConnect()
export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
      const result = { error: "Invalid Argument" }
      return res.json(result)
    }
    const { username, password, email } = req.body

    const user = new User({
      username,
      password: await bcrypt.hash(password, 10),
      email,
    })

    await user.save()
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
    res.json({
      success: "Register SUCCESS",
      user: { ...user, password: undefined },
    })
  }
)
