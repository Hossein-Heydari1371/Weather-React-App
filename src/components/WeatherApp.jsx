import React, { useEffect, useState } from 'react'
import styles from "../components/SearchBox.module.css"
import { getWeatherList } from '../services/weatherApi';
import WeatherInfo from './WeatherInfo';
import Loader from './Loader';

function WeatherApp() {
  const [input, setInput] = useState('');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    if (!city) {
      setWeather(null);
      return;
    }

    const fetchWeather = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(getWeatherList(city));
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        setWeather(data);

      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);


  const handleSearch = () => {
    if (input.trim()) setCity(input.trim());
  };


  return (
    <div className={styles.search}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter City or Country"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading ? (<Loader />
      ) : weather ? (
        <WeatherInfo weather={weather} />
      ) : (
        <p>No data yet. Try searching!</p>
      )
      }
    </div >
  );
}


export default WeatherApp