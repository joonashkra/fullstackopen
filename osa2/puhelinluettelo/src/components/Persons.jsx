
export const Persons = ({persons, deletePerson}) => {
  return (
    <div>
        {persons.map(person => 
        <div key={person.id} style={{display: "flex"}}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => deletePerson(person)}>Delete</button>
        </div>
      )}
    </div>
  )
}
