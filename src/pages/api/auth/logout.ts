import dbConnect from '@/util/mongodb'
import cookie from "cookie"
import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
dbConnect()
export default nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
   
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", '', {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600,
        expires: new Date(0),
        path: "/",
      })
    )
    res.json({ success: "LOGOUT SUCCESS" })
  }
)
