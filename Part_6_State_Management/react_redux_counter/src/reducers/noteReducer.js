import * as React from 'react';
import { createSlice } from '@reduxjs/toolkit';

// create initial state 
const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))
    
// create the reducer function
const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
     createNote(state, action){
      const content = action.payload;
      state.push({
        content,
        important: false,
        id: generateId(),
      })
     },
     toggleImportanceOf(state, action){
      const id = action.payload;
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map(note => 
        note.id !== id ? note : changedNote
      )
     }
  },
})

// const noteReducer = (state = initialState, action) => {
//     switch(action.type){
//         case 'NEW_NOTE':
//             return [...state, action.payload];
//         case 'TOGGLE_IMPORTANCE': {
//             const id = action.payload.id;
//             const noteToChange = state.find(n => n.id === id)
//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             return state.map(note => 
//                 note.id !== id ? note : changedNote    
//             )
//         }
//         default: 
//             return state;
//     }
//   };


// export const createNote = ( content ) => {
//     return {
//       type: 'NEW_NOTE',
//       payload: {
//         content,
//         important: false,
//         id: generateId()
//       }
//     }
//   }
  
//   export const toggleImportanceOf = ( id ) => {
//     return {
//       type: 'TOGGLE_IMPORTANCE',
//       payload: { id }
//     }
//   }
export const { createNote, toggleImportanceOf } = noteSlice.actions; 
export default noteSlice.reducer;