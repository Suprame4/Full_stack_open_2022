import * as React from 'react';
import './index.css';
import axios from 'axios';

const useNotes = (url) => {
    const [notes, setNotes] = React.useState([])
    React.useEffect(() => {
        axios.get(url).then(response => {
            setNotes(response.data);
        })
    }, [url])
    return notes;
}

const App = () => {
    const [counter, setCounter] = React.useState(0);
    const [values, setValues] = React.useState([]);
   // const url = 'https://notes2023.fly.dev/api/notes'
    // use the global default constant 
    const notes = useNotes(BACKEND_URL);

    const handleClick = () => {
        setCounter(counter + 1);
        setValues(values.concat(counter));
    }

    return (
        <div className='container'>
            hello webpack {counter} clicks
            <button onClick={handleClick}>
                Press
            </button>
            <div>{notes.length} notes on server {BACKEND_URL}</div>
        </div>
    )
}

export default App; 