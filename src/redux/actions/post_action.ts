import { IPost } from "./../../interfaces/post"
import { IUSER } from "@/interfaces/user"
import * as T from "@/redux/action_consts"
import axios from "axios"
import { NextRouter } from "next/dist/client/router"

export const createPost = (
  formData: { title: string; description: string; user: IUSER },
  router: NextRouter
) => async (
  dispatch: ({ type, payload }: { type: string; payload: IPost }) => any
) => {
  console.log("formData = ", formData)
  try {
    const { data } = await axios.post("/api/post/create", {
      ...formData,
    })

    if (data?.post) {
      dispatch({ type: T.CREATEPOST_ACTION, payload: data.post })
      router.push("/")
    }
  } catch (error) {
    console.error(error.message)
  }
}
export const getPost = (_: NextRouter) => async (
  dispatch: ({
    type,
    payload,
  }: {
    type: string
    payload: IPost[] | boolean
  }) => any
) => {
  dispatch({ type: T.STARTLOADING_ACTION, payload: true })
  try {
    const { data } = await axios.get("/api/post/get")
    console.log(data.posts)

    dispatch({ type: T.GETPOST_ACTION, payload: data.posts })
    dispatch({ type: T.STARTLOADING_ACTION, payload: false })
  } catch (error) {
    console.error(error.message)
    dispatch({ type: T.STARTLOADING_ACTION, payload: false })
  }
}

export const removePost = (postId: string) => async (
  dispatch: ({
    type,
    payload,
  }: {
    type: string
    payload: string | boolean
  }) => any
) => {
  try {
    const { data } = await axios.post("/api/post/delete", {
      id: postId,
    })
    console.log(data.success)
    if (data?.success) {
      dispatch({ type: T.DELETEPOST_ACTION, payload: postId })
    }
    dispatch({ type: T.STARTLOADING_ACTION, payload: false })
  } catch (error) {
    console.error(error.message)
  }
}
export const updatePost = (
  router: NextRouter,
  formData: { id: string; title: string; description: string }
) => async (
  dispatch: ({
    type,
    payload,
  }: {
    type: string
    payload: string | boolean
  }) => any
) => {
  try {
    const { data } = await axios.put(`/api/post/update/${formData.id}`, {
      title: formData.title,
      description: formData.description,
    })

    if (data?.posts) {
      dispatch({ type: T.UPDATE_POST_ACTION, payload: data.posts })
      router.push("/")
    }
  } catch (error) {
    console.error(error.message)
  }
}
