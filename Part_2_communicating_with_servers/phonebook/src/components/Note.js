const Note = ({ note, remove }) => {
    return (
      <li>{note.name} {note.number}
        <button onClick={remove}>delete</button>
      </li>
    )
  }
  
  export default Note