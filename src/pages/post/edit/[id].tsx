import Layout from "@/components/Layout"
import { IPost } from "@/interfaces/post"
import { updatePost } from "@/redux/actions/post_action"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/dist/client/router"
import React, { useState } from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"

const EditPost: React.FC<{ post: IPost }> = ({ post }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [title, settitle] = useState<string>(post.title)
  const [description, setdescription] = useState<string>(post.description)
  const [error, seterror] = useState<string>("")
  const updatePostFn = () => {
    seterror("")
    if (description === post.description && title === post.title) {
      seterror("Title and Description must be different than before.")
    } else if (description === post.description) {
      seterror("Description must be different than before.")
    } else if (title === post.title) {
      seterror("Title must be different than before.")
    }
    dispatch(
      updatePost(router, { id: String(router.query.id), title, description })
    )
  }
  return (
    <>
      <Layout>
        <div className="mx-auto m-2">
          <h1 className="my-2 text-center text-blue-300 font-bold text-3xl">
            EDIT POST
          </h1>
          <div className="flex flex-col justify-center items-center my-2">
            <label className="label-primary mb-1">Title</label>
            <input
              className="my-1  w-64   p-1 bg-red-100 rounded-md"
              type="text"
              name="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <label className="label-primary mb-1">Description</label>
            <textarea
              className=" p-1 w-72 h-52 bg-red-100  rounded-md"
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            {error && <p className="text-red-400 my-2 p-1 text-md">{error}</p>}
    <div className="flex items-center">

            <button
              onClick={updatePostFn}
              className="mt-2 mx-4 p-2 text-red-600 rounded-md bg-blue-300 font-bold hover:bg-blue-400"
              >
              Update
            </button>
            <Link href="/">
              <button className="inline-block mt-2 p-2 bg-red-400 rounded-md text-blue-400 font-bold hover:bg-red-500">
                Cancel
              </button>
            </Link>
              </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default EditPost

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/post/${query?.id}`
    )

    return { props: { post: data.post } }
  } catch (err) {
    return { props: { error: "Something went wrong" } }
  }
}
