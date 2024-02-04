import { useState } from "react"
import Notification from "./Notification"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../reducers/userReducer"

const LoginForm = () => {
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("Logging in with: ", username, password)
    dispatch(loginUser(username, password))
    if (user) {
      setUsername("")
      setPassword("")
    }
    console.log(user)
  }

  return (
    <>
      <h2>log in to application</h2>
      <Notification { ...notification } />
      <div>
        <form onSubmit={handleLogin}>
          username{" "}
          <input
            type="text"
            id="username"
            name="user"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          password{" "}
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          /><br/>
         <input type="submit" id="login" value="login" />
        </form>
      </div>
    </>
  )
}

export default LoginForm
