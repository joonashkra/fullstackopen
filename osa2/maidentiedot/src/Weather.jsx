import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then(response => {
            setWeatherData(response.data)
        })
        .catch (error => {
            console.error(error)
        })
        
  }, [apiKey, city])

  if(weatherData === null) return <>Loading...</>

  return (
    <div>
        <h2>Weather in {weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} style={{width: "100px"}}/>
        <p>Wind: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;