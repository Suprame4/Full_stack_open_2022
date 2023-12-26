import * as React from 'react';

const useCounter = () => {
  const [value, setValue] = React.useState(0);

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero
  }
}

function App() {
  const counter = useCounter();

  return (
    <>
      <h1>Custom Hook App</h1>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>
        plus
      </button>
      <button onClick={counter.decrease}>
        minus
      </button>      
      <button onClick={counter.zero}>
        zero
      </button>
    </>
  )
}

export default App
