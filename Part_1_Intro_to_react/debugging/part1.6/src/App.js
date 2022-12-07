import { useState } from 'react'

//create the button component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = 0 
  const positive = good / all

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({text, value}) => {
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Create event handlers for all three buttons: good, neutral, bad
  const handlegoodClick = () => {
    setGood(good + 1)
  }

  const handlebadClick = () => {
    setBad(bad + 1)
  }

  const handleneutralClick = () => {
    setNeutral(neutral + 1)
  }


  return (
  
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handlegoodClick} text="good" />
      <Button handleClick={handleneutralClick} text="neutral"/>
      <Button handleClick={handlebadClick} text="bad"/>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
