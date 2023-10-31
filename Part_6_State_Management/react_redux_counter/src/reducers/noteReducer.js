import * as React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import noteSerive from '../services/notes';
import notes from '../services/notes';

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
  initialState: [],
  reducers: {
    //  createNote(state, action){
    //   state.push(action.payload);
    //  },
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
     },
     appendNote(state, action){
      state.push(action.payload);
     },
     setNotes(state, action){
      return action.payload
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
export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions; 

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteSerive.getAll();
    dispatch(setNotes(notes));
  }
};

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer;