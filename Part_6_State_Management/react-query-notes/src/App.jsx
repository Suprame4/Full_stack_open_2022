import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote, updateNote } from './requests';

function App() {

  const queryClient = useQueryClient();

  const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }, 
  })
  

  //New mutation to update the note
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const toggleImportance = ( note ) => {
    updateNoteMutation.mutate({...notes, important: !note.important })
  }
  
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
    console.log("CONTENT", content);
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes
  })
  console.log("TEST: ", JSON.parse(JSON.stringify(result)))

  if( result.isLoading ){
    return <div>Loading data...</div>
  }
  const notes = result.data;

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : 'Not-important'}</strong>
        </li>
      )}
    </div>
  )
}

export default App
