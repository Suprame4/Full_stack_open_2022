import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'; 
import { Provider } from 'react-redux'

import filterReducer, { filterChange } from './reducers/filterReducer';
import noteReducer, { createNote, toggleImportanceOf } from './reducers/noteReducer';
import App from './App';

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

// create the store 
// const store = createStore(reducer);
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

//example dispatch 
// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })

store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// const renderApp = () => {
//   root.render(<App/>)
// }

// renderApp();
// store.subscribe(renderApp); 