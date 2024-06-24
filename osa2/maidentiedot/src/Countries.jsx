
export const Countries = ({ countries, filterInput, showCountry }) => {

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterInput.toLowerCase()))

    if(filteredCountries.length < 10 && filteredCountries.length > 1) {
        return (
          filteredCountries.map((country, index) => (
            <div key={index} style={{display: "flex", gap:"10px", marginBlock:"10px"}}>
                <p>{country.name.common}</p>
                <button onClick={() => showCountry(country.name.common)}>Show</button>
            </div>
          ))
        )
      }
      else if(filteredCountries.length === 1) {
        const country = filteredCountries[0]
        return (
          <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h2>languages</h2>
            <ul>
              {Object.keys(country.languages).map((key, index) => (
                <li key={index}>{country.languages[key]}</li>
              ))}
            </ul>
            <img src={country.flags.png} style={{maxWidth: "100px"}}/>
          </>
        );
      }
      else if(filteredCountries.length > 10) return <p>Too many matches, specify filter.</p>
      else return <p>No countries found.</p>
}
