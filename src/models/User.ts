import { IUSER } from "@/interfaces/user"
import mongoose, { Schema } from "mongoose"
const user: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      default: "LOCAL",
    },
    googleId: {
      type: String,
      default: null,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose?.models?.User || mongoose.model<IUSER>("User", user)
