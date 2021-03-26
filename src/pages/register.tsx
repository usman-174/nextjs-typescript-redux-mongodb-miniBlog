import Layout from "@/components/Layout"
import { signin, signup } from "@/redux/actions/auth_action"
import axios from "axios"
import { useRouter } from "next/dist/client/router"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  // STATES
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")

  // Helpers
  const router = useRouter()
  const dispatch = useDispatch()

  // FUNCTIONS
  const onSubmitx = async (e) => {
    setError("")
    e.preventDefault()
    if (!username || !password) {
      return setError("PLEASE FILL THE FIELDS")
    } else if (!email.includes("@")) {
      return setError("ENTER VALID EMAIL")
    }
    return dispatch(signup({ username, password ,email}, router))
  } 
  // -----------------------------------------HTML------------------------------------------------
  return (
    <Layout>
      <div className="flex items-center justify-center flex-col ">
        <h2 className="text-3xl text-gray-500 my-3 ">Register</h2>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="my-3 p-1 bg-red-100"
            placeholder="Email"
            name="email"
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
            Register
          </button>
        </form>
      </div>
    </Layout>
  )
}
export default login
