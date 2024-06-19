const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

export const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  )
}

export const Total = (props) => {

  return (
    <p>Number of exercises {props.parts.reduce((prev, current) => prev + current.exercises, 0)}</p>
  )
}

export const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

export default App