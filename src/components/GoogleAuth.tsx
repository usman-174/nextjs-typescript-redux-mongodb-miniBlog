import { AppDispatch } from "@/redux"
import { useRouter } from "next/dist/client/router"
import { GoogleLogIn } from "@/redux/actions/auth_action"
import React, { useState } from "react"
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login"
import { useDispatch } from "react-redux"
interface GoogleAuthProps {}

const GoogleAuth: React.FC<GoogleAuthProps> = ({}) => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const [user, setuser] = useState<GoogleLoginResponse>()

  const GoogleSuccess = async (
    res: GoogleLoginResponse & GoogleLoginResponseOffline
  ): Promise<any> => {
    setuser(res)
    dispatch(
      GoogleLogIn(
        {
          id: res.profileObj.googleId,
          email: res.profileObj.email,
          username: res.profileObj.name,
        },
        router
      )
    )
  }

  const GoogleFailure = (e: any) => {
    console.log("e:", e)
  }

  return (
    <>
      <GoogleLogin
        clientId={
          process.env.GOOGLE_ID 
		
        }
        render={(renderProp): any => {
          return (
            <button
              onClick={renderProp.onClick}
              className="my-3 p-2 rounded-md text-white bg-red-500"
            >
              G+    LOGIN WITH GOOGLE
            </button>
          )
        }}
        onSuccess={GoogleSuccess as any}
        onFailure={GoogleFailure}
        cookiePolicy="single_host_origin"
      />
    </>
  )
}
export default GoogleAuth
