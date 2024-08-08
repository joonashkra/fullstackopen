
import { CoursePart } from './App'
import { assertNever } from './utils'

const Part = ({ coursePart }: { coursePart: CoursePart }) => {

    const renderData = (coursePart: CoursePart) => {
        switch (coursePart.kind) {
            case "basic":
                return <p style={{ fontStyle: "italic" }}>{coursePart.description}</p>
            case "group":
                return <p>{coursePart.groupProjectCount}</p>
            case "background":
                return <p>{coursePart.backgroundMaterial}</p>
            case "special":
                return <p>Requirements: {coursePart.requirements.join(", ")}</p>
            default:
                assertNever(coursePart);
        }
    }

    return (
        <div>
            <p style={{ fontWeight: "bold" }}>{coursePart.name} {coursePart.exerciseCount}</p>
            {renderData(coursePart)}
            <hr/>
        </div>
    )
    
}

export default Part