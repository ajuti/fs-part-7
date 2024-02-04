import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../reducers/userReducer"
import { setNotification } from "../reducers/notiReducer"

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    dispatch(setNotification("Logged out successfully", "notification", 5))
  }

  return (
    <div className="navbar" style={{backgroundColor: "lightgray", padding: 5}}>
      <Link style={{paddingRight: 5}} to={"/"}>blogs</Link>
      <Link style={{paddingRight: 5}} to={"/users"}>users</Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navbar