import Header from "./Header"
import { useMatch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { likeSingleBlog, deleteSingleBlog } from "../reducers/blogReducer"
import { useNavigate } from "react-router-dom"
import { addOneComment } from "../reducers/blogReducer"

const BlogPost = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useMatch("/blogs/:id").params.id
  const blogs = useSelector(state => state.blogs) 
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  const handleLike = async (blog) => {
    const blogToSend = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    dispatch(likeSingleBlog(blogToSend))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteSingleBlog(blog))
      navigate("/")
    } else {
      console.log("remove cancelled")
    }
  }

  const addComment = async(event) => {
    event.preventDefault()
    dispatch(addOneComment(event.target.comment.value, blog))
    event.target.comment.value = null
  }

  return (
    <>
      <Header />
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button><br/>
        added by {blog.user.name}<br/>
        {blog.user.username === user.username && <button onClick={() => handleDelete(blog)}>remove</button>}
      </div>
      <h4>comments</h4>
      <form onSubmit={addComment}>
        <input type="text" name="comment" />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => 
          <li>{comment}</li>   
        )}
      </ul>
    </>
  )
}

export default BlogPost