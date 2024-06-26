import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key = "6304b08f04a13c61b3efdc24f0a70252";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      if (city) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
        );
        setWeatherData(response.data);        
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  const getBackgroundStyle = () => {
    if (weatherData && weatherData.main.temp > 25) {
      return {  
        backgroundColor: '#FFA500',
        transition: 'background-color 1s ease'
      };
    } else {
      return {     
        backgroundColor: '#B0C4DE',
        transition: 'background-color 1s ease'
      };
    }
  };

  return (
    <div style={getBackgroundStyle()}> 
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="input">
        <input        className="input-city"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit" className="button">Get Weather</button>
      </form>
      {weatherData &&(        
        <>
        <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Pressure : {weatherData.main.pressure}</p>
          <p>Wind Speed : {weatherData.wind.speed}m/s</p>
          </>  
    
      )}
    </div>   
  );
};

export default Weather;
