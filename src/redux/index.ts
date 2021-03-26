import { composeWithDevTools } from "redux-devtools-extension"
// import { configureStore } from "@reduxjs/toolkit"
import { reducer } from "./reducers/rootReducer"
import thunkMiddleware from "redux-thunk"
import { applyMiddleware } from "redux"
import { createStore } from "redux"

// export const store=  configureStore({
//   reducer,
//   devTools: true,
//   middleware:applyMiddleware(thunkMiddleware)

// })

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch