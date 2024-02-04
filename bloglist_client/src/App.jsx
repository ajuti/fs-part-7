import { useEffect } from "react"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import { initializeBlogs } from "./reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(setUser())
  }, [])

  return (
    <>
      {!user && (
        <LoginForm />
      )}

      {user && (
        <BlogList user={user} />
      )}
    </>
  )
}

export default App
