import { useSelector } from 'react-redux'

export const Notification = () => {
    const notification = useSelector((state) => state.notification)

    const style = {
        color: 'lightgreen',
        fontSize: '20px',
        margin: '5px',
        padding: '5px',
        borderRadius: 5,
    }

    if (notification.content === null) return null

    return (
        <div
            style={
                !notification.isError
                    ? style
                    : {
                          ...style,
                          color: 'red',
                          textDecoration: 'underline solid red',
                      }
            }
        >
            {notification.content}
        </div>
    )
}

export default Notification
