import React from 'react';
import getWeatherEmoji from './GetWeatherEmoji';

function WeatherInfo({ weather }) {
    return (
        <div>
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description} {getWeatherEmoji(weather.weather[0].main)}</p>
            <p>{weather.main.temp}°C</p>
        </div>
    );
}

export default WeatherInfo;