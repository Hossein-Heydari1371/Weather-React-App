
const API_KEY = "ac4b552a0fd79ab8f1639b3ef7adb0cd"


const getWeatherList = (city) =>{
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    
}

export {getWeatherList}