import { CoursePart } from "./App"
import Part from "./Part"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    courseParts.map((coursePart, index) => 
        <Part key={index} coursePart={coursePart} />
    )
  )
}

export default Content