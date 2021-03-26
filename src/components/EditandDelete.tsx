import { removePost } from "@/redux/actions/post_action"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { useDispatch } from "react-redux"
interface EditandDeleteProps {
  id: string
}

const EditandDelete: React.FC<EditandDeleteProps> = ({ id }) => {
  const router= useRouter()
  const dispatch = useDispatch()
  const deletePost = () => {
    dispatch(removePost(id))
  }
  const editPost = ()=>{
    router.push(`/post/edit/${id}`)
  }
  return (
    <div className=" flex items-center justify-between">
      <FaEdit onClick={editPost} className="ICONS text-2xl cursor-pointer mx-3 " />
      <FaTrashAlt
        onClick={deletePost}
        className="ICONS text-2xl cursor-pointer mx-2 "
      />
    </div>
  )
}
export default EditandDelete
