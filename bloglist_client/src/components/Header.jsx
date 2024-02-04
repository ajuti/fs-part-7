import Notification from "./Notification"
import { useSelector } from "react-redux"

const Header = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <>
      <h2>blog app</h2>
      <Notification {...notification} />
    </>
  )
}

export default Header
