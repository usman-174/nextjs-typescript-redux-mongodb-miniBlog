import { combineReducers } from "@reduxjs/toolkit"
import auth_reducer from "./auth_reducer"
import post_reducer from "./post_reducer"

export const reducer = combineReducers({
  auth: auth_reducer,
  post: post_reducer,
})
export type RootState = ReturnType<typeof reducer>
