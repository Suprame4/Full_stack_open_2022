import Note from './Note.js'

const Persons = ({persons, remove}) => {

    return(
        <ul>
        {persons.map(note => 
          <Note key={note.id} note={note} remove={() => remove(note.id)} />
          )}
      </ul>
    )
}

export default Persons