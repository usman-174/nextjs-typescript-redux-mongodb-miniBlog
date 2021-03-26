import { IPost } from "@/interfaces/post"
import * as T from "../action_consts"

export interface STATE {
  posts: IPost[]
  loading: boolean
}

const initialState: STATE = {
  posts: [],
  loading: true,
}
const post_reducer = (state: STATE = initialState, action): STATE => {
  switch (action.type) {
    case T.GETPOST_ACTION:
      return {
        ...state,
        posts: action.payload,
      }
    case T.CREATEPOST_ACTION:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case T.UPDATE_POST_ACTION:
      return {
        ...state,
        posts: [action.payload],
      }
    case T.DELETEPOST_ACTION:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case T.STARTLOADING_ACTION:
      return {
        ...state,
        loading: action.payload,
      }
    case T.STOPLOADING_ACTION:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}
export default post_reducer
