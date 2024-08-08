
const Notification = ({ message }: { message: string }) => {

    if(!message) return null

  return (
    <p>{message}</p>
  )
}

export default Notification