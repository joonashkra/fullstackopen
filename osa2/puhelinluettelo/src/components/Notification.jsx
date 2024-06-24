

export const Notification = ({ message }) => {

    let notificationStyles = {
        color: "green",
        backgroundColor: "lightgray",
        fontSize: "20px",
        border: "2px solid green",
        margin: "5px",
        padding: "5px",
        width: "fit-content"
    }

    if(message === null) return null

    if(message.startsWith("Error")) {
        notificationStyles = {...notificationStyles, color: "red", border: "2px solid red"}
    }

    return (
        <div style={notificationStyles}>
            {message}
        </div>
    )
}
