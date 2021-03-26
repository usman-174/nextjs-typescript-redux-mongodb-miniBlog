import * as T from "@/redux/action_consts"
import axios from "axios"
import { NextRouter } from "next/dist/client/router"
import { useGoogleLogout } from "react-google-login"
export const signin = (formData, router: NextRouter) => async (
  dispatch: ({ type: string, payload: any }) => any
) => {
  try {
    const { data } = await axios.post("/api/auth/login", formData)
    if (data) {
      dispatch({ type: T.LOGIN_ACTION, payload: data.user })
      router.push("/")
    }
  } catch (error) {
    console.log(error)
  }
}
export const signup = (formData, router: NextRouter) => async (
  dispatch: ({ type: string, payload: any }) => any
) => {
  try {
    const { data } = await axios.post("/api/auth/register", formData)
    if (data?.user) {
      dispatch({ type: T.REGISTER_ACTION, payload: data.user })
      router.push("/")
    }
  } catch (error) {
    console.log(error)
  }
}
export const GoogleLogIn = (formData, router: NextRouter) => async (
  dispatch: ({ type: string, payload: any }) => any
) => {

  try {
    const { data } = await axios.post("/api/auth/googleLogin", formData)
    if (data?.user) {
      dispatch({ type: T.LOGIN_ACTION, payload: data.user })
      router.push("/")
    }
  } catch (error) {
    console.log(error)
  }
}
export const logout = (signout) => async (
  dispatch: ({ type: string }) => any
) => {
  try {
    const { data } = await axios.get("/api/auth/logout")
   
    if (data?.success) {
      dispatch({ type: T.LOGOUT_ACTION })
      localStorage.clear()
      signout()
      
    }
  } catch (error) {
    console.log(error)
  }
}
