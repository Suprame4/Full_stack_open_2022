import { toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";

const Note = ({ note, handleSubmit }) => {
    return (
        <li onClick={handleSubmit}>
            {note.content} <strong>{note.important ? 'important' : 'not-important'}</strong>
        </li>
    
    )
}

const Notes = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state)

    return (
        <ul>
          {notes.map(note => 
            <Note
                key={note.id}
                note={note}
                handleClick={() => 
                    dispatch(toggleImportanceOf(note.id))}
            />
          )}
        </ul>
    )
}

export default Notes; 