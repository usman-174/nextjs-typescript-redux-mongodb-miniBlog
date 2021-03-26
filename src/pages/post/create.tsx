import Layout from "@/components/Layout"
import { RootState } from "@/redux/reducers/rootReducer"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "@/redux/actions/post_action"
import Link from "next/link"
const createPostx: React.FC<{}> = ({}) => {
  // STATES
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [error, setError] = useState<string>("")

  // HELPERS
  const userState = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()

  // FUNCTIONS
  const onSubmitx = async (e) => {
    e.preventDefault()
    if (!title || !description) {
      return setError("PLEASE FILL THE FIELDS")
    } else if (description.length <= 50) {
      return setError("Description length must be longer than 50 characters")
    }
    dispatch(createPost({ title, description, user: userState.user }, router))
  }
  useEffect(() => {
    if (!userState.user) {
      router.push("/")
    }
  }, [])
  return (
    userState.user && (
      <Layout>
        <div className="flex items-center  flex-col ">
          <h2 className="text-3xl text-blue-300 font-semibold my-10 ">
            Create Post
          </h2>
          <form
            onSubmit={onSubmitx}
            className="mt-3 w-auto flex flex-col  items-center p-3"
          >
            {error && <div className="text-red-400 well-small">{error}.</div>}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="my-3 w-64 p-1 bg-red-100 rounded-sm"
              placeholder="title"
              id="title"
              name="title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="my-3 p-1 w-72 h-52 bg-red-100 rounded-sm"
              placeholder="description"
              name="description"
            ></textarea>
            <div className="flex items-center mt-2">
              <button
                type="submit"
                className="mt-2 mx-4 p-2 text-red-600 rounded-md bg-blue-300 font-bold hover:bg-blue-400"
              >
                Create Post
              </button>
              <Link href="/">
                <button className=" mt-2 p-2 bg-red-400 rounded-md text-blue-400 font-bold hover:bg-red-500">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </Layout>
    )
  )
}
export default createPostx
