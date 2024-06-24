import { useEffect, useState } from "react"
import axios from 'axios'
import { Countries } from "./Countries"
import { Filter } from "./Filter"

function App() {

  const [countries, setCountries] = useState([])
  const [filterInput, setFilterInput] = useState("")

  const handleFilterInputChange = (event) => setFilterInput(event.target.value)

  const showCountry = (country) => {
    setFilterInput(country)
  }

  useEffect(() => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    request.then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <Filter filterInput={filterInput} handleFilterInputChange={handleFilterInputChange} />
      <Countries countries={countries} filterInput={filterInput} showCountry={showCountry} />
    </div>
  )
}

export default App
