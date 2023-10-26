import * as React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux';
import { noteReducer } from './reducers/noteReducer';

// create the store 
const store = createStore(noteReducer);

// example dispatch 
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const generateId = () => Number((Math.random() * 1000000).toFixed(0))
const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value;
    event.target.note.value = '';
    store.dispatch({
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    })
  }

  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    })
  }
  return (
    <div>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      <ul>
        {store.getState().map(note => 
          <li 
            key={note.id}
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : 'not-important'}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App/>)
}

renderApp();
store.subscribe(renderApp); 