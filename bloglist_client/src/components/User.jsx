import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import Header from "./Header"
import { Link } from "react-router-dom"

const User = (props) => {
  const id = useMatch("/users/:id").params.id
  const allUsers = useSelector(state => state.allUsers)
  const blogs = useSelector(state => state.blogs)
  const user = allUsers.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {blogs.filter((blog) => blog.user.id === user.id).map((blog) => 
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li> 
        )}
      </ul>
    </>
  )
}

export default User