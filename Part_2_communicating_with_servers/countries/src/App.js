import Countries from './components/Countries'
import Filter from './components/Filter'

import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  console.log('render', countries.length, 'countries')
  const handleSearchChange = (event) => {
    console.log('test 1:', event.target.value)
    console.log('test 2:', event.target)
    setSearch(event.target.value)
  }

  const searchQuery = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>Countries</h2>
      
        <div>
          <Filter search={search} handleSearchChange={handleSearchChange} />  
          <Countries countries={countries} search={search}/>
        </div>
    </div>
  );
}

export default App;
