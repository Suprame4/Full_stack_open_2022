//create a module for communicating with the backend 

//import the axios package
import axios from 'axios'
 
//const baseUrl = '/api/persons'
const baseUrl = 'http://localhost:3001/persons'
//create three functions for communcating with the backend server 

//use HTTP GET to get the entire phonebook of individuals 
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//use HTTP POST to add a new note to the list 
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

//use HTTP PUT to update individuals in the phonebook
const update = (newObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

//use HTTP DELETE to delete individuals from the phonebook
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const noteService = {
    getAll, 
    create, 
    update,
    remove
}

export default noteService; 