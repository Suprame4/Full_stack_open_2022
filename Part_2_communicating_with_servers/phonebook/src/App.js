import { useState } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'

const App = () => {
  //state is set to a list of objects 
  /*const [persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas',
      phone: '206-222-2222'  
    }
  ]) */
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  //state is set to a string
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')


  const addPhone = (event) => {
    //prevent the default behavior 
    event.preventDefault()
    
    //create a name object  
    const nameObject = {
      id: persons.length + 1, 
      name: newName,
      number: newNumber
    } 
    console.log('test1 :', newName)
  
    //the some() method to test whether at least one element in the array passes the test 
    //implemented by the provided function 
    if(persons.some(person => nameObject.name.toLowerCase() === person.name.toLowerCase())){
      alert(`${nameObject.name} is already added to the phonebook`)
      setNewName("")
      setNewNumber("")
    } else {    

      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("")
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
  
  return (
    <div>
      <h2>Phonebook</h2>

        <Filter 
            value={query}
            onChange={filterListHandler}
        />

      <h3>Add a new</h3>
      <PersonForm onSubmit={addPhone} nameValue={newName} onChangeName={handleNameChange}
        numberValue={newNumber} onChangeNumber={handleNumberChange}
      />         
      
      <h2>Numbers</h2>
      <Persons persons={filteredList}/>
    
    
    </div>
  )
}

export default App