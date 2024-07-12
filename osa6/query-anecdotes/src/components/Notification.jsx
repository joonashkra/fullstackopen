import { useContext } from "react"
import AnecdoteContext from "../AnecdoteContext"
import { useEffect } from "react"

const Notification = () => {

  const [notification, notificationDispatch] = useContext(AnecdoteContext)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, notificationDispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification === null) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
