import { useSelector } from "react-redux"
import Header from "./Header"
import { Link } from "react-router-dom"

const UserList = (props) => {
  const allUsers = useSelector((state) => state.allUsers)

  return (
    <>
      <Header />
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList
