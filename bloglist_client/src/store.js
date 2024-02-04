import { configureStore } from "@reduxjs/toolkit"
import notiReducer from "./reducers/notiReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import allusersReducer from "./reducers/allusersReducer"

/**
 * Store is configured by calling the function and passing an object with all of the
 * reducers as attributes
 */
const store = configureStore({
  reducer: {
    notification: notiReducer,
    blogs: blogReducer,
    user: userReducer,
    allUsers: allusersReducer,
  },
})

export default store
