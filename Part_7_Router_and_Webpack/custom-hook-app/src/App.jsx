import * as React from 'react';

// Create custom hook
const useField = ( type ) => {
  const [value, setValue] = React.useState('')

  const onChange = ( event ) => {
    setValue(event.target.value)
  }

  return {
    type, 
    value,
    onChange
  }
}

const App = () => {
  const name = useField('text');
  const born = useField('date');
  const height = useField('number');

  return (
    <div>
      <form>
        name: 
        {/* use the spread syntax */}
        <input
          {...name}
        /> 
        <br/> 
        birthdate:
        <input
          type={born.type}
          value={born.value}
          onChange={born.onChange}
        />
        <br /> 
        height:
        <input
          type={height.type}
          value={height.value}
          onChange={height.onChange}
        />
      </form>
      <div>
        {name.value} {born.value} {height.value} 
      </div>
    </div>
  )
}

export default App
