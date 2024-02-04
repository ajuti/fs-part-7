import { useRef } from "react"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import Notification from "./Notification"
import Togglable from "./Togglable"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notiReducer"
import { createNewBlog, likeSingleBlog, deleteSingleBlog } from "../reducers/blogReducer"
import { logoutUser } from "../reducers/userReducer"

const BlogList = ({ user, setUser }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    dispatch(setNotification("Logged out successfully", "notification", 5))
  }

  const handleLike = async (blog) => {
    const blogToSend = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    dispatch(likeSingleBlog(blogToSend))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteSingleBlog(blog)) 
    } else {
      console.log("remove cancelled")
    }
  }

  const createBlog = async (title, author, url) => {
    const newBlog = { title, author, url }
    try {
      dispatch(createNewBlog(newBlog))
      dispatch(setNotification(`a new blog ${created.title} by ${created.author} added`, "notification", 5))
      blogFormRef.current.toggleVisibility()
      return true
    } catch (exception) {
      console.log(exception.response)
      dispatch(setNotification(`${exception.response.data.error}`, "error", 5))
      return false
    } 
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification { ...notification } />
      <p>
        {user.name} logged in
        <input type="submit" value="logout" onClick={handleLogout} />
      </p>
      <Togglable show="new blog" hide="cancel" ref={blogFormRef}>
        <CreateBlog createBlog={createBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={handleDelete}
            handleLike={handleLike}
            user={user}
          />
        ))}
    </div>
  )
}

export default BlogList
