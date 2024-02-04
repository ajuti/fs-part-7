/* Import createSlice that 'slices' a part of a store to a select action/element */
import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: null, type: "notification" }

/* create a slice for notification's state 
*  Requires name, initial state, and reducers (functions that modify the state itself)
*/
const notiSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNoti(state, action) {
      return action.payload
    },
  }
})

/*
  Next we create a function that abstracts the state management altogether from components
  A function that returns a function that dispatches the wanted action.
  In this case fires actions to set notification text, and 'remove' it afterwards
  ! returned function expects the 'dispatch' from the caller
*/

export const setNotification = (text, type, seconds) => {
  return async(dispatch) => {
    dispatch(setNoti({ text, type }))
    setTimeout(() => {
      dispatch(setNoti(null))
    }, 5000)
  }
}

/**
 * Reducer is exported to be used in the configuration of the whole store
 * setNoti is exported in order for setNotification abstraction to use it
 */
export default notiSlice.reducer
export const { setNoti } = notiSlice.actions