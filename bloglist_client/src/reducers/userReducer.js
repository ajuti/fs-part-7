import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import { setNotification } from "./notiReducer"

const initialState = null

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRdcr(state, action) {
      return action.payload
    },
    removeUserRdcr(state, action) {
      return null
    },
  },
})

export const setUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserRdcr(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.loginUser(username, password)
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      dispatch(setUserRdcr(user))
      dispatch(setNotification("Login successful", "notification", 5))
    } catch (exception) {
      console.log("Login failed: ", exception.response.data.error)
      dispatch(setNotification("Wrong username or password", "error", 5))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser")
    dispatch(removeUserRdcr())
  }
}

export default userSlice.reducer
export const { setUserRdcr, removeUserRdcr } = userSlice.actions
