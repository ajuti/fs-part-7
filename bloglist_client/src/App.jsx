import { useEffect } from "react"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import UserList from "./components/UserList"
import User from "./components/User"
import BlogPost from "./components/BlogPost"
import { initializeBlogs } from "./reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "./reducers/userReducer"
import { Route, Routes } from "react-router-dom"
import { setAllUsers } from "./reducers/allusersReducer"
import Navbar from "./components/Navbar"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setUser())
    dispatch(setAllUsers())
  }, [])

  return (
    <>
      {user && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={user ? <BlogList user={user} /> : <LoginForm />} />
        <Route path="/users" element={user ? <UserList /> : <LoginForm />} />
        <Route path="/users/:id" element={user ? <User /> : <LoginForm /> } />
        <Route path="/blogs/:id" element={user ? <BlogPost user={user} /> : <LoginForm />} /> 
      </Routes>
    </>
  )
}

export default App
