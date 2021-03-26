import Layout from "@/components/Layout"
import { IPost } from "@/interfaces/post"
import { AppDispatch } from "@/redux"
import { getPost } from "@/redux/actions/post_action"
import { RootState } from "@/redux/reducers/rootReducer"
import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Posts from "@/components/Posts"
export default function Home() {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const postState = useSelector((state: RootState) => state.post)
  const userState = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    !postState.posts.length && dispatch(getPost(router))
  }, [])

  return (
    <Layout>
      {!postState.loading && !userState.loading && (
        <>
          {" "}
          <h1 className="text-blue-300 font-bold text-center my-10 uppercase mx-auto text-4xl">
            POSTS
          </h1>
          {postState.posts.length &&
            postState.posts.map((post: IPost) => (
              <div key={post._id} className="flex flex-col items-center p-2">
                <Posts
                  post={post}
                  user={userState.user ? userState.user : null}
                />
              </div>
            ))}
          {!postState.posts.length && <h2>No Posts</h2>}
        </>
      )}
    </Layout>
  )
}
