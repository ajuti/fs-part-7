import { useRef } from "react"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import Togglable from "./Togglable"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notiReducer"
import { createNewBlog } from "../reducers/blogReducer"
import Header from "./Header"

const BlogList = (props) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  const createBlog = async (title, author, url) => {
    const newBlog = { title, author, url }
    try {
      dispatch(createNewBlog(newBlog))
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          "notification",
          5,
        ),
      )
      blogFormRef.current.toggleVisibility()
      return true
    } catch (exception) {
      console.log("caught exception", exception)
      dispatch(setNotification(`${exception.response.data.error}`, "error", 5))
      return false
    }
  }

  return (
    <div>
      <Header />
      <Togglable show="new blog" hide="cancel" ref={blogFormRef}>
        <CreateBlog createBlog={createBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList
