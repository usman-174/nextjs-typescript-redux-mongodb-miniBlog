import { IUSER } from "@/interfaces/user"
import * as T from "../action_consts"

export interface STATE {
  user: IUSER|null,
  loading:boolean
}
export interface ACTION {
  type: string
  payload: any
}
const initialState :STATE = {
  user : null,
  loading:true
}
const auth_reducer =  (
  state: STATE = initialState,
  action: ACTION
):STATE => {
  switch (action.type) {
    case T.LOGIN_ACTION:
      return {
        ...state,
        user: action.payload,
      }
    case T.REGISTER_ACTION:
      return {
        ...state,
        user: action.payload,
      }
    case T.LOGOUT_ACTION:
      return {
        ...state,
        user : null
      }
    case T.START_AUTHLOADING_ACTION:
      return {
        ...state,
        loading : action.payload
      }
    case T.STOP_AUTHLOADING_ACTION:
      return {
        ...state,
        loading :  action.payload
      }
    default:
      return state
  }
}
export default auth_reducer
