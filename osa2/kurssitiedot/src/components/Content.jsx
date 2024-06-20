import { Part } from "./Part"

export const Content = ({ course }) => {
    const parts = course.parts
    return (
      <div>
        {parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </div>
    )
  }