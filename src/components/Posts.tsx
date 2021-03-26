import { IPost } from "@/interfaces/post"
import React from "react"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import EditandDelete from "./EditandDelete"
import { IUSER } from "@/interfaces/user"
import { FaCalendarAlt } from "react-icons/fa"
dayjs.extend(relativeTime)

interface PostsProps {
  post: IPost
  user: IUSER | null
}

const Posts: React.FC<PostsProps> = ({ post, user }) => {

  return (
    post && (
      <div className="postCard  bg-blue-300 w-96  h-auto my-4 p-2 rounded-md ">
        <div className="flex justify-center items-center flex-col">
          <h1 className="postTitle my-2 text-green-600 font-bold text-4xl">
            {post.title}
          </h1>
          <p className="my-2 py-1 text-xl lead">{post.description}</p>
        </div>
        <div className="creator my-2 mx-auto text-xs uppercase text-gray-200 p-1 rounded-md">
          {post.creator.username}
        </div>
        <div>

        <p className="flex items-center created ml-1 uppercase">
         <FaCalendarAlt className='text-xs mx-1' /> Created {dayjs(post.createdAt).fromNow()}.
          {user && (
            <div className="ml-auto">
              {post.creator._id == user._id ||
              post.creator._id == user?.googleId ? (
                <EditandDelete id={post._id}/>
                ) : undefined}
            </div>
          )}
        </p>
          </div>
      </div>
    )
  )
}
export default Posts
