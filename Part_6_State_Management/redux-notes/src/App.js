import * as React from 'react';
import NewNote from './components/NewNotes';
import Notes from './components/Notes';

//console.log("store.getState(): ",store.getState())

const App = () => {

  return(
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App;
