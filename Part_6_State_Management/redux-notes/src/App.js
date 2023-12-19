import * as React from 'react';
import NewNote from './components/NewNotes';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';

//console.log("store.getState(): ",store.getState())

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }
  
  return(
    <div>
      <NewNote />
      <VisibilityFilter /> 
      <Notes />
    </div>
  )
}

export default App;
