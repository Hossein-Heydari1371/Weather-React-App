

const getWeatherEmoji = (main) => {
  switch (main.toLowerCase()) {
    case 'clouds':
      return '☁️';
    case 'clear':
      return '☀️';
    case 'rain':
      return '🌧️';
    case 'snow':
      return '❄️';
    case 'thunderstorm':
      return '⛈️';
    case 'drizzle':
      return '🌦️';
    case 'mist':
    case 'fog':
      return '🌫️';
    default:
      return '🌈'; // fallback emoji
  }
};

export default getWeatherEmoji