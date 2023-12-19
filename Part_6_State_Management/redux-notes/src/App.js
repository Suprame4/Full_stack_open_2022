import * as React from 'react';
import NewNote from './components/NewNotes';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { useDispatch } from 'react-redux';
import noteService from './services/note';
import { setNotes } from './reducers/noteReducer';

//console.log("store.getState(): ",store.getState())

const App = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    noteService
      .getAll().then( notes => dispatch(setNotes(notes)))
  }, [])
  
  return(
    <div>
      <NewNote />
      <VisibilityFilter /> 
      <Notes />
    </div>
  )
}

export default App;
