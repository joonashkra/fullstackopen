

export const Filter = ({ filterInput, handleFilterInputChange }) => {
  return (
    <div>     
        <label>Find countries: </label>  
        <input value={filterInput} onChange={handleFilterInputChange}/>
    </div>
  )
}
