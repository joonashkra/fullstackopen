export const Total = ({ course }) => {
    const parts = course.parts
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p style={{fontWeight: "bold"}}>total of {total} exercises</p>
    )
  }