import * as React from 'react';
import NewNote from './NewNote';
import Notes from './Notes';
import VisibilityFilter from './components/VisibilityFilter';


const App = () => {

    return (
        <>
            <NewNote />
            <VisibilityFilter/>
            <Notes />
        </>
    )
  }

  export default App; 