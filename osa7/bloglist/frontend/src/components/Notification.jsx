import { useSelector } from 'react-redux'

export const Notification = () => {
    const notification = useSelector((state) => state.notification)

    const style = {
        color: 'green',
        backgroundColor: 'lightgray',
        fontSize: '20px',
        border: '2px solid green',
        margin: '5px',
        padding: '5px',
        width: 'fit-content',
    }

    if (notification.content === null) return null

    return (
        <div
            style={
                !notification.isError
                    ? style
                    : { ...style, color: 'red', border: '2px solid red' }
            }
        >
            {notification.content}
        </div>
    )
}

export default Notification
