import GoogleAuth from "@/components/GoogleAuth"
import Layout from "@/components/Layout"
import { AppDispatch } from "@/redux"
import { GoogleLogIn, signin } from "@/redux/actions/auth_action"
import { RootState } from "@/redux/reducers/rootReducer"
import { useRouter } from "next/dist/client/router"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  // STATES
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  // HELPERS
  const router = useRouter()
  const userState = useSelector((state: RootState) => state.auth)
  const dispatch: AppDispatch = useDispatch()

  // FUNCTIONS
  const onSubmitx = (e) => {
    e.preventDefault()
    if (!username || !password) return setError("PLEASE FILL THE FIELDS")

    return dispatch(signin({ username, password }, router))
  }



  // ----------------------------------------HTML----------------------------------------------
  return (
    !userState?.user && (
      <Layout>
        <div className="flex items-center justify-center flex-col ">
          <h2 className="text-3xl text-gray-500 my-3 ">LOGIN</h2>
          <form
            onSubmit={onSubmitx}
            className="mt-3 flex flex-col justify-center items-center p-3"
          >
            {error && <div className="text-red-400 well-small">{error}.</div>}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="my-3 p-1 bg-red-100"
              placeholder="username"
              name="username"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="my-3 p-1 bg-red-100"
              placeholder="password"
              name="password"
            />
            <button
              type="submit"
              className="btn-block text-red-500 font-bold bg-blue-200 p-2 rounded-xl"
            >
              LOGIN
            </button>
          </form>
          <GoogleAuth />
        </div>
      </Layout>
    )
  )
}
export default login
