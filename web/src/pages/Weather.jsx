import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const API_KEY = '7c5dbf6849da7ad3d360ad919678eaab'; // Replace with your real API key
  const CITY = 'Colombo'; // Change to any city in Sri Lanka

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY},LK&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="weather-card">
      <h2>Weather in {weather.name}, Sri Lanka</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
