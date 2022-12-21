import Note from './Note.js'

const Persons = ({persons}) => {

    return(
        <ul>
        {persons.map(note => 
          <Note key={note.id} note={note} />
          )}
      </ul>
    )
}

export default Persons