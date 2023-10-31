import * as React from 'react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import noteSerive from './services/notes';
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducer';

const App = () => {

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(initializeNotes())
    }, [])

    return (
        <>
            <NewNote />
            <VisibilityFilter/>
            <Notes />
        </>
    )
  }

  export default App; 