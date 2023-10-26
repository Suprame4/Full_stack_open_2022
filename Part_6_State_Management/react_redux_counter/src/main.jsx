import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import noteReducer from './reducers/noteReducer';
import App from './App';

// create the store 
const store = createStore(noteReducer);

//example dispatch 
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)

// const renderApp = () => {
//   root.render(<App/>)
// }

// renderApp();
// store.subscribe(renderApp); 