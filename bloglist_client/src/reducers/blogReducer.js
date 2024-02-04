import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const initialState = []

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogsRdcr(state, action) {
      return action.payload
    },
    createBlogRdcr(state, action) {
      return state.concat(action.payload)
    },
    likeBlogRdcr(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      )
    },
    deleteBlogRdcr(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogsRdcr(blogs))
  }
}

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    const created = await blogService.create(newBlog)
    dispatch(createBlogRdcr(created))
  }
}

export const likeSingleBlog = (blog) => {
  return async (dispatch) => {
    const liked = await blogService.likeBlog(blog)
    dispatch(likeBlogRdcr(liked))
  }
}

export const deleteSingleBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(deleteBlogRdcr(blog.id))
  }
}

export default blogSlice.reducer
export const { setBlogsRdcr, createBlogRdcr, likeBlogRdcr, deleteBlogRdcr } =
  blogSlice.actions
