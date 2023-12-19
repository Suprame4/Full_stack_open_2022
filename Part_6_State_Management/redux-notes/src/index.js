import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

import { configureStore } from '@reduxjs/toolkit'

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

//const store = createStore(reducer);

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

//console.log("store.getStore(): ", store.getState());
store.subscribe(() => console.log(store.getState()))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
