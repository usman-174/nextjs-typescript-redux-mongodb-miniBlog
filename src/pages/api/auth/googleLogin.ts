import dbConnect from "@/util/mongodb"
import { hash, compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
import cookie from "cookie"
import { User } from "@/models/User"
dbConnect()
export default nextConnect().post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
      const result = { error: "Invalid Argument" }
      return res.json(result)
    }
    const { username, id, email } = req.body
    try {
      const user = await User.findOne({
        googleId: id,
        email,
        username,
        origin: "GOOGLE",
      }).select("-password")
      if (!user) {
        console.log("no User")

        const newUser = new User({
          googleId: id,
          username,
          email,
          password: await hash(username + "DWA@@" + email, 9),
          origin: "GOOGLE",
        })
        newUser.save()
        const token = jwt.sign({ id: newUser._id }, "SECRET")
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
        return res.json({
          success: "LOGIN SUCCESS",
          user: { ...newUser, password: undefined },
        })
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
      res.json({ success: "LOGIN SUCCESS", user })
    } catch (error) {
      console.log(error.message)
    }
  }
)
