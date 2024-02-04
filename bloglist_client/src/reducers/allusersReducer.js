import { createSlice } from "@reduxjs/toolkit"
import usersService from "../services/users"

const initialState = []

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setAll(state, action) {
      return action.payload
    },
  },
})

export const setAllUsers = () => {
  return async (dispatch) => {
    const res = await usersService.getAll()
    dispatch(setAll(res))
  }
}

export default allUsersSlice.reducer
export const { setAll } = allUsersSlice.actions
