import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import Notification from './components/Notification.js'

const App = () => {

  const [persons, setPersons] = useState([])
  //state is set to a string
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const [successMessage, setSuccessMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

    //useEffect to retreive data from db.json 
    useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setPersons(initialNotes)
        })
      },[])

  const addPhone = (event) => {
    //prevent the default behavior 
    event.preventDefault()
    
    //create a name object  
    const nameObject = { 
      name: newName,
      number: newNumber,
      id: persons.length + 1
    } 
    console.log('test1 :', newName)

    //check if the name is already in the phonebook and whether or not to update 
    //the phone number 
    const result = persons.find(person => person.name === newName)

    if(result){
      if (window.confirm(`${result.name} is already added to the phonebook, replace the older number with a new one?`))
        {
          console.log(nameObject)
          const nameObject2 = {...nameObject, id: result.id}
          console.log(nameObject2)

          noteService.
            update(nameObject2, result.id)
            .then(response => {
              setPersons(persons.filter(item => item.name != nameObject2.name).concat(nameObject2))
              setNewName('')
              setNewNumber('')
              //add a message to the screen 
              setSuccessMessage(
                `${nameObject2.name} phone number changed`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            }).catch(error => {
              setInfoMessage(
                `Information of ${nameObject2.name} was already removed from the server`
              )
              setTimeout(() => {
                setInfoMessage(null)
              }, 5000)
            })

        }
      }
    //the some() method to test whether at least one element in the array passes the test 
    //implemented by the provided function 
    else if(persons.some(person => nameObject.name.toLowerCase() === person.name.toLowerCase())){
      alert(`${nameObject.name} is already added to the phonebook`)
      setNewName("")
      setNewNumber("")
    } else {    
    
      //add to the phonebook with noteService
      noteService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(nameObject))
          setNewName("");
          setNewNumber("")
          //add a message to the screen
          setSuccessMessage(
            `Added ${nameObject.name} ${nameObject.number}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }).catch( error => {
          //log the error message
          console.log("Validation error: ", error.response.data.error)
          //set the error message
          setInfoMessage(error.response.data.error)

          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        })
    }     
       
  }

  //create an event handler function that uses the 
  //set function for person
  const handleNameChange = (event) => {
    
    console.log(event.target.value)
    setNewName(event.target.value)
      
    }

  //create an event handler function that uses the 
  //set function for number 
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterListHandler = (event) => {
    setQuery(event.target.value)
  }

  //create a search filter for the list of names 
  const filteredList = persons.filter(person => 
      person.name.toLowerCase().includes(query.toLowerCase())
      ) 

  //create a callback function for deleting phonebook entry
  const deleteNote = id => {
    const note = persons.find(n => n.id === id )
    
    //create if statements for the deletion of an entry
    if(note){
      
      //create an if statement for the alert window
      if(window.confirm(`Delete ${note.name} ?`)){
           //delete the entry
        noteService
        .remove(note.id)
        .then(
          setPersons(persons.filter(item => item.name != note.name))
        )  
      }
    }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} infoMessage={infoMessage}/>
        <Filter 
            value={query}
            onChange={filterListHandler}
        />

      <h3>Add a new</h3>
      <PersonForm onSubmit={addPhone} nameValue={newName} onChangeName={handleNameChange}
        numberValue={newNumber} onChangeNumber={handleNumberChange}
      />         
      
      <h2>Numbers</h2>
      <Persons persons={filteredList} remove={deleteNote}/>
    
    
    </div>
  )
}

export default App