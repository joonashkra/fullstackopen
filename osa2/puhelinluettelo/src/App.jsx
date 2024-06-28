import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personService from './services/persons'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if(existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(existingPerson)
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newPerson.name}`)
      })
      .catch(error => {
        console.log(error.response.data)
        setMessage(`Error: ${error.response.data.error}`)
      })
  }

  const deletePerson = (person) => {
    const id = person.id
    if(window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(person.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null) 
          }, 5000)
        })
    }
  }

  const updatePerson = (existingPerson) => {
    const id = existingPerson.id
    const updatedPerson = {...existingPerson, number: newNumber}

    personService
      .update(id, updatedPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
          setMessage(`Updated ${updatedPerson.name}`)
        })
        .catch(error => {
          if(error.response.status === 404) {
            setMessage(`Error: Person ${existingPerson.name} already deleted from server.`)
            setPersons(persons.filter(person => person.id !== id))
          }
          else {
            setMessage(`Error: ${error.response.data.error}`)
          }
        })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage} />
      <Filter handleFilterChange={handleFilterChange}/>
      <h3>Add New</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addNewPerson={addNewPerson} 
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App