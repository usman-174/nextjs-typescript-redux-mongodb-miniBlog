import React, { useEffect } from "react"
import * as T from "@/redux/action_consts"

import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/index"
import checkUser from "@/util/checkUser"
import { logout } from "@/redux/actions/auth_action"
import { useRouter } from "next/dist/client/router"
import { useGoogleLogout } from "react-google-login"
import { FaAccusoft } from "react-icons/fa"

const Navbar: React.FC<{}> = ({}) => {
  const { signOut, loaded } = useGoogleLogout({
    clientId:
      "164228401461-ub9fadjuscjmibn88pg5rg2ppl621f96.apps.googleusercontent.com",
    onLogoutSuccess: () => {
      console.log("on google logout")
      router.push("/")
    },
    onFailure: () => console.log("FAiled"),
  })
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const userState = useSelector((state: RootState) => state.auth)

  const Logout = () => {
    if (userState) {
      dispatch(logout(signOut))
    }
  }

  useEffect(() => {
    const UserStatus = async () => {
      const data = await checkUser()

      if (data.isAuth && data.user) {
        dispatch({ type: T.LOGIN_ACTION, payload: data.user })
        dispatch({ type: T.STOP_AUTHLOADING_ACTION, payload: false })
      }
      dispatch({ type: T.STOP_AUTHLOADING_ACTION, payload: false })
    }
    UserStatus()
  }, [])

  return (
    !userState?.loading && (
      <>
        <div className="w-full flex items-center  bg-blue-300">
          <Link href="/">
            <h1 className="m-3  text-4xl cursor-pointer font-bold navBrand inline-flex items-center">
              <FaAccusoft className='mx-1 mt-2 text-4xl' />BLOGGY
             
            </h1>
          </Link>
          <ul className="inline-flex ml-auto navList">
            {!userState.user ? (
              <>
                <Link href="/login">
                  <li className="item mx-2 font-bold cursor-pointer uppercase    ">
                    Login
                  </li>
                </Link>
                <Link href="/register">
                  <li className="item mx-2 cursor-pointer uppercase  font-bold  ">
                    Register
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link href="/post/create">
                  <li className="item mx-2 cursor-pointer uppercase   font-bold  ">
                    Create Post
                  </li>
                </Link>
                <li
                  onClick={Logout}
                  className="item mx-2 cursor-pointer  font-bold   uppercase"
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </>
    )
  )
}
export default Navbar
