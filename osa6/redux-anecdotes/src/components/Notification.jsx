import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
      const timeout = setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)

      return () => clearTimeout(timeout)
  }, [dispatch, notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notification === null) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification