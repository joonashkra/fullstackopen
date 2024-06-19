import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleFeedback={() => setGood(good + 1)}/>
      <Button text="neutral" handleFeedback={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleFeedback={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = total !== 0 ? (1*good + 0*neutral + -1*bad)/total : 0.5
  const positive = total !== 0 ? good/total * 100 : 0

  return (
    <div>
        <h1>statistics</h1>
        {total !== 0 ? (
          <table>
            <tbody>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="all" value={total}/>
              <StatisticLine text="average" value={average.toFixed(1)}/>
              <StatisticLine text="positive" value={positive.toFixed(1) + "%"}/>
            </tbody>
          </table>
        ) : (
            <p>No feedback given</p>
        )}
    </div>
  )
}

const Button = ({text, handleFeedback}) => {
  return (
    <button onClick={handleFeedback}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}



export default App